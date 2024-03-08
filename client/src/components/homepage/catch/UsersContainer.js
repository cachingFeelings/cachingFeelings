import React from 'react';
import User from './User'; // Adjust the path as needed

const UsersContainer = ({ usersArray }) => {
  console.log(`The user array being sent to userscontainer is ${usersArray}`)
  
  usersArray.forEach((user, index) => {
    console.log(`User ${index} is ${user.username}`)
  });
  
  return (
    <div id="users-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {usersArray.map((user, index) => (
        <div key={index}>
          <User user={user} />
        </div>
      ))}
    </div>
  );
};

export default UsersContainer;
