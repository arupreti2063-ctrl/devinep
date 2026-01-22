// Firebase SDKs बाट आवश्यक functions import गर्ने
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Web app को Firebase configuration
// Firebase JS SDK v7.20.0 र त्यसपछिको लागि measurementId optional छ
const firebaseConfig = {
  apiKey: "AIzaSyB6ugxTI2f0qNBGEjL1qpfVpxFYKaolqSw",
  authDomain: "devinepal-guru.firebaseapp.com",
  projectId: "devinepal-guru",
  storageBucket: "devinepal-guru.firebasestorage.app",
  messagingSenderId: "893461351766",
  appId: "1:893461351766:web:c257bd2c203b1dc50c9af7",
  measurementId: "G-SZB8X8RZXC"
};

// Firebase initialize गर्ने
const app = initializeApp(firebaseConfig);

// Analytics initialize गर्ने (उपलब्ध भएमात्र, development मा break हुँदैन)
let analytics;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.log('Analytics not available:', error);
}

// Firebase services initialize गर्ने र export गर्ने
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;