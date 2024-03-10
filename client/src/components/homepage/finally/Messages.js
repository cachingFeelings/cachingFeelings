import './Finally.css'
import {format} from "timeago.js"

export default function Messages({message, own}) {
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className={own ? 'messageTop own' : 'messageTop'}>
                <p className='messageText'>{message.body}</p>
            </div>
            <div className='messageBottom'>{format(message.timeStamp)}</div>
        </div>
    )
}