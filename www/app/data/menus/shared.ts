import type { menuItems } from '@/utils/types/menuItems'
import type { menus } from '@/utils/types/menus'

type MenuItemInput = Omit<menuItems, 'menuItems' | 'sortOrder'> & {
  sortOrder?: number
  menuItems?: menuItems[]
}

const defaultProjectId = '673884424a0893abdf4b0e10'
const defaultAppId = '68ff3e2ec7b66d8139c7a445'

export const cloneMenuItems = (items: menuItems[]): menuItems[] =>
  items.map((item) => ({
    ...item,
    menuItems: cloneMenuItems(item.menuItems ?? []),
  }))

const normalizeMenuItems = (items: MenuItemInput[]): menuItems[] =>
  items.map((item, index) => ({
    ...item,
    sortOrder: item.sortOrder ?? index,
    menuItems: cloneMenuItems(item.menuItems ?? []),
  }))

export const createMenu = ({
  _id,
  menuType,
  name,
  slug,
  isActive,
  metadata,
  menuItems,
}: Omit<menus, 'projectId' | 'app'>): menus => ({
  _id,
  menuType,
  name,
  slug,
  projectId: defaultProjectId,
  isActive,
  metadata,
  menuItems: cloneMenuItems(menuItems),
  app: defaultAppId,
})

export const marketingNavigationMenuItems = normalizeMenuItems([
  {
    url: '/',
    displayText: 'Home',
    icon: 'home',
    type: 'static',
  },
  {
    url: '/how-it-works',
    displayText: 'How it works',
    icon: 'help',
    type: 'static',
  },
  {
    url: '/stories',
    displayText: 'Stories',
    icon: 'auto_stories',
    type: 'static',
  },
  {
    url: '/trust',
    displayText: 'Trust',
    icon: 'verified_user',
    type: 'static',
  },
])

export const marketingActionMenuItems = normalizeMenuItems([
  {
    url: '/sign-in',
    displayText: 'Sign In',
    icon: 'login',
    type: 'action',
  },
  {
    url: '/sign-up',
    displayText: 'Get Started',
    icon: 'person_add',
    type: 'action',
  },
])

export const footerLegalMenuItems = normalizeMenuItems([
  {
    url: '/trust',
    displayText: 'Trust',
    icon: 'verified_user',
    type: 'static',
  },
  {
    url: '/privacy',
    displayText: 'Privacy Policy',
    icon: 'policy',
    type: 'static',
  },
  {
    url: '/terms',
    displayText: 'Terms & Conditions',
    icon: 'gavel',
    type: 'static',
  },
])