import admin from "firebase-admin";

const config = {
  credential: admin.credential.cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

export const firebase = admin.apps.length
  ? admin.app()
  : admin.initializeApp(config);

export const firestore = firebase.firestore();
export const adminAuth = firebase.auth();
export const FIREBASE_TIMESTAMP = admin.firestore.FieldValue.serverTimestamp();
