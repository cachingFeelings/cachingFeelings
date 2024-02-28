import React from 'react';
import Header from '../fixedcomponents/Header'; 
import NavBar from '../fixedcomponents/NavBar';
import { useState, useEffect } from 'react';
import UsersContainer from './UsersContainer';
import TwinklingBackground from '../../landingpage/TwinkleBackground/TwinkleBackground';


const Catch = () => {

    const [likes, setLikes ] = useState(null); 
    //get all matches for now, change backend to only send likes 
    useEffect(() => {

        const retrieveMatches = async () => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:8080/api/user/getLikes/", {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
              }
            });
            const data = await res.json();

            const convertJsonToUserArray = (userdata) => {
                return userdata.listUsers.map(user => ({
                  id: user._id,
                  username: user.username,
                  interests: user.interests
                }));
              };
              
            const usersArray = convertJsonToUserArray(data);
            console.log(usersArray);
            setLikes(usersArray); 
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
        <div style={{ position: 'relative', color:"white"}}>
            <TwinklingBackground />
            <h1 style={{marginTop: '0px', textAlign: 'center'}}>Your likes</h1>
            {likes !== null ? <UsersContainer usersArray={likes} /> : <p>Loading...</p>}
        </div>
        </div>
    );
}

export default Catch;
