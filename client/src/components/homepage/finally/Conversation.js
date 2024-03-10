import './Finally.css'
import Avatar from 'react-avatar';

export default function Conversation({conversations}){
    
    if(conversations) {
        return (
            <div className='conversation'>
                {conversations.map((name, index) => (
                    <div key={index} className='conversation-box'>
                        <Avatar name={name} round ={true} size="50"></Avatar>
                        <span className='conversationName'>{name}</span> 
                    </div>
                ))}
            </div>
        );
    } 
    else {
        return (
            <div className='conversation'></div>
        )
    } 
}