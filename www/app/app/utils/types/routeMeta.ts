import { type userRoles } from './userRoles'
import { type layouts } from './layouts'
import { type entities } from './entities'
type Ref<T> = string | T;

export interface routeMeta {
  allowedRoleIds: Ref<userRoles>[];
  layout: Ref<layouts>;
  isVisible: boolean;
  entity: Ref<entities>;
}
