import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDI0byWWUJNSqfOQfEONvE-A8EDp18kiQU",
  authDomain: "task-management-4d66e.firebaseapp.com",
  projectId: "task-management-4d66e",
  storageBucket: "task-management-4d66e.appspot.com",
  messagingSenderId: "107888627926",
  appId: "1:107888627926:web:64ea640c0085a6382ff977",
  measurementId: "G-C1Z78Q88KJ",
  databaseURL: "https://task-management-4d66e-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence); // ✅ Persist login across sessions

const db = getDatabase(app);

export { auth, db };
