import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from 'firebase/auth';
import {
  signIn,
  signUp,
  logOut,
  resetPassword,
  confirmReset,
  googleSignIn,
  monitorAuthState
} from '@/utils/firebase/auth';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const loading = ref(true);  // Start as true to indicate auth is initializing
  const error = ref<string | null>(null);
  let authInitialized = false;  // Track if auth monitoring has been set up

  const initAuth = () => {
    // Prevent multiple initializations
    if (authInitialized) {
      return;
    }
    
    authInitialized = true;
    loading.value = true;
    monitorAuthState((currentUser) => {
      user.value = currentUser;
      loading.value = false;
    });
  };

  const loginUser = async (email: string, pass: string) => {
    loading.value = true;
    error.value = null;
    try {
      await signIn(email, pass);
    } catch (err: any) {
        error.value = err.message;
        throw err;
    } finally {
      loading.value = false;
    }
  };

  const registerUser = async (email: string, pass: string) => {
    loading.value = true;
    error.value = null;
    try {
      await signUp(email, pass);
    } catch (err: any) {
        error.value = err.message;
        throw err;
    } finally {
      loading.value = false;
    }
  };

  const logoutUser = async () => {
    loading.value = true;
    error.value = null;
    try {
      await logOut();
      user.value = null;
    } catch (err: any) {
        error.value = err.message;
        throw err;
    } finally {
      loading.value = false;
    }
  };

  const resetUserPassword = async (email: string) => {
    loading.value = true;
    error.value = null;
    try {
      await resetPassword(email);
    } catch (err: any) {
        error.value = err.message;
        throw err;
    } finally {
      loading.value = false;
    }
  };

  const confirmUserPasswordReset = async (oobCode: string, newPass: string) => {
    loading.value = true;
    error.value = null;
    try {
      await confirmReset(oobCode, newPass);
    } catch (err: any) {
        error.value = err.message;
        throw err;
    } finally {
      loading.value = false;
    }
  };

  const loginWithGoogle = async () => {
    loading.value = true;
    error.value = null;
    try {
      await googleSignIn();
    } catch (err: any) {
        error.value = err.message;
        throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    loading,
    error,
    initAuth,
    loginUser,
    registerUser,
    logoutUser,
    resetUserPassword,
    confirmUserPasswordReset,
    loginWithGoogle
  };
});
