import { type entityProperties } from './entityProperties'

export interface filterSchema {
  field: entityProperties;
  inputTypes: string | undefined;
  inputValues: string[];
  operator: string | undefined;
  logicOperators: string | undefined;
  constant: boolean | undefined;
}
