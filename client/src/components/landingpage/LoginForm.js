import React from 'react';
import './LandingPage.css'; 
import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import TwinklingBackground from './TwinkleBackground/TwinkleBackground';

const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
        const res = await fetch("http://localhost:8080/api/user/login/", {
            method: "POST",

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            }),
        })
            .then(res => res.json());

        localStorage.setItem("token", res.token);
    } catch (err) {

    }
    const token = localStorage.getItem("token");
    if (token) {
        if (token === "undefined") {
            alert("Wrong email or password");
        }
        else {
            navigate("/try");
        }
    }
  }

  return (
    <div>
      <TwinklingBackground />
      <div className="form-container" data-page="login">
        <h3 style={{margin: `15px`}}>Welcome Back!</h3>
        <form>
          <input type="text" id="text" autoComplete="off" placeholder="Username" required onChange={(e) => setUsername(e.target.value)}/>
          <input type="password" id="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={handleSubmit} className="submit-buttons" style={{display: `block`, margin: `0 auto`}}>Login</button>
        </form>
      </div>
    </div>
  ); 
};

export default LoginForm;