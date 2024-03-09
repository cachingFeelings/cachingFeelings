import React from 'react';
import Header from '../fixedcomponents/Header'; 
import NavBar from '../fixedcomponents/NavBar';
import { useState, useEffect } from 'react';
import Contacts from './Contacts'
import './Finally.css'

import TwinklingBackground from '../../landingpage/TwinkleBackground/TwinkleBackground';
import Conversation from './Conversation';
import Messages from './Messages';


const Finally = () => {

    const [conversations, setConvos ] = useState(null); 

    useEffect(() => {

        const retrieveConversations = async () => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:8080/api/convo/getConvo", {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
              }
            });
            const data = await res.json();

            // if(data['likedUsers'].length > 0) {
            //   console.log(data); 
            //   const usersArray = data['likedUsers'].map(userId => ({
            //       id: userId
            //       // username: user.username,
            //       // interests: user.interests
            //     }));
            //     setLikes(usersArray); 
            // } else {
            //   let users = []
            //   return users; 
            // }; 
              
          } catch (err) {
            console.error("Error retrieving matches:", err);
          }
        };
    
        //retrieveMatches();
      }, []);


    return (
        <div>
        <Header />
        <NavBar />
        <TwinklingBackground />
        <div className='title' style={{color:'white', textAlign:'center', padding:'10px'}}>Messages</div>
        <div className="finally" style={{height:'100vh', display:'flex', color:'white'}}>
            <div className="chatMenu">
                <div className='chatMenuWrapper'>
                    <Conversation />
                </div>
            </div>
            <div className='chatBox'>
                <div className='chatBoxWrapper'>
                    <div className='chatBoxTop'>
                        <Messages />
                        <Messages own={true}/>
                        <Messages />
                        <Messages />
                        <Messages own={true}/>
                        <Messages />
                        <Messages />
                        <Messages own={true}/>
                        <Messages />
                    </div>
                    <div className='chatBoxBottom'>
                        <textarea className="chatMessageInput" placeholder='send new message...'></textarea>
                        <button className='chatSubmitButton'>Send</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Finally;