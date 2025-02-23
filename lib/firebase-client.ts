import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_CLIENT,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_CLIENT,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_CLIENT,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_CLIENT,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_CLEINT,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_CLIENT,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID_CLIENT,
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
