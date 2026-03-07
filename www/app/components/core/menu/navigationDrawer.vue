<script lang="ts">
export default {
  name: "NavigationDrawer"
};
</script>
<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
import type { menus } from '@/data/types/menus';
import type { menuItems } from '@/data/types/menuItems';
import MenuItem from './menuItem.vue';

interface Props {
  menu: menus;
  activeUrl?: string;
  modelValue?: boolean;
  modal?: boolean;
  headline?: string;
}

const props = withDefaults(defineProps<Props>(), {
  activeUrl: '',
  modelValue: true,
  modal: false,
  headline: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'navigate', item: menuItems): void;
  (e: 'action', item: menuItems): void;
}>();

const isOpen = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal;
});

const close = () => {
  isOpen.value = false;
  emit('update:modelValue', false);
};

// Group items by separators for better visual organization
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
  if (props.modal) {
    close();
  }
};

const handleAction = (item: menuItems) => {
  emit('action', item);
};

const handleScrimClick = () => {
  if (props.modal) {
    close();
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.modal && isOpen.value) {
    close();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});

const drawerClasses = computed(() => ({
  'md-navigation-drawer': true,
  'md-navigation-drawer--open': isOpen.value,
  'md-navigation-drawer--modal': props.modal,
}));
</script>

<template>
  <!-- Scrim for modal drawer -->
  <Transition name="md-scrim-fade">
    <div
      v-if="modal && isOpen"
      class="md-navigation-drawer__scrim"
      @click="handleScrimClick"
    ></div>
  </Transition>

  <!-- Drawer -->
  <Transition name="md-drawer-slide">
    <aside
      v-if="isOpen"
      :class="drawerClasses"
      role="navigation"
      :aria-label="menu.name"
    >
      <!-- Header -->
      <div v-if="headline || $slots.header" class="md-navigation-drawer__header">
        <slot name="header">
          <h2 class="md-navigation-drawer__headline">{{ headline || menu.name }}</h2>
        </slot>
      </div>

      <!-- Content -->
      <div class="md-navigation-drawer__content">
        <template v-for="(group, groupIndex) in groupedItems" :key="groupIndex">
          <!-- Section Label -->
          <div v-if="group.label" class="md-navigation-drawer__section-label">
            {{ group.label }}
          </div>

          <!-- Section Divider (if not first group) -->
          <div v-else-if="groupIndex > 0" class="md-navigation-drawer__divider"></div>

          <!-- Items -->
          <div class="md-navigation-drawer__section">
            <MenuItem
              v-for="item in group.items"
              :key="item.url"
              :item="item"
              :is-active="isItemActive(item)"
              variant="drawer"
              :show-label="true"
              @click="handleItemClick"
              @action="handleAction"
            />
          </div>
        </template>
      </div>

      <!-- Footer -->
      <div v-if="$slots.footer" class="md-navigation-drawer__footer">
        <slot name="footer"></slot>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
/* M3 Navigation Drawer */
.md-navigation-drawer {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 360px;
  display: flex;
  flex-direction: column;
  background-color: var(--md-sys-color-surface-container-low);
  z-index: 200;
  overflow: hidden;
}

/* Standard (non-modal) drawer has rounded corners on right */
.md-navigation-drawer:not(.md-navigation-drawer--modal) {
  border-radius: 0 16px 16px 0;
}

/* Modal drawer overlays content */
.md-navigation-drawer--modal {
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
              0 16px 24px 2px rgba(0, 0, 0, 0.14),
              0 6px 30px 5px rgba(0, 0, 0, 0.12);
}

/* Scrim */
.md-navigation-drawer__scrim {
  position: fixed;
  inset: 0;
  background-color: var(--md-sys-color-scrim);
  opacity: 0.32;
  z-index: 199;
}

/* Header */
.md-navigation-drawer__header {
  padding: 16px 28px;
  min-height: 56px;
  display: flex;
  align-items: center;
}

.md-navigation-drawer__headline {
  font-size: 14px;
  font-weight: 500;
  color: var(--md-sys-color-on-surface-variant);
  margin: 0;
  letter-spacing: 0.1px;
}

/* Content */
.md-navigation-drawer__content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 0;
}

/* Section */
.md-navigation-drawer__section {
  display: flex;
  flex-direction: column;
}

.md-navigation-drawer__section-label {
  padding: 18px 28px 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--md-sys-color-on-surface-variant);
  letter-spacing: 0.1px;
}

/* Divider */
.md-navigation-drawer__divider {
  height: 1px;
  background-color: var(--md-sys-color-outline-variant);
  margin: 8px 28px;
}

/* Footer */
.md-navigation-drawer__footer {
  padding: 16px 28px;
  border-top: 1px solid var(--md-sys-color-outline-variant);
}

/* Transitions */
.md-drawer-slide-enter-active,
.md-drawer-slide-leave-active {
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.md-drawer-slide-enter-from,
.md-drawer-slide-leave-to {
  transform: translateX(-100%);
}

.md-scrim-fade-enter-active,
.md-scrim-fade-leave-active {
  transition: opacity 300ms ease;
}

.md-scrim-fade-enter-from,
.md-scrim-fade-leave-to {
  opacity: 0;
}

/* Hide on compact windows when not modal */
@media (max-width: 839px) {
  .md-navigation-drawer:not(.md-navigation-drawer--modal) {
    display: none;
  }
}

/* Adjust for expanded windows */
@media (min-width: 1200px) {
  .md-navigation-drawer:not(.md-navigation-drawer--modal) {
    position: relative;
    z-index: 1;
  }
}
</style>
