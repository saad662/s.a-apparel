import React from 'react';
import img from "../../images/404.png";

const NotFound = () => {
    return (
        <div style={{ backgroundColor: '#21262d', height: '95vh', }}>
            <img src={img} alt='404 not found' style={{ width: '100%' }} />
        </div>
    );
};

export default NotFound;