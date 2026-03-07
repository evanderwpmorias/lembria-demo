import { type componentProp } from './componentProp'
import { type componentSchema } from './componentSchema'
import { type componentTemplateNode } from './componentTemplateNode'
import { type componentImports } from './componentImports'

export interface components {
  _id: string;
  name: string;
  id: string;
  description: string;
  icon: string;
  parentId: string;
  type: string;
  styles: string[];
  actions: string[];
  props: componentProp[];
  visibility: boolean;
  isInteractive: boolean;
  projectId: string;
  classes: any[];
  scripts: any[];
  schema: componentSchema[];
  template: componentTemplateNode[];
  imports: componentImports[];
}
