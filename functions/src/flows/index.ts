import { beforeUserCreated } from 'firebase-functions/v2/identity';

import { newAccountContextHandler } from './newAccount';

export const newAccount = beforeUserCreated(async (event) => {
    await newAccountContextHandler(event);
});
