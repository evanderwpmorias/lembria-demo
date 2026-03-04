import { type materialTheme } from './materialTheme'

export interface projects {
  _id: string;
  name: string;
  description: string;
  repositoryLink: any;
  status: string;
  dateCreated: any;
  lastEdited: any;
  type: string | undefined;
  field: string | undefined;
  tags: string[] | undefined;
  outputPath: any;
  baseOutputPath: string;
  version: string | undefined;
  summary: string;
  themeSettings: materialTheme;
}
