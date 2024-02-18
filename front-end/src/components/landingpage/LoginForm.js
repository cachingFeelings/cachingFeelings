import React from 'react';
import './LandingPage.css'; 
import TwinklingBackground from './TwinkleBackground/TwinkleBackground';

const LoginForm = ({ onSwitch }) => (
  <div>
    <TwinklingBackground />
    <div className="form-container" data-page="login">
      <h3>Welcome Back!</h3>
      <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      </form>
      <button className="buttonLogin">Login</button>
  </div>
  </div>

);

export default LoginForm;