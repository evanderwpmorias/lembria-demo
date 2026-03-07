import { type projects } from './projects'
import { type repository } from './repository'
import { type outputConfig } from './outputConfig'
import { type appEnvironment } from './appEnvironment'
import { type apiSettings } from './apiSettings'
import { type userRoles } from './userRoles'
import { type materialTheme } from './materialTheme'
type Ref<T> = string | T;

export interface apps {
  _id: string;
  projectId: Ref<projects>;
  name: string;
  description: string;
  type: string;
  status: string;
  version: string | undefined;
  tags: string[];
  repository: Ref<repository>;
  outputConfig: outputConfig;
  envs: appEnvironment[];
  api: Ref<apiSettings>;
  targetUsers: Ref<userRoles>[];
  routeStyle: string;
  componentTheme: string;
  themeSettings: materialTheme;
}
