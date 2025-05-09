// auth.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
        throw new Error("User data not found in Firestore.");
    }

    const userData = userDocSnap.data();
    const fullName = `${userData.firstName} ${userData.lastName}`;
    localStorage.setItem('userFullName', fullName); // <-- Set full name here

    return {
        uid: user.uid,
        email: user.email,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        role: userData.role || "user",
    };
};
