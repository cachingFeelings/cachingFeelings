import React from 'react';
import Header from '../fixedcomponents/Header'; 
import NavBar from '../fixedcomponents/NavBar';
import { useState, useEffect, useRef } from 'react';
import Contacts from './Contacts'
import './Finally.css'
import Avatar from 'react-avatar';

import TwinklingBackground from '../../landingpage/TwinkleBackground/TwinkleBackground';
import Conversation from './Conversation';
import Messages from './Messages';


const Finally = () => {
    const [theUser, setUserID] = useState(null); 
    const [convos, setConvos ] = useState([]); 
    const [currChat, setCurrChat ] = useState(null); 
    const [messages, setMessages ] = useState([]); 
    const [newMessage, setNewMessage ] = useState("");
    const [burnAfter, setBurn ] = useState(false);
    const chatBoxTopRef = useRef();

    useEffect(() => {
        if (chatBoxTopRef.current) {
            chatBoxTopRef.current.scrollTop = chatBoxTopRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const getUserID = async () => {
            try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/api/user/getCurrentUserId`, {
                method: "GET",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                }
            });
            const data = await res.json(); 
            setUserID(data._id); 
        
            } catch (err) {
            console.error("Error getting user:", err);
            }
        } 
        getUserID();
    }, []);


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
        const res = await fetch(`http://localhost:8080/api/message/batchGetMessages?convoID=${currChat}`, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            }
        });
        const data = await res.json(); 
        setMessages(data.messageList); 
    
        } catch (err) {
        console.error("Error retrieving matches:", err);
        }
    };

    retrieveMessages(); 
    }, [currChat]);

    const handleSubmit = async (e)=>{
        //prevent page refresh 
        e.preventDefault()
        try {
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:8080/api/message/postMessage", {
            method: "POST",

            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                'body': newMessage,
                'convoID': currChat,
                'burnAfterRead': burnAfter
            }),
        })
            const data = await res.json();
            console.log(`The submit response is: ${data}`)
            setMessages([...messages, data]);
            setNewMessage("")
        }
        catch(err){
            console.log(err)
        }
    }

    const handleDeleteMessage = (messageId) => { 
        setMessages(messages.filter(msg => msg._id !== messageId));
        deleteFromDB(messageId); 
    }
    const deleteFromDB = async (msgID) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:8080/api/message/deleteMessage", {
                method: "DELETE",
    
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    '_id': msgID
                }),
            })
            console.log("delete api request was called"); 
        }
        catch(err){
            console.log(err)
        }
    };

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
                    { currChat && messages ? 
                    <>
                    <div className='chatBoxTop' ref={chatBoxTopRef}>
                        {messages.map((m) => (
                            <Messages id={m._id} message={m} own={m.from === theUser} burn={m.burnAfterRead} onDelete={handleDeleteMessage}/>
                        ))}
                    </div>
                    <div className='chatBoxBottom'>
                        <textarea className="chatMessageInput" placeholder='send new message...' onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}></textarea>
                        <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                        <label htmlFor="burnCheckbox">Burn after read</label>
                        <input
                            type="checkbox"
                            name="period"
                            checked={burnAfter}
                            onChange={(e) => setBurn(e.target.checked)}
                        />
                    </div>
                    </> : <span>Open a Conversation to Start</span> }
                </div>
            </div>
        </div>
        </div>
    );
}

export default Finally;