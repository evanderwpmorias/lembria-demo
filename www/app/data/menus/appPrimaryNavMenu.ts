import type { menus } from '@/utils/types/menus'

import { createMenu } from './shared'

export const appPrimaryNavMenu: menus = createMenu({
  _id: 'app-primary-navigation',
  menuType: 'navigation',
  name: 'App Primary Navigation',
  slug: 'app-primary-navigation',
  isActive: true,
  metadata: {
    context: 'app-shell',
    group: 'primary',
  },
  menuItems: [
    {
      url: '/app/home',
      displayText: 'Home',
      icon: 'home',
      type: 'static',
      sortOrder: 0,
      menuItems: [],
    },
    {
      url: '/app/memories',
      displayText: 'Memories',
      icon: 'collections_bookmark',
      type: 'static',
      sortOrder: 1,
      menuItems: [],
    },
    {
      url: '/app/stories',
      displayText: 'Stories',
      icon: 'auto_stories',
      type: 'static',
      sortOrder: 2,
      menuItems: [],
    },
    {
      url: '/app/explore',
      displayText: 'Explore',
      icon: 'explore',
      type: 'static',
      sortOrder: 3,
      menuItems: [],
    },
  ],
})