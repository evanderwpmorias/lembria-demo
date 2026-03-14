import type { menus } from '@/utils/types/menus'

import { createMenu, marketingNavigationMenuItems } from './shared'

export const mainHeaderNavigationMenu: menus = createMenu({
  _id: 'custom-main-header-navigation',
  menuType: 'navigation',
  name: 'Main Header Navigation',
  slug: 'main-header-navigation',
  isActive: true,
  metadata: {
    component: 'CustomMainHeader',
    variant: 'main',
    section: 'primary-navigation',
  },
  menuItems: marketingNavigationMenuItems,
})