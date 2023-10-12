// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-6eb7f.firebaseapp.com",
  projectId: "mern-estate-6eb7f",
  storageBucket: "mern-estate-6eb7f.appspot.com",
  messagingSenderId: "403850974193",
  appId: "1:403850974193:web:1efb117fa5ad634323ea50",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
