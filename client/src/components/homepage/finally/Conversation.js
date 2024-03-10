import './Finally.css'
import Avatar from 'react-avatar';

export default function Conversation({conversations}){
    
    if(conversations) {
        return (
            <div className='conversation'>
                {conversations.map((convo, index) => (
                    <div key={index} className='conversation-box' convo-id={convo._id}>
                        <Avatar name={convo.username} round ={true} size="50"></Avatar>
                        <span className='conversationName'>{convo.username}</span> 
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