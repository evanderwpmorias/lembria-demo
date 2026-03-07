import { type entityProperties } from './entityProperties'

export interface entities {
  _id: string;
  projectId: string;
  name: string;
  description: string;
  properties: entityProperties[];
  apiEndpoint: string;
  useState: boolean;
  timeStamps: boolean;
  displayName: string;
}
