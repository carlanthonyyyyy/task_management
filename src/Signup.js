import React, { useState } from 'react';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
        createdAt: new Date(),
        role: 'user'
      });

      // Save full name to localStorage
      const fullName = `${firstName} ${lastName}`;
      localStorage.setItem('userFullName', fullName);

      alert('Account created successfully!');
      navigate('/home');
    } catch (error) {
      alert(`Signup failed: ${error.message}`);
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
          <h2>SIGN UP</h2>
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
            <button onClick={handleSignUp}>SIGN UP</button>
            <button onClick={() => navigate('/')}>BACK</button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="help-box">
          <h2>JOIN US</h2>
          <p>START MANAGING YOUR TASKS TODAY</p>
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

export default Signup;
