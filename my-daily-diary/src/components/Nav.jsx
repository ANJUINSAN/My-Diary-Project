// src/components/Nav.js
import React from 'react';
import '../styles/nav.css';
import logo from '../images/logo.png';
import login from '../images/avatar.png';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if token is present
  const username = localStorage.getItem('username');


  const title="OUR SECRET"
  const handleAuthClick = () => {
    if (token) {
      // Logout functionality
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      console.log('Logged out');
      navigate('/login');
    } else {
      // Login functionality
      navigate('/login');
    }
  };

  return (
    <div className='navbar'>
      <div className='title'>
        <img className='logo-image' src={logo} alt="not found" />
        <h2 className='t1'>{title}</h2>
      </div>
      <div className="log" onClick={handleAuthClick}>
        <img className='login-image' src={login} alt="" />
        <button className='logbtn'>{token ? 'Logout' : 'Login'}</button>
      </div>
    </div>
  );
}
