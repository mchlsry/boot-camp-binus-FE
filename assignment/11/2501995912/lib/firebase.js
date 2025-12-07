import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJfEQBvgk5VsaxVL7zng0wnbtDkJuC7jg",
  authDomain: "fir-sesi-11.firebaseapp.com",
  projectId: "fir-sesi-11",
  storageBucket: "fir-sesi-11.firebasestorage.app",
  messagingSenderId: "373936444132",
  appId: "1:373936444132:web:ef6e08652a9cd7a011d2f1",
  measurementId: "G-RTYT2SYTRV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
