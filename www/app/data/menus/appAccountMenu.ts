import type { menus } from '@/utils/types/menus'

import { createMenu } from './shared'

export const appAccountMenu: menus = createMenu({
  _id: 'app-account-menu',
  menuType: 'account',
  name: 'App Account Menu',
  slug: 'app-account-menu',
  isActive: true,
  metadata: {
    context: 'app-shell',
    group: 'account',
  },
  menuItems: [
    {
      url: '/app/profile',
      displayText: 'Profile',
      icon: 'person',
      type: 'static',
      sortOrder: 0,
      menuItems: [],
    },
    {
      url: '/app/profile/preferences',
      displayText: 'Preferences',
      icon: 'tune',
      type: 'static',
      sortOrder: 1,
      menuItems: [],
    },
    {
      url: '/app/help',
      displayText: 'Help',
      icon: 'help',
      type: 'static',
      sortOrder: 6,
      menuItems: [],
    },
    {
      url: '/app/profile/notifications',
      displayText: 'Notifications',
      icon: 'notifications',
      type: 'static',
      sortOrder: 2,
      menuItems: [],
    },
    {
      url: '/app/account',
      displayText: 'Account & Security',
      icon: 'security',
      type: 'static',
      sortOrder: 3,
      menuItems: [],
    },
    {
      url: '/sign-in',
      displayText: 'Logout',
      icon: 'logout',
      type: 'action',
      sortOrder: 4,
      menuItems: [],
    },
  ],
})