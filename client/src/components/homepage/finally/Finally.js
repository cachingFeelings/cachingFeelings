import React, { useState, useEffect, useRef } from 'react';
import Header from '../fixedcomponents/Header'; 
import NavBar from '../fixedcomponents/NavBar';
import './Finally.css';
import Avatar from 'react-avatar';
import TwinklingBackground from '../../landingpage/TwinkleBackground/TwinkleBackground';
import Messages from './Messages';

const Finally = () => {
    const [theUser, setUserID] = useState(null); 
    const [convos, setConvos] = useState([]); 
    const [currChat, setCurrChat] = useState(null); 
    const [messages, setMessages] = useState([]); 
    const [newMessage, setNewMessage] = useState("");
    const [burnAfter, setBurn] = useState(false);
    const chatBoxTopRef = useRef();
    const pollingInterval = useRef(null);

    useEffect(() => {
        if (chatBoxTopRef.current) {
            chatBoxTopRef.current.scrollTop = chatBoxTopRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const getUserID = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`https://caching-feelings-server.onrender.com/user/getCurrentUserId`, {
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
        };
        getUserID();
    }, []);

    useEffect(() => {
        const retrieveConversations = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch("https://caching-feelings-server.onrender.com/convo/getConvos", {
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

    const retrieveMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`https://caching-feelings-server.onrender.com/message/batchGetMessages?convoID=${currChat}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            });
            const data = await res.json();
            setMessages(data.messageList);
        } catch (err) {
            console.error("Error retrieving messages:", err);
        }
    };

    useEffect(() => {
        if (currChat) {
            retrieveMessages();
            clearInterval(pollingInterval.current);
            pollingInterval.current = setInterval(retrieveMessages, 5000);
        }
        return () => clearInterval(pollingInterval.current);
    }, [currChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await fetch("https://caching-feelings-server.onrender.com/message/postMessage", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    'body': newMessage,
                    'convoID': currChat,
                    'burnAfterRead': burnAfter,
                }),
            });
            const data = await res.json();
            setMessages([...messages, data]);
            setNewMessage("");
        } catch (err) {
            console.error("Error submitting message:", err);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            const token = localStorage.getItem('token');
            await fetch("https://caching-feelings-server.onrender.com/message/deleteMessage", {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    '_id': messageId,
                }),
            });
            setMessages(messages.filter(msg => msg._id !== messageId));
        } catch (err) {
            console.error("Error deleting message:", err);
        }
    };

    return (
        <div>
            <Header />
            <NavBar />
            <TwinklingBackground />
            <div className='title' style={{ color: 'white', textAlign: 'center', padding: '10px' }}>Messages</div>
            <div className="finally" style={{ height: '100vh', display: 'flex', color: 'white' }}>
                <div className="chatMenu">
                    <div className='chatMenuWrapper'>
                        <div className='conversation'>
                            {convos.map((convo) => (
                                <div key={convo._id} className='conversation-box' onClick={() => setCurrChat(convo._id)}>
                                    <Avatar name={convo.username} round={true} size="50" />
                                    <span className='conversationName'>{convo.username}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='chatBox'>
                    <div className='chatBoxWrapper'>
                        {currChat && messages ? (
                            <>
                                <div className='chatBoxTop' ref={chatBoxTopRef}>
                                    {messages.map((m) => (
                                        <Messages key={m._id} message={m} own={m.from === theUser} burn={m.burnAfterRead} onDelete={() => handleDeleteMessage(m._id)} />
                                    ))}
                                </div>
                                <div className='chatBoxBottom'>
                                    <textarea className="chatMessageInput" placeholder='Send a new message...' onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                                    <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                                    <label htmlFor="burnCheckbox">Burn after read</label>
                                    <input
                                        id="burnCheckbox"
                                        type="checkbox"
                                        checked={burnAfter}
                                        onChange={(e) => setBurn(e.target.checked)}
                                    />
                                </div>
                            </>
                        ) : (
                            <span>Open a conversation to start</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Finally;

