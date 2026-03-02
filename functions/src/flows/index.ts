import { beforeUserCreated } from 'firebase-functions/v2/identity';

import { newAccountFlow, newAccountFlowMeta } from './newAccount';

const newAccountContextHandler = (payload?: any) => {
	if (payload && typeof payload === 'object') {
		return newAccountFlow({ ...payload, flowMeta: newAccountFlowMeta });
	}
	return newAccountFlow({ value: payload, flowMeta: newAccountFlowMeta });
};

export const newAccount = beforeUserCreated((event) => {
            return newAccountContextHandler(event);
        });
