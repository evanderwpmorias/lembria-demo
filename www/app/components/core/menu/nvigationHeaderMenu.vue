<script lang="ts">
export default {
  name: "NavigationHeaderMenu"
};
</script>
<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import type { menus } from '@/data/types/menus';
import type { menuItems } from '@/data/types/menuItems';

interface Props {
  menu: menus;
  activeUrl?: string;
  triggerIcon?: string;
  triggerLabel?: string;
  position?: 'left' | 'right';
  showOnHover?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  activeUrl: '',
  triggerIcon: '',
  triggerLabel: '',
  position: 'left',
  showOnHover: false,
});

const emit = defineEmits<{
  (e: 'navigate', item: menuItems): void;
  (e: 'action', item: menuItems): void;
}>();

const isOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

// Group items with separators
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

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const close = () => {
  isOpen.value = false;
};

const handleItemClick = (item: menuItems) => {
  if (item.type === 'action') {
    emit('action', item);
  } else {
    emit('navigate', item);
  }
  close();
};

const hasNestedItems = (item: menuItems): boolean => {
  return item.menuItems && item.menuItems.length > 0;
};

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
  if (
    menuRef.value &&
    !menuRef.value.contains(event.target as Node) &&
    triggerRef.value &&
    !triggerRef.value.contains(event.target as Node)
  ) {
    close();
  }
};

// Handle keyboard navigation
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close();
  }
};

// Hover handlers
const handleMouseEnter = () => {
  if (props.showOnHover) {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    isOpen.value = true;
  }
};

const handleMouseLeave = () => {
  if (props.showOnHover) {
    hoverTimeout = setTimeout(() => {
      isOpen.value = false;
    }, 150);
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeyDown);
  if (hoverTimeout) clearTimeout(hoverTimeout);
});

const menuClasses = computed(() => ({
  'md-header-menu': true,
  'md-header-menu--open': isOpen.value,
  [`md-header-menu--${props.position}`]: true,
}));
</script>

<template>
  <div
    class="md-header-menu-container"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Trigger Button -->
    <button
      ref="triggerRef"
      class="md-header-menu__trigger"
      :class="{ 'md-header-menu__trigger--active': isOpen }"
      @click="toggle"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
    >
      <span v-if="triggerIcon" class="md-header-menu__trigger-icon material-symbols-outlined">
        {{ triggerIcon }}
      </span>
      <span v-if="triggerLabel" class="md-header-menu__trigger-label">
        {{ triggerLabel }}
      </span>
      <span class="md-header-menu__trigger-arrow material-symbols-outlined">
        arrow_drop_down
      </span>
    </button>

    <!-- Dropdown Menu -->
    <Transition name="md-menu-fade">
      <div
        v-if="isOpen"
        ref="menuRef"
        :class="menuClasses"
        role="menu"
        :aria-label="menu.name"
      >
        <template v-for="(group, groupIndex) in groupedItems" :key="groupIndex">
          <!-- Section Label -->
          <div v-if="group.label" class="md-header-menu__section-label">
            {{ group.label }}
          </div>

          <!-- Divider -->
          <div v-else-if="groupIndex > 0" class="md-header-menu__divider"></div>

          <!-- Items -->
          <template v-for="item in group.items" :key="item.url">
            <!-- Item with submenu -->
            <div
              v-if="hasNestedItems(item)"
              class="md-header-menu__item md-header-menu__item--has-submenu"
            >
              <button
                class="md-header-menu__item-content"
                :class="{ 'md-header-menu__item--active': isItemActive(item) }"
                role="menuitem"
                :aria-haspopup="true"
              >
                <span v-if="item.icon" class="md-header-menu__icon material-symbols-outlined">
                  {{ item.icon }}
                </span>
                <span class="md-header-menu__label">{{ item.displayText }}</span>
                <span class="md-header-menu__submenu-arrow material-symbols-outlined">
                  chevron_right
                </span>
              </button>

              <!-- Submenu -->
              <div class="md-header-menu__submenu" role="menu">
                <button
                  v-for="subItem in item.menuItems"
                  :key="subItem.url"
                  class="md-header-menu__item-content"
                  :class="{ 'md-header-menu__item--active': isItemActive(subItem) }"
                  role="menuitem"
                  @click="handleItemClick(subItem)"
                >
                  <span v-if="subItem.icon" class="md-header-menu__icon material-symbols-outlined">
                    {{ subItem.icon }}
                  </span>
                  <span class="md-header-menu__label">{{ subItem.displayText }}</span>
                </button>
              </div>
            </div>

            <!-- Regular item -->
            <button
              v-else
              class="md-header-menu__item-content"
              :class="{ 'md-header-menu__item--active': isItemActive(item) }"
              role="menuitem"
              @click="handleItemClick(item)"
            >
              <span v-if="item.icon" class="md-header-menu__icon material-symbols-outlined">
                {{ item.icon }}
              </span>
              <span class="md-header-menu__label">{{ item.displayText }}</span>
            </button>
          </template>
        </template>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* M3 Header Menu (Dropdown Menu) */
.md-header-menu-container {
  position: relative;
  display: inline-flex;
}

/* Trigger Button */
.md-header-menu__trigger {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--md-sys-color-on-surface);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 200ms ease;
}

.md-header-menu__trigger:hover {
  background-color: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
}

.md-header-menu__trigger:focus-visible {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: 2px;
}

.md-header-menu__trigger--active {
  background-color: color-mix(in srgb, var(--md-sys-color-on-surface) 12%, transparent);
}

.md-header-menu__trigger-icon {
  font-size: 20px;
}

.md-header-menu__trigger-arrow {
  font-size: 18px;
  color: var(--md-sys-color-on-surface-variant);
  transition: transform 200ms ease;
}

.md-header-menu__trigger--active .md-header-menu__trigger-arrow {
  transform: rotate(180deg);
}

/* Dropdown Menu */
.md-header-menu {
  position: absolute;
  top: 100%;
  margin-top: 4px;
  min-width: 200px;
  max-width: 280px;
  padding: 8px 0;
  background-color: var(--md-sys-color-surface-container);
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15),
              0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 300;
  overflow: visible;
}

.md-header-menu--left {
  left: 0;
}

.md-header-menu--right {
  right: 0;
}

/* Section Label */
.md-header-menu__section-label {
  padding: 12px 16px 8px;
  font-size: 11px;
  font-weight: 500;
  color: var(--md-sys-color-on-surface-variant);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Divider */
.md-header-menu__divider {
  height: 1px;
  background-color: var(--md-sys-color-outline-variant);
  margin: 8px 0;
}

/* Menu Item */
.md-header-menu__item {
  position: relative;
}

.md-header-menu__item-content {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: var(--md-sys-color-on-surface);
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  cursor: pointer;
  transition: background-color 200ms ease;
}

.md-header-menu__item-content:hover {
  background-color: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
}

.md-header-menu__item-content:focus-visible {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: -2px;
}

.md-header-menu__item--active {
  background-color: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

/* Icon */
.md-header-menu__icon {
  font-size: 20px;
  color: var(--md-sys-color-on-surface-variant);
}

.md-header-menu__item--active .md-header-menu__icon {
  color: var(--md-sys-color-on-secondary-container);
}

/* Label */
.md-header-menu__label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Submenu Arrow */
.md-header-menu__submenu-arrow {
  font-size: 18px;
  color: var(--md-sys-color-on-surface-variant);
  margin-left: auto;
}

/* Submenu */
.md-header-menu__submenu {
  position: absolute;
  left: 100%;
  top: 0;
  min-width: 180px;
  padding: 8px 0;
  background-color: var(--md-sys-color-surface-container);
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15),
              0 8px 24px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transform: translateX(-8px);
  transition: all 200ms ease;
}

.md-header-menu__item--has-submenu:hover .md-header-menu__submenu {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

/* Transitions */
.md-menu-fade-enter-active,
.md-menu-fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.md-menu-fade-enter-from,
.md-menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Responsive */
@media (max-width: 599px) {
  .md-header-menu {
    position: fixed;
    left: 8px !important;
    right: 8px !important;
    top: auto !important;
    bottom: 8px;
    max-width: none;
    width: calc(100% - 16px);
    max-height: 50vh;
    overflow-y: auto;
    border-radius: 16px;
  }

  .md-header-menu__submenu {
    position: static;
    box-shadow: none;
    border-radius: 0;
    padding-left: 32px;
    opacity: 1;
    visibility: visible;
    transform: none;
    background: transparent;
  }

  .md-header-menu__submenu-arrow {
    transform: rotate(90deg);
  }
}
</style>
