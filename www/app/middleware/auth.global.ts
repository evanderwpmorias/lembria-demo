
import { firebaseSettings } from '@/utils/firebase/config';
import { logOut } from '@/utils/firebase/auth';

export default defineNuxtRouteMiddleware(async (to) => {

  const _sessionToken = useCookie('__session');
  
  const publicPages = ['/', '/how-it-works', '/stories', '/trust', '/privacy', '/terms'];
  const authPages = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password', '/sign-out', '/logout'];

  const isPublicPage = publicPages.includes(to.path) || to.path.startsWith('/invite/');
  const isAuthPage = authPages.some((page) => to.path.startsWith(page));
  const isLogoutPage = to.path === '/sign-out' || to.path === '/logout';
  const redirectAuthPath = firebaseSettings.redirectAuthPath || '/sign-in';
  const redirectPath = firebaseSettings.redirectPath || '/app/home';

  if (import.meta.server) {
    // Redirect unauthenticated users away from protected pages
    if (!isAuthPage && !isPublicPage && !_sessionToken.value) {
      return navigateTo(redirectAuthPath);
    }

    // Redirect authenticated users landing on "/" to the app home
    if (_sessionToken.value && to.path === '/') {
      return navigateTo(redirectPath);
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

    const user = await getCurrentUser();

    // Allow public and auth pages without a user
    if (!user && !isAuthPage && !isPublicPage) {
      return navigateTo(redirectAuthPath);
    }

    // Redirect authenticated users landing on "/" to the app home
    if (user && to.path === '/') {
      return navigateTo(redirectPath);
    }

    // Redirect authenticated users away from auth pages (except logout)
    if (user && isAuthPage && !isLogoutPage) {
      return navigateTo(redirectPath);
    }
  }


});