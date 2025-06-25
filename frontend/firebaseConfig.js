import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIr6HqvtG977OMIMKB3sm5IVfHn1SgBUU",
  authDomain: "healthdetect-ai.firebaseapp.com",
  projectId: "healthdetect-ai",
  storageBucket: "healthdetect-ai.firebasestorage.app",
  messagingSenderId: "996510918837",
  appId: "1:996510918837:web:05b98198bde7847054f6fc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
