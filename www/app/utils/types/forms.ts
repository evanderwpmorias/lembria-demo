import { type entities } from './entities'
import { type formInputs } from './formInputs'
import { type validationRules } from './validationRules'
import { type formActions } from './formActions'
import { type projects } from './projects'
type Ref<T> = string | T;

export interface forms {
  _id: string;
  title: string;
  schema: Ref<entities>;
  inputs: formInputs[];
  rules: validationRules[];
  actions: formActions[];
  projectId: Ref<projects>;
  supportingText: string;
  name: string;
  layout: string;
}
