import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const requiredEnv = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const missing = Object.entries(requiredEnv)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missing.length) {
  console.warn(
    `Firebase is not configured. Missing environment values: ${missing.join(", ")}. Copy .env.example to .env.local and fill it in.`,
  );
}

const firebaseConfig = {
  ...requiredEnv,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = missing.length ? null : initializeApp(firebaseConfig);

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const firebaseReady = Boolean(app);
