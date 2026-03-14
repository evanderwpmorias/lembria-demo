import type { menus } from '@/utils/types/menus'

import { createMenu } from './shared'

export const appBottomNavMenu: menus = createMenu({
  _id: 'app-bottom-navigation',
  menuType: 'navigation',
  name: 'App Bottom Navigation',
  slug: 'app-bottom-navigation',
  isActive: true,
  metadata: {
    context: 'app-shell',
    group: 'mobile-bottom',
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