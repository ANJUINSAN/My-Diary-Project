import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/users', { username, password });

      alert('Account created successfully!');
      navigate('/login');
      // navigate('/entries');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error creating account. Please try again.');
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('/api/register', {
  //       username,
  //       password,
  //     });
  //     if (response.data.success) {
  //       navigate("/login");
  //     } else {
  //       alert("Registration failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("There was an error registering the user!", error);
  //     alert("An error occurred during registration. Please try again.");
  //   }
  // };

  return (
    <div className="register-main">
      <div className="register-container">
        <h1 className="register-title">Register</h1>
        <form onSubmit={handleSubmit} className="register-form">
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
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
