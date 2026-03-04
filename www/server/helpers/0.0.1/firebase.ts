
    
import { cert, initializeApp, getApps, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { useRuntimeConfig } from "nitropack/runtime";

const serverConfig = useRuntimeConfig()
const certificate = (serverConfig.googleAppicationCreds.includes('.json')) ? serverConfig.googleAppicationCreds : serverConfig.googleServiceCert as ServiceAccount

const app = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(certificate),
    });

export const authAdmin = getAuth(app);
export const firestoreAdmin = getFirestore(app); 

