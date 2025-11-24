import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDkM1tvt8u4PPtWe3R0EFkxytDlFd918fA",
  authDomain: "pc-tienda-react.firebaseapp.com",
  projectId: "pc-tienda-react",
  storageBucket: "pc-tienda-react.appspot.com",
  messagingSenderId: "727099711570",
  appId: "1:727099711570:web:5c73b29fd42c9c00bb3f8b",
  measurementId: "G-7EX7PC3EXZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);         // Autenticación
export const storage = getStorage(app);   // Storage para archivos

