import { type projects } from './projects'
type Ref<T> = string | T;

export interface userRoles {
  _id: string;
  name: string;
  description: string;
  applicableScenarios: string[];
  projectId: Ref<projects>;
}
