import './Finally.css'
import Avatar from 'react-avatar';

export default function Conversation(){
    return (
        <div className='conversation'>
            <Avatar name="test" round ={true} size="50"></Avatar>
            <span className='conversationName'>Test Name</span>   
        </div>
    )
}