<script lang="ts">
export default {
  name: "NavigationSideBar"
};
</script>
<script setup lang="ts">
import { computed, getCurrentInstance, ref} from 'vue';
import type { menus } from '@/utils/types/menus';
import type { menuItems } from '@/utils/types/menuItems';
import MenuItem from './menuItem.vue';
import { 
  typeTitleSmall,
  typeLabelSmall, 
  iconBtnStandard, 
  dividerHorizontalMiddle,
  transitionBase
} from '@/theme/md-theme';


// Detect Nuxt or Vue Router environment
const linkComponent = ref('RouterLink');
try {
  if (typeof useNuxtApp === 'function' || (globalThis && (globalThis as any).useNuxtApp)) {
    linkComponent.value = 'NuxtLink';
  }
} catch (e) {}


interface Props {
  menu: menus;
  activeUrl?: string;
  headline?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  position?: 'left' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
  activeUrl: '',
  headline: '',
  collapsible: false,
  collapsed: false,
  position: 'left',
});

const emit = defineEmits<{
  (e: 'navigate', item: menuItems): void;
  (e: 'action', item: menuItems): void;
  (e: 'update:collapsed', value: boolean): void;
}>();

// Group items by separators
const groupedItems = computed(() => {
  if (!props.menu?.menuItems) return [];

  const groups: { label?: string; items: menuItems[] }[] = [];
  let currentGroup: { label?: string; items: menuItems[] } = { items: [] };

  props.menu.menuItems.forEach((item: menuItems) => {
    if (item.type === 'separator') {
      if (currentGroup.items.length > 0) {
        groups.push(currentGroup);
      }
      currentGroup = { label: item.displayText, items: [] };
    } else {
      currentGroup.items.push(item);
    }
  });

  if (currentGroup.items.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
});

const isItemActive = (item: menuItems): boolean => {
  return item.url === props.activeUrl;
};

const handleItemClick = (item: menuItems) => {
  emit('navigate', item);
};

const handleAction = (item: menuItems) => {
  emit('action', item);
};

const toggleCollapse = () => {
  emit('update:collapsed', !props.collapsed);
};

// Main container classes
const sidebarClasses = computed(() => {
  return [
    'flex flex-col h-full bg-surface overflow-hidden max-w-full',
    'transition-[width,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
    props.position === 'right' ? 'border-l' : 'border-r',
    'border-outline-variant',
    props.collapsed ? 'w-[80px]' : 'w-[280px]', // Standard M3 widths: Rail=80px, Drawer=280-360px
    // Responsive behavior: fixed off-screen on mobile unless not collapsed
    'max-md:fixed max-md:top-0 max-md:bottom-0 max-md:z-50',
    props.position === 'right' 
      ? 'max-md:right-0 max-md:translate-x-full' // Hidden to right
      : 'max-md:left-0 max-md:-translate-x-full', // Hidden to left
    // Show when not collapsed on mobile (active state)
    !props.collapsed && 'max-md:translate-x-0'
  ].filter(Boolean).join(' ');
});

const headerClasses = 'flex items-center justify-between px-4 py-3 min-h-[64px]';
const headlineClasses = `truncate text-on-surface ${typeTitleSmall}`;
const contentClasses = 'flex-1 overflow-y-auto overflow-x-hidden py-2';
const sectionLabelClasses = `px-4 py-3 text-on-surface-variant uppercase ${typeLabelSmall}`;
const footerClasses = 'p-4 border-t border-outline-variant';
</script>

<template>
  <aside
    :class="sidebarClasses"
    role="navigation"
    :aria-label="menu.name"
  >
    <!-- Header -->
    <div :class="headerClasses">
      <slot name="header">
        <h2 v-if="headline && !collapsed" :class="headlineClasses">
          {{ headline }}
        </h2>
      </slot>
      <button
        v-if="collapsible"
        :class="iconBtnStandard"
        @click="toggleCollapse"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <span class="material-symbols-outlined">
          {{ collapsed ? 'chevron_right' : 'chevron_left' }}
        </span>
      </button>
    </div>

    <!-- Content -->
    <div :class="contentClasses">
      <template v-for="(group, groupIndex) in groupedItems" :key="groupIndex">
        <!-- Section Label -->
        <div v-if="group.label && !collapsed" :class="sectionLabelClasses">
          {{ group.label }}
        </div>

        <!-- Divider (if not first group and no label) -->
        <div v-else-if="groupIndex > 0" :class="dividerHorizontalMiddle" class="my-2"></div>

        <!-- Items -->
        <div class="flex flex-col gap-1 px-3">
          <MenuItem
            v-for="item in group.items"
            :key="item.url"
            :item="item"
            :link-component="linkComponent"
            :is-active="isItemActive(item)"
            :variant="collapsed ? 'rail' : 'drawer'"
            :show-label="!collapsed"
            @click="handleItemClick(item)"
            @action="handleAction(item)"
          />
        </div>
      </template>
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" :class="footerClasses">
      <slot name="footer"></slot>
    </div>
  </aside>
</template>

<style scoped>
/* Styles replaced by Tailwind Utility Classes and MD Theme Tokens */
</style>
