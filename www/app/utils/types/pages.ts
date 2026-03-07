import { type layouts } from './layouts'
import { type components } from './components'
import { type projects } from './projects'
import { type pageMeta } from './pageMeta'
type Ref<T> = string | T;

export interface pages {
  _id: string;
  title: string;
  description: string;
  layout: Ref<layouts>;
  components: Ref<components>;
  associatedUserActions: string[];
  projectId: Ref<projects>;
  metaTags: pageMeta[] | undefined;
}
