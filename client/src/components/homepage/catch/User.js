import React from 'react';
import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Catch.css';

const User = ({ user }) => {
  const navigate = useNavigate();

  const handleChatNowClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:8080/api/convo/newConvo", {
          method: "POST",

          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({
              'username': user.username
          }),
      })
          const data = await res.json();
          console.log(`The response is: ${data}`)
      }
      catch(err){
          console.log(err)
      }
    navigate('/finally');
  };

  const handleBlockClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:8080/api/user/blockUser", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
          'username': user.username
        }),
      });
      const data = await res.json();
      console.log(`The response is: ${data}`);
      console.log("calling navigate after block:")
    navigate('/finally');
      
      // Navigate to the new page after the block operation is completed
    } catch(err) {
      console.log(err);
    }
    console.log("calling navigate after block:")
    navigate('/finally');
  };


  return (
    <div className="user-container">
      <div className="user-info">
        <p>{user.username}</p>
        <p>Interests: {user.interests.join(', ')}</p>
      </div>
      <div className="chat-now">
        <button className="chat-now-button" onClick={handleChatNowClick}>Chat Now</button>
        <button className="chat-now-button" onClick={handleBlockClick}>Block</button>
      </div>
    </div>
  );
};

export default User;
