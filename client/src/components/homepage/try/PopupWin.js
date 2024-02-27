import React from 'react';
import './PopupWin.css';

const PopupWin = ({ isOpen, onClose, userData, onLike }) => {
  
  const handlePreCloseLogic = () => {
    var elements = document.getElementsByClassName('popup-win');
    if (elements.length > 0) {
      elements[0].classList.add('popup-win-slide-down');
    }

    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handlePreLikeLogic = () => {
    var elements = document.getElementsByClassName('popup-win');
    if (elements.length > 0) {
      elements[0].classList.add('popup-win-slide-down-like');
    }

    setTimeout(() => {
      onLike();
    }, 800);
  };

  if (!isOpen) {
    return null;
  } else {
    return (
      <div className='popup-win'>
        <button className="close-button" onClick={handlePreCloseLogic}>x</button>
        <div className='popup-content'>
          <h1>{userData.username}</h1>
          <p>Interests: {userData.interests.join(', ')}</p>
        </div>
        <button className='like-button' onClick={handlePreLikeLogic}>Like</button>
      </div>
    );
  }
};

export default PopupWin;
