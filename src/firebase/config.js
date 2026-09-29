import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Veda Finder Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4cHwowjmIQWtHiqUfL1MSzw6HuWrWw64",
  authDomain: "vedafinder-6a228.firebaseapp.com",
  projectId: "vedafinder-6a228",
  storageBucket: "vedafinder-6a228.firebasestorage.app",
  messagingSenderId: "668596906294",
  appId: "1:668596906294:web:f4af366ffe3b308deaeb97",
  measurementId: "G-5MHYZXY75W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Auth instance & Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore Database
export const db = getFirestore(app);

// Storage
export const storage = getStorage(app);

// Analytics (safe initialize for browser support)
let analyticsInstance = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analyticsInstance = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics fallback if blocked by browser extensions
  });
}
export const analytics = analyticsInstance;

// Auth helper functions
export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const logoutUser = () => {
  return signOut(auth);
};

export { onAuthStateChanged };
