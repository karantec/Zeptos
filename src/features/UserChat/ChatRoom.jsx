import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { IoSend } from "react-icons/io5";

import '../../styles/ChatRoom.css';
import { backend_url } from '../../hooks/Auth';
import PageLayout from '../../components/PageLayout';
import Loader from '../../components/Loader';

export default function ChatRoom() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { roomId } = useParams();
    const [socket, setSocket] = useState(null);  // Initialize with null
    const [token] = useState(localStorage.getItem('token'));
    const [resToken, setResToken] = useState(localStorage.getItem('token'));

    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))


    const bottomRef = useRef(null);

    useEffect(() => {
        const newSocket = io(backend_url);
        setSocket(newSocket);
    
        // Join the room when the component mounts
        newSocket.emit('joinRoom', { token, roomId });
    
        // Listen for incoming messages
        newSocket.on('message', (message) => {
            // console.log(message);
            setMessages((prevMessages) => [...prevMessages, {
                userId: message.userId,  // Use userId from the backend
                message: message.message
            }]);
        });
    
        newSocket.on('previousMessages', (messages) => {
            // console.log(messages);
            setMessages(messages.messages.map(msg => ({
                userId: msg.userId,
                message: msg.message
            })));
        });
    
        // Cleanup on component unmount
        return () => {
            newSocket.disconnect();
        };
    }, [roomId, token]);
    
    
    // Handle sending a new message
    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('chatMessage', { roomId, message, token });
            setMessage(''); // Clear the input field
        }
    };

    useEffect(() => {
        // Scroll to the bottom every time messages change
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <PageLayout>
            <div className="chat-wrapper d-flex flex-column position-fixed top-30 start-0 w-100" style={{height: "80vh"}}>
                {socket ? (
                    <div className="chat-container flex-grow-1 d-flex flex-column">
                        {/* <header className="chat-header text-center py-3">
                            <h2>Chat Room: {roomId}</h2>
                        </header> */}
                        <div className="chat-messages flex-grow-1 overflow-auto p-3">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`chat-message px-3 py-2 mb-2 rounded-3 ${userData.user_id === msg.userId ? 'my-message' : 'other-message'}`}
                                >
                                    <div className="chat-message-text">{msg.message}</div>
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </div>
                        <div className="chat-input-container p-3 d-flex">
                            <input
                                className="form-control flex-grow-1 me-2"
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <button className="btn btn-primary bottom-sticky" onClick={sendMessage}><IoSend size={25}/></button>
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
            </PageLayout>
    )
}
