import type { menus } from '@/utils/types/menus'

import { createMenu, marketingNavigationMenuItems } from './shared'

export const appHeaderNavigationMenu: menus = createMenu({
  _id: 'custom-app-header-navigation',
  menuType: 'navigation',
  name: 'App Header Navigation',
  slug: 'app-header-navigation',
  isActive: true,
  metadata: {
    component: 'CustomAppHeader',
    variant: 'app',
    section: 'primary-navigation',
  },
  menuItems: marketingNavigationMenuItems,
})