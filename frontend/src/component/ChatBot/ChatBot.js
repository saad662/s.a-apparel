import React, { useState } from 'react';
import { List, Button } from 'antd';
import './ChatBot.css';
import chat from "../../images/chat.png";
import {
    LeftOutlined
  } from "@ant-design/icons";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setSelectedQuestion(null); // Reset selected question when chat is toggled
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
    };

    const questions = [
        "How do I place an order?",
        "What payment methods do you accept?",
        "Can I track my order?",
        "How can I return an item?",
        "Do you offer international shipping?",
        // Add more ecommerce-related questions here
    ];

    const answers = {
        "How do I place an order?": "To place an order, go to our website, browse the products, and add them to your cart. Proceed to checkout and follow the steps to complete your order.",
        "What payment methods do you accept?": "We accept various payment methods, including credit/debit cards, PayPal, and other secure payment options.",
        "Can I track my order?": "Yes, once your order is shipped, you will receive a tracking number. You can use this tracking number to monitor the status of your shipment.",
        "How can I return an item?": "If you need to return an item, please visit our 'Returns' page on the website for instructions on how to initiate a return.",
        "Do you offer international shipping?": "Yes, we offer international shipping. Shipping rates and delivery times may vary based on your location.",
        // Add more answers corresponding to the questions above
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            {isOpen && (
                <div className="chatbot-content">
                    {!selectedQuestion ? (
                        <List
                            dataSource={questions}
                            renderItem={(question) => (
                                <List.Item className="question" onClick={() => handleQuestionClick(question)}>
                                    {question}
                                </List.Item>
                            )}
                        />
                    ) : (
                        <div>
                            <div className="answer">{answers[selectedQuestion]}</div>
                            <Button
                                type="primary"
                                icon={<LeftOutlined />}
                                onClick={() => setSelectedQuestion(null)}
                            >
                                Back to Questions
                            </Button>
                        </div>
                    )}
                </div>
            )}
            <div className="chatbot-toggle" onClick={toggleChat}>
                <img src={chat} alt="chatbot" />
            </div>
        </div>
    );
};

export default ChatBot;