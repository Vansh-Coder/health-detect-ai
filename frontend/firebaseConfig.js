import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
export const auth = getAuth(app);
export const db = getFirestore(app);
