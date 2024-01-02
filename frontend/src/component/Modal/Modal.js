import React from 'react';
import './Modal.css';
//import axios from 'axios';

const Modal = ({ onClose }) => {
  const handleJoinClick = async () => {
    // Make an API call to register the user
    try {
      //const response = await axios.post('/api/register', { /* user data */ });
      // Handle success, update UI, show success message, etc.
      console.log('User joined successfully:');
      onClose();  // Close the modal after successful join
    } catch (error) {
      // Handle error, show error message, etc.
      console.error('Error joining user:', error);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-image">
          <img src="./LOGO.png" alt="Your description" />
        </div>
        <div className="modal-text">
          <h3>Never miss New Collection & Sale</h3>
          <p>Subscribe to get updates on our new products and exclusive offers.</p>
          <div className="modal-buttons">
            <button className="later-button" onClick={onClose}>Later</button>
            <button className='yes-button' onClick={handleJoinClick}>Join</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;