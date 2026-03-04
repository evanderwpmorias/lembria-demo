<script lang="ts">
export default {
  name: "NavigationBar"
};
</script>
<script setup lang="ts">
import { computed, ref } from 'vue';
import type { menus } from '@/data/types/menus';
import type { menuItems } from '@/data/types/menuItems';
import MenuItem from './menuItem.vue';

interface Props {
  menu: menus;
  activeUrl?: string;
  maxItems?: number;
  hideOnScroll?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  activeUrl: '',
  maxItems: 5,
  hideOnScroll: false,
});

const emit = defineEmits<{
  (e: 'navigate', item: menuItems): void;
  (e: 'action', item: menuItems): void;
}>();

const isVisible = ref(true);
let lastScrollY = 0;

// Filter out separators and limit to maxItems for navigation bar
const visibleItems = computed(() => {
  if (!props.menu?.menuItems) return [];
  return props.menu.menuItems
    .filter((item: menuItems) => item.type !== 'separator')
    .slice(0, props.maxItems);
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

// Handle scroll visibility
if (typeof window !== 'undefined' && props.hideOnScroll) {
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    isVisible.value = currentScrollY < lastScrollY || currentScrollY < 100;
    lastScrollY = currentScrollY;
  });
}
</script>

<template>
  <nav
    class="md-navigation-bar"
    :class="{ 'md-navigation-bar--hidden': !isVisible }"
    role="navigation"
    :aria-label="menu.name"
  >
    <div class="md-navigation-bar__container">
      <MenuItem
        v-for="item in visibleItems"
        :key="item.url"
        :item="item"
        :is-active="isItemActive(item)"
        variant="bar"
        :show-label="true"
        @click="handleItemClick"
        @action="handleAction"
      />
    </div>
  </nav>
</template>

<style scoped>
/* M3 Navigation Bar - Bottom navigation for mobile (3-5 destinations) */
.md-navigation-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--md-sys-color-surface-container);
  transition: transform 300ms ease;
}

.md-navigation-bar--hidden {
  transform: translateY(100%);
}

.md-navigation-bar__container {
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  max-width: 100%;
  height: 80px;
  padding: 0;
}

/* Elevation shadow */
.md-navigation-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    to bottom,
    var(--md-sys-color-outline-variant),
    transparent
  );
}

/* Responsive: horizontal items for medium windows */
@media (min-width: 600px) {
  .md-navigation-bar__container {
    justify-content: center;
    gap: 8px;
    padding: 0 24px;
  }

  .md-navigation-bar :deep(.md-menu-item--bar) {
    flex-direction: row;
    padding: 0 20px;
    min-height: 56px;
    flex: unset;
    border-radius: 28px;
    gap: 8px;
  }

  .md-navigation-bar :deep(.md-menu-item--bar .md-active-indicator) {
    width: 100%;
    height: 56px;
    left: 0;
    transform: translateY(-50%);
    border-radius: 28px;
  }

  .md-navigation-bar :deep(.md-menu-item--bar .md-menu-item__label) {
    font-size: 14px;
  }
}

/* Don't use nav bar for expanded windows */
@media (min-width: 1200px) {
  .md-navigation-bar {
    display: none;
  }
}
</style>
