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


// import React, { useState, useEffect } from 'react';
// import './HomePage.css';

// const Homepage = () => {
//   const [revealLogo, setRevealLogo] = useState(false);
//   const [showLoginForm, setShowLoginForm] = useState(false);

//   useEffect(() => {
//     // Simulate delay for logo reveal
//     const revealTimeout = setTimeout(() => {
//       setRevealLogo(true);
//     }, 2000); // Adjust the delay as needed

//     // After logo reveal, transition to login form
//     if (revealLogo) {
//       const transitionTimeout = setTimeout(() => {
//         setShowLoginForm(true);
//       }, 2000); // Adjust the transition duration as needed

//       return () => clearTimeout(transitionTimeout);
//     }

//     return () => clearTimeout(revealTimeout);
//   }, [revealLogo]);

//   return (
//     <div className="homepage-container">
//       <div className={`logo-container ${revealLogo ? 'revealed' : ''}`}>
//         <img src="./logo192.png" alt="Logo" />
//       </div>
//       <div className={`login-form ${showLoginForm ? 'revealed' : ''}`}>
//         <h2>Login or Sign Up</h2>
//         {/* Your login/sign up form components go here */}
//       </div>
//     </div>
//   );
// };

// export default Homepage;

