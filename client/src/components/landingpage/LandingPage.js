import React from 'react'
import { Link } from "react-router-dom"
import './LandingPage.css';
import logo from './logo192.png';
import TwinklingBackground from './TwinkleBackground/TwinkleBackground.js';

function Container() {
  return (
    <div>
      <TwinklingBackground />
      <div className='container'>
        <div className='header'>
          <h3><img src={logo} alt="Logo" className="app-logo" />cachingFeelings</h3>
        </div>
        <div className="landingpage-buttons">
          <Link to="/login" className="link-button">Login</Link>
          <Link to="/signup" className="link-button">Sign Up</Link>
        </div>
        <h2>Your soulmate is waiting...</h2>
      </div>
    </div>
  );
}

export default Container;