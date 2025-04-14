import React, { useState } from "react";
import { signUp } from "../auth";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getFriendlyError = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "Email is already in use.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      default:
        return "Signup failed. Please try again.";
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) return setError("Enter a valid email.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    setError(null);
    setLoading(true);
    try {
      await signUp(email, password, role);
      navigate("/dashboard");
    } catch (err) {
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>SIGN UP</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="role">Role</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "SIGN UP"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

