// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5IZYZmnFLG3LnNXm7jYgMdYJBkh7T5E0",
  authDomain: "autenticaciones-73830.firebaseapp.com",
  projectId: "autenticaciones-73830",
  storageBucket: "autenticaciones-73830.firebasestorage.app",
  messagingSenderId: "1059953368349",
  appId: "1:1059953368349:web:d2c934fffbf2dc923095f4",
  measurementId: "G-CKDFN4D43M"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export { auth, provider };