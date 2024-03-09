import './Finally.css'
import Avatar from 'react-avatar';

export default function Conversation({conversations}){
    return (
        <div className='conversation'>
            {conversations.map((convo, index) => (
                <div key={index}>
                    <Avatar name="test" round ={true} size="50"></Avatar>
                    <span className='conversationName'>Test Name</span> 
                </div>
            ))}
        </div>
  );  
}