import React, { useState, useEffect } from 'react';
import './CalloutBanner.css';

const CalloutBanner = () => {
    const announcements = [
        '7 DAYS RETURN & EXCHANGE POLICY - Terms & Conditions apply',
        'Special Discounts for Today Only!',
        'New Arrivals: Check out our latest products!',
        'Free Shipping on Orders over 1500 PKR!',
    ];

    const [announcementIndex, setAnnouncementIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setAnnouncementIndex((prevIndex) => (prevIndex + 1) % announcements.length);
        }, 3000); 

        return () => clearInterval(intervalId);
    }, [announcementIndex, announcements.length]);
    return (
        <div className="callout-banner">
            {announcements[announcementIndex]}
        </div>
    );
};

export default CalloutBanner;