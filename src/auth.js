import { auth } from "./firebase"; // ✅ Correct import
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";

// Sign Up
export async function signUp(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Sign Up Error:", error.message);
    }
}

// Login
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);

        // Redirect after login
        window.location.href = "dashboard.html";  // Change to your desired page
        return userCredential.user;
    } catch (error) {
        console.error("Login Error:", error.message);
    }
}

// Logout
export async function logout() {
    try {
        await signOut(auth);
        console.log("User logged out");

        // Redirect after logout
        window.location.href = "index.html";  // Redirect to the login page
    } catch (error) {
        console.error("Logout Error:", error.message);
    }
}

// Listen for auth state changes (Keeps user logged in)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.email);
        // Optionally display a welcome message or user info on your site
        document.body.innerHTML += `<p>Welcome, ${user.email}</p>`;
    } else {
        console.log("No user is logged in");
    }
});
