// HeartAnimation.js

import React from 'react';
import './HeartAnimation.css';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function HeartAnimation() {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const heartEmoji = document.createElement('div');
    heartEmoji.classList.add('heart-emoji');

    const iconContainer = document.createElement('div');
    ReactDOM.render(<div>{"{"}<FontAwesomeIcon icon={faHeart} />{"}"}</div>, iconContainer);

    heartEmoji.appendChild(iconContainer);

    const container = document.getElementById('animation-container');
    container.appendChild(heartEmoji);

    heartEmoji.style.animation = 'dropHeart 3s forwards';

    const animationEndHandler = () => {
      setAnimationComplete(true);
    };

    heartEmoji.addEventListener('animationend', animationEndHandler);

    return () => {
      heartEmoji.removeEventListener('animationend', animationEndHandler);
      container.removeChild(heartEmoji);
    };
  }, []);

  return (
    <div id="animation-container">
      {!animationComplete && <div>Loading...</div>}
      {animationComplete && <HomePage />}
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <h1>Welcome to our website</h1>
      <button>Login</button>
      <button>Sign Up</button>
    </div>
  );
}

export default HeartAnimation;

