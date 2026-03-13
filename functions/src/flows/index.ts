import { beforeUserCreated } from 'firebase-functions/v2/identity';

import { newAccountContextHandler } from './newAccount';
import { ensureDbConnected, mongoDbSecret } from '../libs/mongoose';

export const newAccount = beforeUserCreated({secrets: [mongoDbSecret]}, async (event) => {
    await ensureDbConnected();
    await newAccountContextHandler(event);
});
