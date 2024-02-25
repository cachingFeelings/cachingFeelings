import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Container from './components/landingpage/LandingPage';
import LoginForm from './components/landingpage/LoginForm';
import SignupForm from './components/landingpage/SignupForm';
import { SignUpProvider } from './context/SignUpContext';
import Try from './components/homepage/try/Try';
import UserConfig from './components/homepage/user.config/userconfig';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Container />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpProvider><SignupForm /></SignUpProvider>} />
      <Route path="/try" element={<Try />} />
      <Route path="/userconfig" element={<UserConfig />} />
    </Routes>
  );
}

export default App;
