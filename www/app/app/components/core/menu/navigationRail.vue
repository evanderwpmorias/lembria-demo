<script lang="ts">
export default {
  name: "NavigationRail"
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
  showLabels?: boolean;
  fabIcon?: string;
  fabLabel?: string;
  alignment?: 'top' | 'center' | 'bottom';
  expandable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  activeUrl: '',
  maxItems: 7,
  showLabels: true,
  fabIcon: '',
  fabLabel: '',
  alignment: 'top',
  expandable: false,
});

const emit = defineEmits<{
  (e: 'navigate', item: menuItems): void;
  (e: 'action', item: menuItems): void;
  (e: 'fab-click'): void;
  (e: 'expand-toggle', expanded: boolean): void;
}>();

const isExpanded = ref(false);

// Filter items for rail (limit to maxItems, separators handled in groups)
const visibleItems = computed(() => {
  if (!props.menu?.menuItems) return [];
  return props.menu.menuItems.slice(0, props.maxItems);
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

const handleFabClick = () => {
  emit('fab-click');
};

const toggleExpand = () => {
  if (props.expandable) {
    isExpanded.value = !isExpanded.value;
    emit('expand-toggle', isExpanded.value);
  }
};

const railClasses = computed(() => ({
  'md-navigation-rail': true,
  'md-navigation-rail--expanded': isExpanded.value,
  [`md-navigation-rail--align-${props.alignment}`]: true,
}));
</script>

<template>
  <nav
    :class="railClasses"
    role="navigation"
    :aria-label="menu.name"
  >
    <!-- Header Section (Menu button for expandable) -->
    <div v-if="expandable" class="md-navigation-rail__header">
      <button
        class="md-navigation-rail__menu-btn"
        @click="toggleExpand"
        :aria-expanded="isExpanded"
        aria-label="Toggle navigation"
      >
        <span class="material-symbols-outlined">
          {{ isExpanded ? 'menu_open' : 'menu' }}
        </span>
      </button>
    </div>

    <!-- FAB Section -->
    <div v-if="fabIcon" class="md-navigation-rail__fab">
      <button
        class="md-fab md-fab--tertiary"
        @click="handleFabClick"
        :aria-label="fabLabel"
      >
        <span class="md-fab__icon material-symbols-outlined">{{ fabIcon }}</span>
        <span v-if="isExpanded && fabLabel" class="md-fab__label">{{ fabLabel }}</span>
      </button>
    </div>

    <!-- Navigation Items -->
    <div class="md-navigation-rail__items" role="menubar">
      <template v-for="item in visibleItems" :key="item.url">
        <MenuItem
          :item="item"
          :is-active="isItemActive(item)"
          variant="rail"
          :show-label="showLabels || isExpanded"
          @click="handleItemClick"
          @action="handleAction"
        />
      </template>
    </div>

    <!-- Footer Slot -->
    <div class="md-navigation-rail__footer">
      <slot name="footer"></slot>
    </div>
  </nav>
</template>

<style scoped>
/* M3 Navigation Rail - Side navigation for medium/expanded windows */
.md-navigation-rail {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 80px;
  display: flex;
  flex-direction: column;
  background-color: var(--md-sys-color-surface);
  border-right: 1px solid var(--md-sys-color-outline-variant);
  z-index: 100;
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
  overflow-x: hidden;
}

.md-navigation-rail--expanded {
  width: 360px;
}

/* Header */
.md-navigation-rail__header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 12px;
  min-height: 64px;
}

.md-navigation-rail__menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--md-sys-color-on-surface-variant);
  cursor: pointer;
  transition: background-color 200ms ease;
}

.md-navigation-rail__menu-btn:hover {
  background-color: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
}

.md-navigation-rail__menu-btn:focus-visible {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: 2px;
}

/* FAB */
.md-navigation-rail__fab {
  display: flex;
  justify-content: center;
  padding: 12px;
}

.md-fab {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 56px;
  height: 56px;
  padding: 0 16px;
  border: none;
  border-radius: 16px;
  background-color: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 200ms ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.md-fab:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.md-fab:active {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.md-fab__icon {
  font-size: 24px;
}

.md-fab__label {
  white-space: nowrap;
}

/* Items Container */
.md-navigation-rail__items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Alignment variations */
.md-navigation-rail--align-center .md-navigation-rail__items {
  justify-content: center;
}

.md-navigation-rail--align-bottom .md-navigation-rail__items {
  justify-content: flex-end;
}

/* Footer */
.md-navigation-rail__footer {
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

/* Expanded state adjustments */
.md-navigation-rail--expanded .md-navigation-rail__header {
  justify-content: flex-start;
  padding-left: 16px;
}

.md-navigation-rail--expanded .md-navigation-rail__items {
  align-items: stretch;
}

.md-navigation-rail--expanded :deep(.md-menu-item--rail) {
  flex-direction: row;
  width: auto;
  padding: 0 24px;
  height: 56px;
  gap: 12px;
  justify-content: flex-start;
}

.md-navigation-rail--expanded :deep(.md-menu-item--rail .md-active-indicator) {
  width: 100%;
  height: 56px;
  left: 0;
  transform: translateY(-50%);
  top: 50%;
}

.md-navigation-rail--expanded :deep(.md-menu-item--rail .md-menu-item__label) {
  font-size: 14px;
  text-align: left;
  flex: 1;
}

/* Hide rail on compact windows */
@media (max-width: 599px) {
  .md-navigation-rail {
    display: none;
  }
}

/* Show only on medium and larger */
@media (min-width: 600px) {
  .md-navigation-rail {
    display: flex;
  }
}
</style>
