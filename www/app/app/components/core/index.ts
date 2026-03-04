/**
 * Core Components Registry
 * 
 * Central registry for all core components with:
 * - Combined array of all component entries
 * - Map for O(1) lookup by component name
 * - Named exports for tree-shaking
 */


import dialogComponents from './dialog/index';
import formComponents from './form/index';
import inputComponents from './inputs/index';
import listComponents from './lists/index';
import menuComponents from './menu/index';


// Dialog
export { DialogBase, DialogHelper } from './dialog/index';

// Lists
export { ListGroup, Dragable, ListTemplate } from './lists/index';

// Menu
export {
  MenuItem,
  NavigationBar,
  NavigationRail,
  NavigationDrawer,
  NavigationSideBar,
  NavigationFooter,
  NavigationHeaderMenu
} from './menu/index';
