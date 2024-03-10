import React from 'react';
import Header from '../fixedcomponents/Header'; 
import NavBar from '../fixedcomponents/NavBar';
import { useState, useEffect } from 'react';
import Contacts from './Contacts'
import './Finally.css'
import Avatar from 'react-avatar';

import TwinklingBackground from '../../landingpage/TwinkleBackground/TwinkleBackground';
import Conversation from './Conversation';
import Messages from './Messages';


const Finally = () => {

    const [convos, setConvos ] = useState([]); 
    const [currChat, setCurrChat ] = useState(null); 
    const [messages, setMessages ] = useState([]); 

    useEffect(() => {

        const retrieveConversations = async () => {
          try {
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:8080/api/convo/getConvos", {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
              }
            });
            const data = await res.json();
            console.log("This is the data");
            console.log(data);

            setConvos(data); 
        
          } catch (err) {
            console.error("Error retrieving matches:", err);
          }
        };

        retrieveConversations(); 
    }, []);
    
    useEffect(() => {

    const retrieveMessages = async () => {
        try {
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:8080/api/message/batchGetMessages", {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                'convoID': currChat
            })
        }); 
    
        } catch (err) {
        console.error("Error retrieving matches:", err);
        }
    };

    retrieveMessages(); 
    }, []);

    console.log(currChat); 

    return (
        <div>
        <Header />
        <NavBar />
        <TwinklingBackground />
        <div className='title' style={{color:'white', textAlign:'center', padding:'10px'}}>Messages</div>
        <div className="finally" style={{height:'100vh', display:'flex', color:'white'}}>
            <div className="chatMenu">
                <div className='chatMenuWrapper'>
                    <div className='conversation'>
                        {convos.map((convo) => (
                            <div className='conversation-box' convo-id={convo._id} onClick={() => setCurrChat(convo._id)}>
                                <Avatar name={convo.username} round ={true} size="50"></Avatar>
                                <span className='conversationName'>{convo.username}</span> 
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='chatBox'>
                <div className='chatBoxWrapper'>
                    { currChat ? 
                    <>
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
                    </> : <span>Open a Conversation to Start</span> }
                </div>
            </div>
        </div>
        </div>
    );
}

export default Finally;