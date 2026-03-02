import { firebaseAuthActionHandlers } from './firebaseAuth';
import { mongooseActionHandlers } from './mongoose';

export { firebaseAuthActionHandlers } from './firebaseAuth';
export { mongooseActionHandlers } from './mongoose';

export const flowActionHandlers = {
  ...firebaseAuthActionHandlers,
  ...mongooseActionHandlers
};
