import './Messages.css';
import Message from '../Message/Message';
import { useEffect, useState } from 'react';

const Messages = (props: {messages: Array<{user: string, text: string}>, name: string | string[] | null}) => {
    const [height, setHeight] = useState<number>(0);
    // const messagesEndRef = useRef<any>(null);

    // const scrollToBottom = () => {
    //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    // };
    // let elemTop;
    // let elemHeight = document.querySelector('.messages')?.scrollHeight;
    // // elemTop = document.querySelector('.messages')?.scrollTop;
    const elem = document.querySelector('.messages');
    const elemHeight = elem?.scrollHeight;

    // useEffect(() => {
    //     scrollToBottom();
    // });

    useEffect(() => {
        console.log("Hello");
        elemHeight && setHeight(elemHeight);
        elem && (elem.scrollTop = elem.scrollHeight);
    }, [elem, elemHeight]);

    // useEffect(() => {
    //     const messages: Element | null = document.querySelector('.messages');
    //     let messagesHeight = messages?.scrollHeight;
    //     messagesHeight && setHeight(messagesHeight);
    //     messages && (messages.scrollTop = height);
    //     console.log(messages?.scrollTop);
    // }, [height]);

    // window.setInterval(function() {
    //     const elem = document.querySelector('.messages');
    //     elem && (elem.scrollTop = elem.scrollHeight);
    // }, 1000);

    return (
        <div className="messages">
            {
                props.messages.map((message, index) => {
                    return <Message key={index} message={message} name={props.name} />
                })
            }
            {/* <div ref={messagesEndRef}></div> */}
        </div>
    )
}

export default Messages;
