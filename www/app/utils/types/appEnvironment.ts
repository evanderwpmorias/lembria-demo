
export interface appEnvironment {
  name: string;
  variables: any;
  provider: string;
  url: string;
  region: string;
  buildCommand: string;
  deployCommand: string;
}
