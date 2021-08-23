import { useState, useEffect } from 'react';
import InfoBar from '../../components/InfoBar/InfoBar';
import Input from '../../components/Input/Input';
import Messages from '../../components/Messages/Messages';
import './Chat.css';
import io from 'socket.io-client';

let socket: any;

const Chat = (location: Location) => {
    const [name, setName] = useState<string | string[] | null>("");
    const [room, setRoom] = useState<string | string[] | null>("");
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Array<{user: string, text: string}>>([]);
    const ENDPOINT = "localhost:5000";

    useEffect(() => {
        // const {name, room} = queryString.parse(location.search);
        const name = "Giang";
        const room = "Sgu";
        socket = io(ENDPOINT, {
            withCredentials: true
        });
        setName(name);
        setRoom(room);
        socket.emit('join', {name, room}, () => {
            
        });

        return () => {
            socket.disconnect();
            socket.off();        
        };
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message: {user: string, text: string}) => {
            setMessages([...messages, message]);
        });
        socket.on("roomData", ({users}: any) => {
            setUsers(users);
        });
    }, [messages]);

    const sendMessage = (e: any) => {
        e.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(""));
        };
    };

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;
