import { type filterSchema } from './filterSchema'
import { type entityProperties } from './entityProperties'
import { type entities } from './entities'
import { type listActions } from './listActions'
import { type projects } from './projects'
type Ref<T> = string | T;

export interface lists {
  _id: string;
  name: string;
  description: string;
  filterSchema: filterSchema[];
  updateListOnChange: boolean;
  listLayout: string | undefined;
  filterLayout: string | undefined;
  tableFields: entityProperties[];
  listMainField: string;
  listMainValue: string | undefined;
  entity: Ref<entities> | undefined;
  type: string | undefined;
  actions: listActions[] | undefined;
  projectId: Ref<projects> | undefined;
  loadingStrategy: string | undefined;
}
