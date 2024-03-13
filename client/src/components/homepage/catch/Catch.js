import React from 'react';
import Header from '../fixedcomponents/Header'; 
import NavBar from '../fixedcomponents/NavBar';
import { useState, useEffect } from 'react';
import UsersContainer from './UsersContainer';
import TwinklingBackground from '../../landingpage/TwinkleBackground/TwinkleBackground';

const serverURL = process.env.REACT_APP_SERVER_URL;
const serverPort = process.env.REACT_APP_SERVER_PORT;

const Catch = () => {

    const [likes, setLikes ] = useState(null); 

    useEffect(() => {

        const retrieveMatches = async () => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${serverURL}:${serverPort}/api/user/getLikes/`, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
              }
            });
            const data = await res.json();

            if(data['listUsers'].length > 0) {
              console.log(data); 
              const usersArray = data['listUsers'].map(user => ({
                  id: user._id,
                  username: user.username,
                  interests: user.interests
                }));
                setLikes(usersArray); 
            } else {
              let users = []
              return users; 
            }; 
              
          } catch (err) {
            console.error("Error retrieving matches:", err);
          }
        };
    
        retrieveMatches();
      }, []);

    return (
        <div>
          <Header />
          <NavBar />
          <h1 style={{color: "white", textAlign: 'center'}}>Your Catches</h1>
        <div>
            <TwinklingBackground />
            {likes !== null ? <UsersContainer usersArray={likes} /> : <p style={{color: "white", textAlign:'center'}}>No catches yet...</p>}
        </div>
        </div>
    );
}

export default Catch;
