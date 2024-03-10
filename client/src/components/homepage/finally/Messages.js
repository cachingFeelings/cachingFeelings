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
        <div className={own ? 'message own' : 'message'} onClick={showMessageHandler}>
            <div className={own ? 'messageTop own' : 'messageTop'}>
                {own || !burn ? (
                    <p className='messageText'>{message.body}</p>
                ) : (
                    <p className='messageText'>Read hidden message</p>
                )}
            </div>
            <div className='messageBottom'>{format(message.timeStamp)}</div>
        </div>
    );
}

// export default function Messages({ message, own, burn }) {
//     const showMessage = () => {
//         alert('' + message.body);
//     };

//     return (
//         <div className={own ? 'message own' : 'message'} onClick={!own && burn ? showMessage : null}>
//             <div className={own ? 'messageTop own' : 'messageTop'}>
//                 {own || !burn ? (
//                     <p className='messageText'>{message.body}</p>
//                 ) : (
//                     <p className='messageText'>Read hidden message</p>
//                 )}
//             </div>
//             <div className='messageBottom'>{format(message.timeStamp)}</div>
//         </div>
//     );
// }