type Ref<T> = string | T;

export interface variables {
  _id: string;
  name: string;
  type: string;
  source: string;
  requiredVariables: Ref<variables>[];
  value: string;
  vueType: string | undefined;
}
