import React, { useState } from 'react';
import { Button, Input, List } from 'antd';
import './ChatBot.css';
import chat from "../../images/chat.png";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            setMessages([...messages, { type: 'user', text: inputValue }]);
            // Add your logic for processing user input and generating bot responses here
            // For now, let's add a sample bot response
            setMessages([...messages, { type: 'bot', text: 'Thank you for your message!' }]);
            setInputValue('');
        }
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            {isOpen && (
                <div className="chatbot-content">
                    <List
                        dataSource={messages}
                        renderItem={(item) => (
                            <List.Item className={item.type}>
                                {item.text}
                            </List.Item>
                        )}
                    />
                    <Input
                        value={inputValue}
                        onChange={handleInputChange}
                        onPressEnter={handleSendMessage}
                        placeholder="Type your message..."
                        addonAfter={<Button onClick={handleSendMessage}>Send</Button>}
                    />
                </div>
            )}
            <div className="chatbot-toggle" onClick={toggleChat}>
             <img src={chat} alt="chatbot"/>
            </div>
        </div>
    );
};

export default ChatBot;