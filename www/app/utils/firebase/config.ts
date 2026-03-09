

export const firebaseSettings = {
  providers: ['google.com', 'email'], //, 'facebook.com', 'twitter.com', 'github.com' optional
  roles: ['admin', 'operator', 'supper', 'public'], // public is default on unauthenticated users
  enablePersistence: true,
  redirectAuthPath: '/sign-in',
  redirectPath: '/',
};
