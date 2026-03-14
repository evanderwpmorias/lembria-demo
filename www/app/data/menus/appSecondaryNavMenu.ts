import type { menus } from '@/utils/types/menus'

import { createMenu } from './shared'

export const appSecondaryNavMenu: menus = createMenu({
  _id: 'app-secondary-navigation',
  menuType: 'navigation',
  name: 'App Secondary Navigation',
  slug: 'app-secondary-navigation',
  isActive: true,
  metadata: {
    context: 'app-shell',
    group: 'secondary',
  },
  menuItems: [
    {
      url: '/app/family',
      displayText: 'Families',
      icon: 'family_restroom',
      type: 'static',
      sortOrder: 0,
      menuItems: [],
    },
    // {
    //   url: '/app/studio',
    //   displayText: 'Studio',
    //   icon: 'graphic_eq',
    //   type: 'static',
    //   sortOrder: 1,
    //   menuItems: [],
    // },
    {
      url: '/app/people',
      displayText: 'People',
      icon: 'group',
      type: 'static',
      sortOrder: 2,
      menuItems: [],
    }


  ],
})