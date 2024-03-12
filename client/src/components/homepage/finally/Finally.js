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
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

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
        };
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
            let messagesWithMedia = await Promise.all(data.messageList.map(async (message) => {
                if (message.mediaLink && message.mediaLink.length > 0) {
                    const imageURLs = await Promise.all(message.mediaLink.map(async (mediaKey) => {
                        try {
                            const mediaRes = await fetch(`http://localhost:8080/api/images/getImageURL`, {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ fileName: mediaKey })
                            });
                            const mediaData = await mediaRes.json();
                            return mediaData.url; // Assuming the API returns { url: '...' }
                        } catch (error) {
                            console.error("Error fetching media URL:", error);
                            return null;
                        }
                    }));
                    // Filter out any failed requests (null values)
                    message.imageURLs = imageURLs.filter(url => url !== null);
                } else {
                    // If no mediaList, store an empty array
                    message.imageURLs = [];
                }
                return message;
            }));
            setMessages(messagesWithMedia);
        } catch (err) {
            console.error("Error retrieving messages:", err);
        }
    };

    useEffect(() => {
        if (currChat) {
            retrieveMessages();
            //clearInterval(pollingInterval.current);
            //pollingInterval.current = setInterval(retrieveMessages, 5000);
        }
        //return () => clearInterval(pollingInterval.current);
    }, [currChat]);

    const handleDeleteMessage = async (messageId) => {
        try {
            const token = localStorage.getItem('token');
            await fetch("http://localhost:8080/api/message/deleteMessage", {
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

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);

        const previews = files.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file),
        }));
        setImagePreviews(previews);
    }

    const uploadFiles = async () => {
        if (!selectedFiles.length) return;
    
        const fileInfo = selectedFiles.map(file => ({
            name: file.name,
            type: file.type,
        }));
    
        try {
            const response = await fetch("http://localhost:8080/api/images/generateUploadUrls", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({files: fileInfo}),
            });
    
            const data = await response.json();
    
            const updatedFilesWithKeys = [...selectedFiles];
    
            await Promise.all(data.files.map(async (file, index) => {
                const { uploadURL, objectKey } = file;
    
                await fetch(uploadURL, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': selectedFiles[index].type,
                    },
                    body: selectedFiles[index],
                });
    
                updatedFilesWithKeys[index] = {
                    ...updatedFilesWithKeys[index],
                    objectKey: objectKey,
                };
            }));
    
            setSelectedFiles(updatedFilesWithKeys); 
            return updatedFilesWithKeys; 
        } catch (error) {
            console.error('Upload error:', error);
            return [];
        }
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const token = localStorage.getItem('token');

            const payload = {
                body: newMessage,
                convoID: currChat,
                burnAfterRead: burnAfter,
            };
            const uploadedFiles = selectedFiles.length > 0 ? await uploadFiles() : [];

            const fileKeys = uploadedFiles.map(file => file.objectKey).filter(key => key !== undefined);

            if(fileKeys.length > 0){
                payload.mediaLink = fileKeys;
            }
            console.log(selectedFiles)
            const res = await fetch("http://localhost:8080/api/message/postMessage", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            setMessages([...messages, data]);
            setNewMessage("");
            setImagePreviews([]);
            setSelectedFiles([]);
        } catch (err) {
            console.error("Error submitting message:", err);
        }
    };


    return (
        <div>
            <Header />
            <NavBar />
            <TwinklingBackground />
            {/* <div className='tempDiv'> */}
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
                                        <Messages key={m._id} message={m} own={m.from === theUser} burn={m.burnAfterRead} mediaLinks={m.imageURLs} onDelete={() => handleDeleteMessage(m._id)} />
                                    ))}
                                </div>
                                <div className="imagesAndBottom">
                                    <div className="imagePreviews">
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="imagePreview">
                                                <img src={preview.url} alt={preview.name} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className='chatBoxBottom'>
                                        <textarea className="chatMessageInput" placeholder='Send a new message...' onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                                        <label htmlFor="fileInput" className="fileInputLabel">Add Attachments</label>
                                        <input type="file" id="fileInput" multiple className="fileInput" onChange={handleFileChange}/>

                                        <div className='buttonAndBurn'>
                                            <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                                            <div>
                                                <input
                                                    id="burnCheckbox"
                                                    type="checkbox"
                                                    checked={burnAfter}
                                                    onChange={(e) => setBurn(e.target.checked)}
                                                />
                                                <label htmlFor="burnCheckbox">Burn after read</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <span>Open a conversation to start</span>
                        )}
                    </div>
                </div>
            {/* </div> */}
            </div>
        </div>
    );
}

export default Finally;

//TODO
// Add handleFileChange
// Add imagePreviews
