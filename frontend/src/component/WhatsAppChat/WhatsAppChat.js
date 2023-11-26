import React from 'react';
import './WhatsAppChat.css';

const WhatsAppChat = () => {
    // Replace 'YOUR_PHONE_NUMBER' with your actual WhatsApp phone number.
    const phoneNumber = '+923312072088';

    const openWhatsAppChat = () => {
        window.open(`https://wa.me/${phoneNumber}`, '_blank');
    };

    return (
        <div className="whatsapp-chat" onClick={openWhatsAppChat}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp Icon"
                className="whatsapp-icon"
            />
        </div>
    );
};

export default WhatsAppChat;