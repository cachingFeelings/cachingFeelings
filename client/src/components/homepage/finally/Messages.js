import Avatar from 'react-avatar'
import './Finally.css'

export default function Messages({own}) {
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className={own ? 'messageTop own' : 'messageTop'}>
                <div className='avatar'>T</div>
                <p className='messageText'>Loremipzum.com is a tool that lets you generate dummy text with the famous Lorem ipsum sequence of Latin words, useful for filling spaces in web design, graphic design and printing. Learn the meaning, origin and usage of ....</p>
            </div>
            <div className='messageBottom'>1 hour ago</div>
        </div>
    )
}