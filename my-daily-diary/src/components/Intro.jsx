import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/intro.css';
import hide from '../images/hide.png';


export default function Intro() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
    
  };
  return (
    <>
    <div className='intro'>
    <img className='intro-image' src={hide} alt="" />
    <div className='intro-quote'>
        <h1>"Keep a diary, and someday it will keep you."</h1>
        <h2>– Mae West</h2>
        <button onClick={handleButtonClick} >Craft Your Diary</button>
      </div>
      
    </div>
    </>

  )
}
