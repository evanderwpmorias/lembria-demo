import { type projects } from './projects'
type Ref<T> = string | T;

export interface redirectRule {
  _id: string;
  fromPath: string[];
  to: string;
  statusCode: string;
  keepQuery: boolean;
  keepHash: boolean;
  projectId: Ref<projects>;
  isEnabled: boolean;
  validFrom: any;
  validTo: any;
}
