
export interface formInputs {
  label: string;
  schemaProperty: string;
  defaultValue: string;
  placeholder: string;
  pattern: string;
  inputOrder: number | undefined;
  isVisible: boolean;
  supportingText: string;
  component: any;
  icon: string | undefined;
  inputs: formInputs[] | undefined;
  refferenceMap: string;
  refferenceMode: string | undefined;
}
