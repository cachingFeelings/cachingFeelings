import React from 'react';

const User = ({ user }) => {
  return (
    <div className="user" style={{padding: '10px', borderRadius: '5px', marginBottom: '10px', marginRight: '10px', border: '1px solid white' }}>
      <p>Userid: {user.id}</p>
      {/* <p>Interests: {user.interests.join(', ')}</p> */}
    </div>
  );
};

export default User;