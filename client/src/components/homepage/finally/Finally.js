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