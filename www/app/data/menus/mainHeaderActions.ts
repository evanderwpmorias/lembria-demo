import type { menus } from '@/utils/types/menus'

import { createMenu, marketingActionMenuItems } from './shared'

export const mainHeaderActionsMenu: menus = createMenu({
  _id: 'custom-main-header-actions',
  menuType: 'actions',
  name: 'Main Header Actions',
  slug: 'main-header-actions',
  isActive: true,
  metadata: {
    component: 'CustomMainHeader',
    variant: 'main',
    section: 'auth-actions',
  },
  menuItems: marketingActionMenuItems,
})