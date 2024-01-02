import React from 'react';
import './Modal.css';

const Modal = ({ onClose }) => {
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
            <button className='yes-button'>Join</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;