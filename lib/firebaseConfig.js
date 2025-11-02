// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBvQ_RmLytgs-s9N6J1roMk9Fw2J-y9y2M",
  authDomain: "tig25-252525.firebaseapp.com",
  projectId: "tig25-252525",
  storageBucket: "tig25-252525.firebasestorage.app",
  messagingSenderId: "972519160827",
  appId: "1:972519160827:web:d4f087f3c178e9a7c3e95e",
  measurementId: "G-90VF1KD7HV"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


export {db, auth, googleProvider};