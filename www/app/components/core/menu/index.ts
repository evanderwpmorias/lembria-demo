// M3 Navigation Components
// Material Design 3 compliant navigation and menu components

import menuItem from "./menuItem.vue";
import navigationBar from "./navigationBar.vue";
import navigationRail from "./navigationRail.vue";
import navigationDrawer from "./navigationDrawer.vue";
import navigationSideBar from "./navigationSideBar.vue";
import navigationFooter from "./navigationFooter.vue";
import navigationHeaderMenu from "./nvigationHeaderMenu.vue";

export const MenuItem = menuItem;
export const NavigationBar = navigationBar;
export const NavigationRail = navigationRail;
export const NavigationDrawer = navigationDrawer;
export const NavigationSideBar = navigationSideBar;
export const NavigationFooter = navigationFooter;
export const NavigationHeaderMenu = navigationHeaderMenu;

// Re-export types for convenience

export default [
  {
    name: "MenuItem",
    icon: "menu",
    path: "@/components/core/menu/menuItem.vue",
    component: menuItem,
  },
  {
    name: "NavigationBar",
    icon: "navigation",
    path: "@/components/core/menu/navigationBar.vue",
    component: navigationBar,
  },
  {
    name: "NavigationRail",
    icon: "rail",
    path: "@/components/core/menu/navigationRail.vue",
    component: navigationRail,
  },
  {
    name: "NavigationDrawer",
    icon: "menu_open",
    path: "@/components/core/menu/navigationDrawer.vue",
    component: navigationDrawer,
  },
  {
    name: "NavigationSideBar",
    icon: "side_navigation",
    path: "@/components/core/menu/navigationSideBar.vue",
    component: navigationSideBar,
  },
  {
    name: "NavigationFooter",
    icon: "footer",
    path: "@/components/core/menu/navigationFooter.vue",
    component: navigationFooter,
  },
  {
    name: "NavigationHeaderMenu",
    icon: "menu",
    path: "@/components/core/menu/nvigationHeaderMenu.vue",
    component: navigationHeaderMenu,
  },
];