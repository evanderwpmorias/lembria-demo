import { type userRoles } from './userRoles'
import { type entities } from './entities'
type Ref<T> = string | T;

export interface entityApi {
  allowedGet: Ref<userRoles>[];
  allowedPost: Ref<userRoles>[];
  allowedPut: Ref<userRoles>[];
  allowedDelete: Ref<userRoles>[];
  fileGenTamplete: string;
  endPoint: string | undefined;
  entityId: Ref<entities> | undefined;
  dataBase: string | undefined;
}
