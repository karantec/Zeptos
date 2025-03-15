import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../styles/StartChat.css'; // Import the CSS file
import { backend_url } from '../../../../hooks/Auth';
import SellerPageLayout from '../../SellerConsoleComponents/SellerPageLayout';

const SellerStartChat = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [rooms, setRooms] = useState([]);

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchRooms = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(backend_url + '/api/chat/seller/rooms', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                });
                const data = await response.json();
                console.log(data);

                setRooms(data.rooms);
                setIsLoading(false)
            } catch (err) {
                console.error('Error fetching rooms:', err);
            }
        };

        fetchRooms();
    }, [token]);

    const goToRoom = (roomId) => {
        navigate(`/seller_console/chats/${roomId}`);
    };

    return (
        <SellerPageLayout>
            <div className="sc-chat-container">
                <div className="sc-header">
                    <h2>Welcome to Query Chat</h2>
                </div>
                {/* <div className="sc-start-chat-section">
                    <button className="sc-start-chat-button" onClick={startChat}>Start New Chat</button>
                </div> */}
                <div className="sc-chat-rooms-section">
                    <h3>Your Chats</h3>
                    {rooms.length > 0 ? (
                        <ul className="sc-chat-room-list">
                            {rooms.map((room, index) => (
                                <li key={index} className="sc-chat-room-item" onClick={() => goToRoom(room.room_id)}>
                                    <span className="sc-room-id">{room.user_name}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="sc-no-rooms-message">No chats available, Explore world of business and grow your connections.</p>
                    )}
                </div>
            </div>
        </SellerPageLayout>
    );
};

export default SellerStartChat;
