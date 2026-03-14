import type { menus } from '@/utils/types/menus'

import { createMenu, footerLegalMenuItems } from './shared'

export const footerLegalMenu: menus = createMenu({
  _id: 'custom-footer-legal-menu',
  menuType: 'footer',
  name: 'Footer Legal Menu',
  slug: 'footer-legal-menu',
  isActive: true,
  metadata: {
    component: 'CustomFooter',
    section: 'legal-links',
  },
  menuItems: footerLegalMenuItems,
})