import { Routes, Route } from 'react-router-dom';
import StartChat from './StartChat';
import ChatRoom from './ChatRoom';
import '../../styles/UserChat.css'
import PageLayout from '../../components/PageLayout';

export default function UserChat() {
    return (
        <>
            <PageLayout />
            <div className="app-container">
                    <div className="start-chat-container">
                        <StartChat />
                    </div>
            </div>
        </>
    );
}
