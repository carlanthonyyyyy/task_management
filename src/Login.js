import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
      navigate('/Home'); // or wherever you want to redirect
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="logo">
          <h1>TMA</h1>
          <p>Task Management System</p>
        </div>
        <div className="login-box">
          <h2>LOG IN</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="auth-buttons">
            <button onClick={handleLogin}>LOG IN</button>
            <button onClick={() => navigate('/signup')}>SIGN UP</button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="help-box">
          <h2>NEED HELP?</h2>
          <p>CREATE A FREE ACCOUNT TO ACCESS THE WEBSITE NOW</p>
          <div className="help-icons">
            <div className="icon-box" />
            <div className="icon-box" />
            <div className="icon-box" />
            <div className="icon-box" />
            <div className="icon-box" />
          </div>
        </div>
        <div className="contact-info">
          <p><strong>FACEBOOK:</strong> TMA PH</p>
          <p><strong>X:</strong> @TMAPH</p>
          <p><strong>INSTAGRAM:</strong> TMA_PH</p>
          <p><strong>CONTACT NO:</strong> 0945-876-9089</p>
          <p><strong>EMAIL:</strong> TMAPH@BUSINESS.COM</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
