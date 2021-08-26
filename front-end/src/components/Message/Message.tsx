// import { useEffect } from 'react';
import './Message.css';
// import * as Scroll from 'react-scroll';

const Message = (props: {message: {user: string, text: string}, name: string | string[] | null}) => {
    // let scroll = Scroll.animateScroll;

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // const scrollToBottom = () => {
    //     scroll.scrollToBottom();
    // };

    // useEffect(() => {
    //     scrollToBottom();
    // }, [scrollToBottom]);

    let isSendByCurrentUser = false;
    const trimmedName = props.name;
    if(props.message.user === trimmedName) {
        isSendByCurrentUser = true;
    };

    return (
        isSendByCurrentUser ?
        (
            <div className="messageContainer justifyEnd">
                <p className="sendText pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{props.message.text}</p>
                </div>
            </div>
        ) : 
        (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{props.message.text}</p>
                </div>
                <p className="sendText pl-10">{props.message.user}</p>
            </div>
        )
    )
}

export default Message;
