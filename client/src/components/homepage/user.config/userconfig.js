import React, { useState } from 'react';
import './userconfig.css'; // Make sure the path matches where you save the CSS file
import TwinklingBackground from '../../landingpage/TwinkleBackground/TwinkleBackground';
import { Link } from "react-router-dom";

const AboveNavigationBar = () => (
  <div className='above-navigation-bar'>
    <p className='title'>Caching Feelings</p>
    <div className='button-group'>
      <button className='community-button'>Community</button>
      <button className='signout-button'>Sign Out</button>
    </div>
  </div>
);

const NavigationBar = () => (
  <div className="navigation-bar">
    <button className='try-button'>Try</button>
    <button className='catch-button'>Catch</button>
    <button className='finally-button'>Finally</button>
    {/* Link component for the "User.config" button */}
    <Link to="/userconfig" className='user-config-button'>User.config</Link>
  </div>
);

const ConfigForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username, "Password:", password, "Profile Picture:", profilePic);
  };

  return (
    <div className="config-page">
      <TwinklingBackground/>
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="profilePic">Profile Picture</label>
            <input type="file" id="profilePic" onChange={handleProfilePicChange} />
            {profilePic && <img src={profilePic} alt="Profile" className="profile-picture" />}
          </div>
          <div>
            <label className="label" htmlFor="username">Username</label>
            <input className="input-field" type="text" id="username" value={username} onChange={handleUsernameChange} />
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input className="input-field" type="password" id="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit" className="button">Update Info</button>
        </form>
      </div>
    </div>
  );
};

export default ConfigForm;
export { AboveNavigationBar, NavigationBar, ConfigForm };