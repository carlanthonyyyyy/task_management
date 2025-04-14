import React, { useState } from 'react';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signed up successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in!');
    } catch (error) {
      alert(error.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      alert('Logged out!');
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
            type="text"
            placeholder="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="auth-buttons">
            <button onClick={logIn}>LOG IN</button>
            <button onClick={signUp}>SIGN UP</button>
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

export default App;
