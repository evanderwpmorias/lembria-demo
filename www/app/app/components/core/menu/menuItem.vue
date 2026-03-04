<script lang="ts">
export default {
  name: "MenuItem"
};
</script>
<script setup lang="ts">
import { computed, ref, unref, resolveComponent } from 'vue';
import type { menuItems } from '@/utils/types/menuItems';
import { 
  navDrawerItem, 
  navRailItem, 
  navBarItem, 
  navBarIconActive, 
  listItem,
  dividerHorizontalMiddle
} from '@/theme/md-theme';

interface Props {
  item: menuItems;
  isActive?: boolean;
  variant?: 'rail' | 'drawer' | 'bar' | 'dropdown' | 'sidebar';
  showLabel?: boolean;
  depth?: number;
  linkComponent?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  variant: 'drawer',
  showLabel: true,
  depth: 0,
  linkComponent: 'RouterLink',
});

const emit = defineEmits<{
  (e: 'click', item: menuItems): void;
  (e: 'action', item: menuItems): void;
}>();

const isExpanded = ref(false);
const isHovered = ref(false);

const hasChildren = computed(() => props.item.menuItems && props.item.menuItems.length > 0);
const isDivider = computed(() => props.item.type === 'divider');
const isAction = computed(() => props.item.type === 'action');

// Determine which element/component to use for links
const interactiveTag = computed(() => {
  if (isDivider.value || isAction.value) return 'div';
  const lc = props.linkComponent || 'RouterLink';
  if (props.item.url) {
    if (lc === 'NuxtLink' || lc === 'RouterLink') {
      try {
        return resolveComponent(lc);
      } catch (e) {
        return 'a';
      }
    }
    return 'a';
  }
  return 'div';
});

const linkProps = computed(() => {
  if (!props.item.url) return {};
  const tag = interactiveTag.value;
  if (tag === 'a') return { href: props.item.url };
  return { to: props.item.url };
});

const itemClasses = computed(() => {
  // Mapping variants to MD3 Theme classes
  switch (props.variant) {
    case 'drawer':
    case 'sidebar': 
      return navDrawerItem;
    case 'rail':
      return navRailItem;
    case 'bar':
      return navBarItem;
    case 'dropdown':
      return listItem + ' rounded-lg';
    default:
      return navDrawerItem;
  }
});

const iconClasses = computed(() => {
  const base = "material-symbols-outlined text-2xl mb-0.5 z-10 transition-transform duration-200";
  // The navBarIconActive class provides the "pill" background for active icons in Bar/Rail variants
  if (props.isActive && (props.variant === 'bar' || props.variant === 'rail')) {
    return `${base} ${navBarIconActive}`;
  }
  return base;
});

// Dynamic padding for nested items in drawer mode
const paddingStyle = computed(() => {
  if ((props.variant === 'drawer' || props.variant === 'sidebar') && props.depth > 0) {
    return { paddingLeft: `calc(1.5rem + ${props.depth} * 1rem)` };
  }
  return {};
});

const handleClick = () => {
  if (isDivider.value) return;

  if (hasChildren.value) {
    isExpanded.value = !isExpanded.value;
  }

  if (isAction.value) {
    emit('action', props.item);
  } else {
    emit('click', props.item);
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleClick();
  }
};

</script>

<template>
  <!-- Divider -->
  <div v-if="isDivider" :class="dividerHorizontalMiddle" role="separator" class="my-2">it dasa</div>
  
  <!-- Menu Item -->
  <NuxtLink
    v-else
    :to="item.url"
    tag="a"
    :class="itemClasses"
    :style="{ '--depth': depth }"
    role="menuitem"
    :tabindex="0"
    @click="handleClick"
    @keydown="handleKeyDown"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Icon -->
    <span v-if="item.icon" :class="iconClasses">
      {{ item.icon }}
    </span>

    <!-- Label -->
    <span v-if="showLabel" class="flex-1 truncate z-10">
      {{ item.displayText }}
    </span>

    <!-- Expand Arrow -->
    <span
      v-if="hasChildren && showLabel"
      class="material-symbols-outlined text-xl transition-transform duration-200 z-10"
      :class="{ 'rotate-180': isExpanded }"
    >
      expand_more
    </span>

    <!-- Badge -->
    <span v-if="item.metadata?.badge" class="bg-error text-on-error text-[11px] font-medium px-1.5 h-4 min-w-[16px] rounded-full flex items-center justify-center z-10">
      {{ item.metadata.badge }}
    </span>
  </NuxtLink>



  <!-- Nested Items -->
  <Transition 
    enter-active-class="transition-all duration-200 ease-out overflow-hidden"
    leave-active-class="transition-all duration-200 ease-in overflow-hidden"
    enter-from-class="max-h-0 opacity-0"
    enter-to-class="max-h-[500px] opacity-100"
    leave-from-class="max-h-[500px] opacity-100"
    leave-to-class="max-h-0 opacity-0"
  >
    <div v-if="hasChildren && isExpanded" class="flex flex-col w-full">
      <MenuItem
        v-for="(child, index) in item.menuItems"
        :key="child.url || index"
        :item="child"
        :variant="variant"
        :show-label="showLabel"
        :depth="depth + 1"
        :link-component="linkComponent"
        @click="emit('click', $event)"
        @action="emit('action', $event)"
      />
    </div>
  </Transition>
</template>

<style scoped>
/* Scoped styles removed in favor of Tailwind utility classes from theme */
</style>