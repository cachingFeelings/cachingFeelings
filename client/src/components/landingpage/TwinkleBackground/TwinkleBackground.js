import React from 'react';
import './TwinkleBackground.css'

const TwinklingBackground = () => {
  return (
    <div className="twinkling-background" data-testid="twinkling-background">
        <div className="stars" data-testid="stars"></div>
        <div className="twinkling" data-testid="twinkling"></div>
    </div>
  );
};

export default TwinklingBackground;
