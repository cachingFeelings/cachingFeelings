import React from 'react';
import User from './User';
import './Catch.css';

const UsersContainer = ({ usersArray }) => {
  return (
    <div className="users-container">
      {usersArray.map((user, index) => (
        <div key={index} className="user-wrapper">
          <User user={user} />
        </div>
      ))}
    </div>
  );
};

export default UsersContainer;
