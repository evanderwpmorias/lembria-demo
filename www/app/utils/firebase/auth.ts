import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  confirmPasswordReset,
  type User,
  getAuth
} from "firebase/auth";
// import { auth } from "./config";

export const signIn = async (email: string, pass: string) => {
  return signInWithEmailAndPassword(getAuth(), email, pass);
};

export const signUp = async (email: string, pass: string) => {
  return createUserWithEmailAndPassword(getAuth(), email, pass);
};

export const logOut = async () => {
  return firebaseSignOut(getAuth());
};

export const resetPassword = async (email: string) => {
  return sendPasswordResetEmail(getAuth(), email);
};

export const confirmReset = async (oobCode: string, newPass: string) => {
  return confirmPasswordReset(getAuth(), oobCode, newPass);
};

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(getAuth(), provider);
};

export const monitorAuthState = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(getAuth(), callback);
};

export const getCurrentUser = () => {
    return getAuth().currentUser;
}