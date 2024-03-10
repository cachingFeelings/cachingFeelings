import './Finally.css'
import {format} from "timeago.js"
import React, { useState } from 'react';

export default function Messages({ message, own, burn, onDelete }) {
    
    const showMessageHandler = () => {
        alert('' + message.body);
        if (!own && burn) {
            // Hide the message
            onDelete(message._id);
        }
    };

    return (
        <div className={own ? 'message own' : 'message'}>
            <div className={own ? 'messageTop own' : 'messageTop'}>
                {own || !burn ? (
                    <p className='messageText'>{message.body}</p>
                ) : (
                    <p className='messageText'>
                        <span onClick={showMessageHandler}>Read hidden message</span>
                    </p>
                )}
            </div>
            <div className='messageBottom'>{format(message.timeStamp)}</div>
        </div>
    );
}