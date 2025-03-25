// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsh-XFX30sxSc8-7dyhycV4tnMS5dMm-0",
  authDomain: "task-management-e51db.firebaseapp.com",
  projectId: "task-management-e51db",
  storageBucket: "task-management-e51db.firebasestorage.app",
  messagingSenderId: "26024188765",
  appId: "1:26024188765:web:80d357b90b162179cc66b4",
  measurementId: "G-4220QVZBBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);