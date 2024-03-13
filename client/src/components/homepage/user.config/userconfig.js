import React, { useState } from 'react';
import './userconfig.css';
import TwinklingBackground from '../../landingpage/TwinkleBackground/TwinkleBackground';
import NavBar from '../fixedcomponents/NavBar';
import Header from '../fixedcomponents/Header';
import AdditionalImages from './AdditionalImages';

const serverURL = process.env.REACT_APP_SERVER_URL;
const serverPort = process.env.REACT_APP_SERVER_PORT;

const UserConfig = () => {
  const [password, setPassword] = useState('');
  const [newpwd, setNewPwd] = useState('');
  const [profilePic] = useState('');
  const [enableSubmit, setEnabled] = useState(false);

  const handlePasswordChange = (event) => {
    setNewPwd(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${serverURL}:${serverPort}/api/user/modifyUser`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          'currentPassword': password,
          'password': newpwd,
          'profilePicture': profilePic
      }),
    });
    console.log(res);
    } catch (err) {

    }
  }

  const handleConfirm = (e) => {
    const value = e.target.value;
    if(newpwd === value){
      setEnabled(true); 
    }
  }

  const handleOldPwd = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div className="config-page">
      <Header />
      <NavBar />
      <div className="container">
        <TwinklingBackground/>
        <AdditionalImages />
        <form className="settings-container" onSubmit={handleSubmit}>
          <div className='new-password'>
            <label className="label" htmlFor="username">Modify Password: </label>
            <input className="input-field" type="password" id="password" placeholder='New Password' onChange={handlePasswordChange} />
            <input className="input-field" type="password" placeholder='Confirm New Password' onChange={handleConfirm} />
          </div>
          <div className='new-password'>
            <p style={{color:"white"}}>Confirm your old password to make changes:</p>
            <input className="input-field" type="password" placeholder='Current Password' onChange={handleOldPwd}/>
          </div>
          <button type="submit" className="button" disabled={!enableSubmit}>Update Info</button>
        </form>
      </div>
    </div>
  );
};

export default UserConfig;