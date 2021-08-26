import { useState, useEffect } from 'react';
import InfoBar from '../../components/InfoBar/InfoBar';
import Input from '../../components/Input/Input';
import Messages from '../../components/Messages/Messages';
import './Chat.css';
import io from 'socket.io-client';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectAuthLogin } from '../../features/authFeature';
import { selectRooms, pushRoom } from '../../features/chatbotFeature';
import {useHistory} from 'react-router-dom';

let socket: any;

const Chat = (location: Location) => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState<string | string[] | null>("");
    const [room, setRoom] = useState<string | string[] | null>("");
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Array<{user: string, text: string}>>([]);
    const ENDPOINT = "localhost:5000";
    const ROOMS = "ws://localhost:8000/ws/message_queue?token=";
    const userLogin = useAppSelector(selectAuthLogin);
    const chatbotRooms = useAppSelector(selectRooms);
    let user = localStorage.getItem("YDCC_token");
    const history = useHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () => {
        const queue = async () => {
            const auth = user !== null ? JSON.parse(user) : "";
            socket = new WebSocket(ROOMS + auth.access_token);
            // socket.onopen = function open() {
            //     console.log('WebSockets connection created.');
            //     socket.send(JSON.stringify({
            //         type
            //     }));
            // };

            // while (socket.readyState === WebSocket.OPEN) {};

            // socket.onmessage = (e: any) => {
            //     let data = JSON.parse(e.data);
            //     console.log(data);
            // };
            socket.onopen = function() {
                alert("[open] Connection established");
                alert("Sending to server");
                // socket.send(JSON.stringify({
                //     type
                // }));
            };
            
            socket.onmessage = function(event: any) {
                let obj = JSON.parse(event.data);
                // let keys = Object.keys(event.data);
                // console.log(keys);
                // for(let key of keys) {
                //     console.log(key);
                //     // if(key === "username") localStorage.setItem("YDCC_socket", JSON.stringify(event.data.username));
                // };
                if(obj.username) localStorage.setItem("YDCC_socket", JSON.stringify(obj.username));
                alert(`[message] Data received from server: ${event.data}`);
            };

        };

        // const {name, room} = queryString.parse(location.search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if(userLogin.access_token === "" && user === null) {
            history.push("/");
        }else {
            const auth = user !== null ? JSON.parse(user) : "";
            const name = auth.user.username;
            let room = "";
            if(auth.user.is_staff === false) {
                room = auth.user.username;
                queue();
                let temp = socket;
                setTimeout(() => {
                    temp.send(JSON.stringify({
                        type: "push_queue"
                    }));
                }, 1000);
                // dispatch(pushRoom({username: room}));
                
                // if(arrRooms.length > 0) {
                //     arrRooms.forEach((roomItem) => {
                //         if(roomItem !== room) arrRooms.push(room);
                //     });
                // }else {
                //     arrRooms.push(room);
                // };

                // if (socket.readyState === WebSocket.OPEN) {
                    // socket.onopen();
                    // setTimeout(() => {
                    //     socket.send(JSON.stringify({
                    //         type: "push_queue"
                    //     }));
                    // }, 1000);
                // };
                // socket = io(ROOMS, {
                //     withCredentials: true,
                //     query: {
                //         "token": auth.access_token
                //     }
                // });
            }else {
                queue();
                let temp = socket;
                setTimeout(() => {
                    temp.send(JSON.stringify({
                        type: "pop_queue"
                    }));
                }, 1000);
                let socketLocal = localStorage.getItem("YDCC_socket");
                let socketRoom = socketLocal !== null ? JSON.parse(socketLocal): "";
                room = socketRoom;
                if(room !== "") localStorage.removeItem("YDCC_socket");
                // chatbotRooms.forEach(chatRoom => console.log(chatRoom));
                // if(arrRoomsLocal.length > 0) {
                //     room = arrRoomsLocal[0];
                //     arrRoomsLocal.splice(0, 1);
                //     localStorage.setItem("YDCC_rooms", JSON.stringify(arrRoomsLocal));
                // };

                // socket = io(ROOMS, {
                //     withCredentials: true,
                //     query: {
                //         "token": auth.access_token
                //     }
                // });
                // socket.send(JSON.stringify({
                //     type: "pop_queue"
                // }));
            };

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
