import { useState, useEffect } from 'react';
import InfoBar from '../../components/InfoBar/InfoBar';
import Input from '../../components/Input/Input';
import Messages from '../../components/Messages/Messages';
import './Chat.css';
import io from 'socket.io-client';
import { useAppSelector } from '../../app/hooks';
import { selectAuthLogin } from '../../features/authFeature';
import {useHistory} from 'react-router-dom';

let socket: any;

const Chat = (location: Location) => {
    const [name, setName] = useState<string | string[] | null>("");
    const [room, setRoom] = useState<string | string[] | null>("");
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Array<{user: string, text: string}>>([]);
    const ENDPOINT = "localhost:5000";
    const userLogin = useAppSelector(selectAuthLogin);
    let user = localStorage.getItem("YDCC_token");
    const history = useHistory();

    useEffect(() => {
        // const {name, room} = queryString.parse(location.search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if(userLogin.access_token === "" && user === null) {
            history.push("/");
        }else {
            const auth = user !== null ? JSON.parse(user) : "";
            const name = auth.user.username;
            const room = "SGU";
            socket = io(ENDPOINT, {
                withCredentials: true
            });
            setName(name);
            setRoom(room);
            socket.emit('join', {name, room, access_token: auth.access_token}, () => {
                
            });

            return () => {
                socket.disconnect();
                socket.off();        
            };
        };
    }, [ENDPOINT, location.search, user, userLogin, history]);

    useEffect(() => {
        if(userLogin.access_token === "" && user === null) {
            history.push("/");
        }else {
            socket.on('message', (message: {user: string, text: string}) => {
                setMessages([...messages, message]);
            });
            socket.on("roomData", ({users}: any) => {
                setUsers(users);
            });
        };
    }, [messages, user, userLogin, history]);

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
