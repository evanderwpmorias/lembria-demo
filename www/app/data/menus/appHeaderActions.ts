import type { menus } from '@/utils/types/menus'

import { createMenu, marketingActionMenuItems } from './shared'

export const appHeaderActionsMenu: menus = createMenu({
  _id: 'custom-app-header-actions',
  menuType: 'actions',
  name: 'App Header Actions',
  slug: 'app-header-actions',
  isActive: true,
  metadata: {
    component: 'CustomAppHeader',
    variant: 'app',
    section: 'auth-actions',
  },
  menuItems: marketingActionMenuItems,
})