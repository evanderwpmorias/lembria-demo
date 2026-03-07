
export interface validationRules {
  pattern: string;
  errorMessage: string;
  minLength: number;
  maxLength: number;
  min: number;
  max: number;
  isRequired: boolean;
  isUnique: boolean;
  type: string;
}
