
export interface entityProperties {
  name: string;
  type: string;
  minLength: number;
  maxLength: number;
  min: number;
  max: number;
  enum: any[];
  required: boolean;
  default: string;
  validationPattern: string;
  isArray: boolean;
  description: string;
  source: string;
  isUnique: boolean | undefined;
}
