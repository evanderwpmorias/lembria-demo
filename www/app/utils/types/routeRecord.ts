import { type pages } from './pages'
import { type routeMeta } from './routeMeta'
import { type projects } from './projects'
import { type apps } from './apps'
type Ref<T> = string | T;

export interface routeRecord {
  _id: string;
  path: string;
  name: string;
  page: Ref<pages>;
  parent: Ref<routeRecord>;
  alias: string[];
  redirectTo: string;
  props: boolean;
  meta: routeMeta;
  projectId: Ref<projects>;
  isEnabled: boolean;
  app: Ref<apps>;
}
