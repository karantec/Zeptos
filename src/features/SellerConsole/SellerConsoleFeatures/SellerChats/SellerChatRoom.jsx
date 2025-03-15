import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

import '../../../../styles/ChatRoom.css';
import { backend_url } from '../../../../hooks/Auth';
import Loader from '../../../../components/Loader';
import SellerPageLayout from '../../SellerConsoleComponents/SellerPageLayout';


export default function ChatRoom() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { roomId } = useParams();
    const [socket, setSocket] = useState(io(backend_url))
    const [token, setToken] = useState(localStorage.getItem('token'));

    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))

    const [resToken, setResToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        setSocket(io(backend_url))

        // Join the room when the component mounts
        socket.emit('joinRoom', { token, roomId });

        // Listen for incoming messages
        socket.on('message', (message) => {
            console.log(message);
            setResToken(message.token)
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.on('previousMessages', (messages) => {
            setMessages(messages.messages);
            setResToken(messages.token)
        });

        // Cleanup on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    // Handle sending a new message
    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('chatMessage', { roomId, message, token });
            setMessage(''); // Clear the input field
        }
        socket.on('previousMessages', (messages) => {
            console.log(messages);
            setMessages(messages.messages);
            setResToken(messages.token)
        });
    };
    
    const bottomRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom every time messages change
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);

    return (
        <SellerPageLayout>
            {
                socket?
            <div className="chat-container">
                <h2 className="chat-header">Chat Room: {roomId}</h2>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-message ${userData.user_id == msg.userId ? 'my-message' : 'other-message'}`} // Style based on user
                        >
                            {/* <div className="chat-message-user">{msg.token === token ? 'You' : msg.user_id}</div> */}
                            <div className="chat-message-text">{msg.message}</div>
                            <div ref={bottomRef} />
                        </div>
                    ))}
                </div>
                <div className="chat-input-container">
                    <input
                        className="chat-input"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button className="chat-send-button" onClick={sendMessage}>Send</button>
                </div>
            </div>
                :
                <Loader/>
            }
        </SellerPageLayout>
    );
}
