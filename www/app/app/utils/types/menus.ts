import { type projects } from './projects'
import { type menuItems } from './menuItems'
import { type apps } from './apps'
type Ref<T> = string | T;

export interface menus {
  _id: string;
  menuType: string;
  name: string;
  slug: string;
  projectId: Ref<projects>;
  isActive: boolean;
  metadata: any;
  menuItems: menuItems[];
  app: Ref<apps>;
}
