import { type components } from './components'
type Ref<T> = string | T;

export interface layouts {
  _id: string;
  name: string;
  description: string;
  component: Ref<components>;
  projectId: string;
}
