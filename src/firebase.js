// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDI0byWWUJNSqfOQfEONvE-A8EDp18kiQU",
  authDomain: "task-management-4d66e.firebaseapp.com",
  projectId: "task-management-4d66e",
  storageBucket: "task-management-4d66e.appspot.com",
  messagingSenderId: "107888627926",
  appId: "1:107888627926:web:64ea640c0085a6382ff977",
  measurementId: "G-C1Z78Q88KJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
