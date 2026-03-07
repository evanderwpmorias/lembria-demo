import { type outputConfig } from './outputConfig'

import { type appEnvironment } from './appEnvironment'

export interface app {
  _id: string;
  projectId: string;
  name: string;
  description: string;
  type: string;
  status: string;
  version: string | undefined;
  tags: string[];
  repository: string;
  outputConfig: outputConfig;
  envs: appEnvironment[];
  routes: string[];
  redirects: string[];
  api: string;
}
