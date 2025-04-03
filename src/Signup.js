import React, { useState } from "react";
import { signUp } from "../auth";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css"; // Import CSS file

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/dashboard"); // Redirect to dashboard after signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>SIGN UP</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">SIGN UP</button>
        </form>
        <p>Already have an account? <Link to="/login">Log In</Link></p>
      </div>
    </div>
  );
};

export default Signup;
