// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';
import catbase from '../images/cat-base.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post('/api/users/login', { username, password });
      localStorage.setItem('token', response.data.token); // Store token in local storage
      localStorage.setItem('username', username); // Store username in local storage
      console.log('Login successful, navigating to /entries');
      navigate('/entries');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed: Invalid credentials');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container">
         <img className="login-cat" src={catbase} alt="Login Cat" />

      <div className="login-main">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="register-link">
            <p>Don't have an account? <button onClick={() => navigate('/register')}>Register</button></p>
          </div>
        </form>
      </div>
    </div>
  );
}
