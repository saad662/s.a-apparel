import React, { useState, useEffect } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(localStorage.getItem('navbarOpen') === 'true' || false);

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    localStorage.setItem('navbarOpen', isOpen);
  }, [isOpen]);

  

  return (
    <div className={`header ${isOpen ? 'active' : ''}`}>
      <div className="hamburger-icon" onClick={toggleNavbar}>
        {isOpen ? (
          <FontAwesomeIcon icon={faTimes} size="lg" />
        ) : (
          <FontAwesomeIcon icon={faBars} size="lg" />
        )}
      </div>

      <div className={`overlay-navbar ${isOpen ? 'active' : ''} custom-overlay`}>
        <div className="overlay-content">
          <div className="logo">
            <img src="https://i.pinimg.com/originals/c5/07/c2/c507c28cfe9ca6eb06a594a2a11e80e7.png" alt="Logo" />
          </div>

          <div className="content">
            <div className="links-and-icons">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={closeNavbar}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/products" className="nav-link" onClick={closeNavbar}>Products</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link" onClick={closeNavbar}>Contact</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link" onClick={closeNavbar}>About</Link>
                </li>
              </ul>
              <div className="icons">
                <div className="icon-wrapper">
                  <Link to="/search" className="icon-link" onClick={closeNavbar}>
                    <FontAwesomeIcon icon={faSearch} size="lg" className="black-icon" />
                  </Link>
                </div>
                <div className="icon-wrapper">
                  <Link to="/login" className="icon-link" onClick={closeNavbar}>
                    <FontAwesomeIcon icon={faUser} size="lg" className="black-icon" />
                  </Link>
                </div>
                <div className="icon-wrapper">
                  <Link to="/cart" className="icon-link" onClick={closeNavbar}>
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" className="black-icon" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        {/* Your website content goes here */}
      </div>
    </div>
  );
}

export default Header;
