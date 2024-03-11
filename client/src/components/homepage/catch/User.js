import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Catch.css';

const User = ({ user }) => {
  const navigate = useNavigate();

  const handleChatNowClick = () => {
    // add api request latter when backend is done
    // navigate('/finally', { state: { user } }); // if we want to send user information
    // const location = useLocation(); // get user information in finally
    // const { user } = location.state || {}; // no state passed empty state
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
