
export interface componentTemplateNode {
  kind: string;
  classes: any;
  style: any;
  attributes: any;
  children: componentTemplateNode[];
  tag: string;
  component: string;
  content: string;
  source: any;
  repeatSource: boolean;
}
