import { getAuth } from 'firebase-admin/auth';

export type FlowActionHandlerParams = {
	input?: any;
	config?: Record<string, any>;
	step?: Record<string, any>;
	context?: Record<string, any>;
	flowMeta?: Record<string, any>;
};

export const firebaseAuthActionHandlers: Record<string, (params?: FlowActionHandlerParams) => Promise<any>> = {
  'firebaseAuth.createUser': async (params: FlowActionHandlerParams = {}) => {
    const userRecord = await getAuth().createUser({
        email: params.input.email,
        password: params.input.password,
        phoneNumber: params.input.phoneNumber,
        displayName: params.input.displayName,
        photoURL: params.input.photoURL,
        emailVerified: params.input.emailVerified,
        disabled: params.input.disabled
    });
    return { uid: userRecord.uid, userRecord };
  },

  'firebaseAuth.deleteUser': async (params: FlowActionHandlerParams = {}) => {
    await getAuth().deleteUser(params.input.uid);
    return { success: true };
  },

  'firebaseAuth.generateEmailVerificationLink': async (params: FlowActionHandlerParams = {}) => {
    const verificationLink = await getAuth().generateEmailVerificationLink(params.input.email);
    return { verificationLink };
  },

  'firebaseAuth.generatePasswordResetLink': async (params: FlowActionHandlerParams = {}) => {
    const resetLink = await getAuth().generatePasswordResetLink(params.input.email);
    return { resetLink };
  },

  'firebaseAuth.getUser': async (params: FlowActionHandlerParams = {}) => {
    const userRecord = await getAuth().getUser(params.input.uid);
    return { userRecord };
  },

  'firebaseAuth.getUserByEmail': async (params: FlowActionHandlerParams = {}) => {
    const userRecord = await getAuth().getUserByEmail(params.input.email);
    return { userRecord };
  },

  'firebaseAuth.listUsers': async (params: FlowActionHandlerParams = {}) => {
    const listResult = await getAuth().listUsers(params.input.maxResults, params.input.pageToken);
    return { users: listResult.users, nextPageToken: listResult.pageToken };
  },

  'firebaseAuth.revokeRefreshTokens': async (params: FlowActionHandlerParams = {}) => {
    await getAuth().revokeRefreshTokens(params.input.uid);
    return { success: true };
  },

  'firebaseAuth.setCustomClaims': async (params: FlowActionHandlerParams = {}) => {
    await getAuth().setCustomUserClaims(params.input.uid, JSON.parse(params.input.claims));
    return { success: true };
  },

  'firebaseAuth.updateUser': async (params: FlowActionHandlerParams = {}) => {
    const userRecord = await getAuth().updateUser(params.input.uid, {
        email: params.input.email,
        password: params.input.password,
        displayName: params.input.displayName,
        photoURL: params.input.photoURL,
        disabled: params.input.disabled
    });
    return { userRecord };
  },

  'firebaseAuth.verifyIdToken': async (params: FlowActionHandlerParams = {}) => {
    const decodedToken = await getAuth().verifyIdToken(params.input.idToken, params.config.checkRevoked);
    return { decodedToken };
  }
};
