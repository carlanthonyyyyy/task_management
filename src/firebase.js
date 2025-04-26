// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsh-XFX30sxSc8-7dyhycV4tnMS5dMm-0",
  authDomain: "task-management-e51db.firebaseapp.com",
  projectId: "task-management-e51db",
  storageBucket: "task-management-e51db.appspot.com",
  messagingSenderId: "26024188765",
  appId: "1:26024188765:web:80d357b90b162179cc66b4",
  measurementId: "G-4220QVZBBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export the necessary Firebase services
export { app, auth, db };
