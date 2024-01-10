import React from 'react'

const WebBanner = ({ onClose }) => {
  return (
    <div className="banner-overlay">
      <div className='banner-content'>
        <button onClick={onClose}>close</button>
        <img className="banner-image" src="https://via.placeholder.com/200" alt="placeholder" />
        <div className="banner-content">
          <h1>Sclothers Subscription</h1>
          <p>Stay informed with our newsletter.</p>
          <input className="email-input" type="email" placeholder="Your email" />
          <button className="subscribe-button">Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default WebBanner