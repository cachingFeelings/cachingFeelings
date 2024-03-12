import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Catch.css';

const User = ({ user }) => {
  const navigate = useNavigate();

  const handleChatNowClick = async () => {
    // add api request latter when backend is done
    // navigate('/finally', { state: { user } }); // if we want to send user information
    // const location = useLocation(); // get user information in finally
    // const { user } = location.state || {}; // no state passed empty state
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

  return (
    <div className="user-container">
      <div className="user-info">
        <p>{user.username}</p>
        <p>Interests: {user.interests.join(', ')}</p>
      </div>
      <div className="chat-now">
        <button className="chat-now-button" onClick={handleChatNowClick}>Chat Now</button>
      </div>
    </div>
  );
};

export default User;
