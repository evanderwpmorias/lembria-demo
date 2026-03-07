<script lang="ts">
export default {
  name: "NavigationFooter"
};
</script>
<script setup lang="ts">
import { computed } from 'vue';
import type { menus } from '@/data/types/menus';
import type { menuItems } from '@/data/types/menuItems';

interface Props {
  menu: menus;
  activeUrl?: string;
  alignment?: 'start' | 'center' | 'end' | 'space-between';
  showDividers?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  activeUrl: '',
  alignment: 'center',
  showDividers: true,
});

const emit = defineEmits<{
  (e: 'navigate', item: menuItems): void;
  (e: 'action', item: menuItems): void;
}>();

// Filter visible items (no separators in footer)
const visibleItems = computed(() => {
  if (!props.menu?.menuItems) return [];
  return props.menu.menuItems.filter((item: menuItems) => item.type !== 'separator');
});

const isItemActive = (item: menuItems): boolean => {
  return item.url === props.activeUrl;
};

const handleClick = (item: menuItems) => {
  if (item.type === 'action') {
    emit('action', item);
  } else {
    emit('navigate', item);
  }
};

const footerClasses = computed(() => ({
  'md-navigation-footer': true,
  [`md-navigation-footer--${props.alignment}`]: true,
}));
</script>

<template>
  <footer
    :class="footerClasses"
    role="navigation"
    :aria-label="menu.name"
  >
    <div class="md-navigation-footer__container">
      <template v-for="(item, index) in visibleItems" :key="item.url || index">
        <!-- Divider -->
        <span
          v-if="showDividers && index > 0"
          class="md-navigation-footer__divider"
          aria-hidden="true"
        >
          |
        </span>

        <!-- Link Item -->
        <a
          v-if="item.type === 'link' || !item.type"
          :href="item.url"
          class="md-navigation-footer__link"
          :class="{ 'md-navigation-footer__link--active': isItemActive(item) }"
          @click.prevent="handleClick(item)"
        >
          <span v-if="item.icon" class="md-navigation-footer__icon material-symbols-outlined">
            {{ item.icon }}
          </span>
          <span class="md-navigation-footer__label">{{ item.displayText }}</span>
        </a>

        <!-- Action Button -->
        <button
          v-else-if="item.type === 'action'"
          class="md-navigation-footer__button"
          @click="handleClick(item)"
        >
          <span v-if="item.icon" class="md-navigation-footer__icon material-symbols-outlined">
            {{ item.icon }}
          </span>
          <span class="md-navigation-footer__label">{{ item.displayText }}</span>
        </button>
      </template>
    </div>

    <!-- Secondary content slot -->
    <div v-if="$slots.secondary" class="md-navigation-footer__secondary">
      <slot name="secondary"></slot>
    </div>
  </footer>
</template>

<style scoped>
/* M3 Navigation Footer - Horizontal footer navigation */
.md-navigation-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px 16px;
  background-color: var(--md-sys-color-surface-container);
  border-top: 1px solid var(--md-sys-color-outline-variant);
}

.md-navigation-footer__container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

/* Alignment variations */
.md-navigation-footer--start .md-navigation-footer__container {
  justify-content: flex-start;
}

.md-navigation-footer--center .md-navigation-footer__container {
  justify-content: center;
}

.md-navigation-footer--end .md-navigation-footer__container {
  justify-content: flex-end;
}

.md-navigation-footer--space-between .md-navigation-footer__container {
  justify-content: space-between;
  width: 100%;
}

/* Links and Buttons */
.md-navigation-footer__link,
.md-navigation-footer__button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--md-sys-color-on-surface-variant);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 200ms ease, color 200ms ease;
}

.md-navigation-footer__link:hover,
.md-navigation-footer__button:hover {
  background-color: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
  color: var(--md-sys-color-on-surface);
}

.md-navigation-footer__link:focus-visible,
.md-navigation-footer__button:focus-visible {
  outline: 2px solid var(--md-sys-color-primary);
  outline-offset: 2px;
}

.md-navigation-footer__link--active {
  color: var(--md-sys-color-primary);
  background-color: color-mix(in srgb, var(--md-sys-color-primary) 12%, transparent);
}

/* Icon */
.md-navigation-footer__icon {
  font-size: 18px;
}

/* Label */
.md-navigation-footer__label {
  white-space: nowrap;
}

/* Divider */
.md-navigation-footer__divider {
  color: var(--md-sys-color-outline-variant);
  font-size: 12px;
  padding: 0 4px;
}

/* Secondary section */
.md-navigation-footer__secondary {
  font-size: 12px;
  color: var(--md-sys-color-on-surface-variant);
  text-align: center;
}

/* Responsive */
@media (max-width: 599px) {
  .md-navigation-footer {
    padding: 16px 12px;
  }

  .md-navigation-footer__link,
  .md-navigation-footer__button {
    padding: 8px;
    font-size: 12px;
  }

  .md-navigation-footer__divider {
    display: none;
  }

  .md-navigation-footer__container {
    gap: 4px;
  }
}
</style>
