
import { firebaseSettings } from '@/utils/firebase/config';
import { logOut } from '@/utils/firebase/auth';

export default defineNuxtRouteMiddleware(async (to) => {

  const _sessionToken = useCookie('__session');
  
  const authPages = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password', '/sign-out', '/logout'];
  const isAuthPage = authPages.some((page) => to.path.startsWith(page));
  const isLogoutPage = to.path === '/sign-out' || to.path === '/logout';
  const redirectAuthPath = firebaseSettings.redirectAuthPath || '/sign-in';
  const redirectPath = firebaseSettings.redirectPath || '/';

  if (import.meta.server) {
    // Redirect unauthenticated users away from protected pages
    if (!isAuthPage && !_sessionToken.value) {
      return navigateTo(redirectAuthPath);
    }

    // Redirect authenticated users away from auth pages (except logout)
    if (_sessionToken.value && isAuthPage && !isLogoutPage) {
      return navigateTo(redirectPath);
    }
  }

  if (import.meta.client) {
    // Handle logout on client side
    if (isLogoutPage) {
      _sessionToken.value = null;
      await logOut();
      return navigateTo(redirectAuthPath);
    }

    // Redirect unauthenticated users to sign-in
    const user = await getCurrentUser();
    if (!user && !isAuthPage) {
      return navigateTo(redirectAuthPath);
    }
  }


});