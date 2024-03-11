import './Finally.css'
// import {format} from "timeago.js"
import React, { useState } from 'react';

function formatDate(date) {
    const currentDate = new Date();
    const timestamp = date.getTime();
    const currentTimestamp = currentDate.getTime();
    const difference = currentTimestamp - timestamp;
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    }
}

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
            <div className='messageBottom'>{formatDate(message.timeStamp)}</div>
        </div>
    );
}