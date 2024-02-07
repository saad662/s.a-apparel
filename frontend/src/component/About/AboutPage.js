import React from 'react';
import './AboutPage.css'; // Import your CSS file

const AboutPage = () => {
    return (
        <div className="about-container">
            <h1 className="about-heading">S.A Apparel</h1>
            <p className="about-subheading">Discover Style, Embrace Elegance</p>
            <p className="about-description">
                Welcome to S.A Apparel, your premier destination for online shopping. We pride ourselves on offering a diverse range of high-quality products to meet your fashion needs.
            </p>

            <div className="author-section">
                <h2 className="author-heading">About the Author</h2>
                <p className="author-description">
                    This ecommerce website is the brainchild of Muhammad Saad Amin, a passionate and skilled developer who crafted this platform using the powerful MERN (MongoDB, Express.js, React.js, Node.js) stack. With a keen eye for design and a commitment to excellence, Saad has created a showcase of his expertise in web development.
                </p>
            </div>

            <div className="tech-stack-section">
                <h2 className="tech-stack-heading">Frontend Technology Stack</h2>
                <p className="tech-stack-description">
                    Our platform leverages cutting-edge technologies, providing a dynamic and interactive interface. Here are some key packages and technologies used:
                </p>
                <ul className="tech-stack-list">
                    <li>React: The foundation of our frontend, providing a dynamic and interactive interface.</li>
                    <li>Redux: State management for scalable and maintainable applications.</li>
                    <li>Ant Design (Antd): A React UI library for modern and responsive design components.</li>
                    <li>Mapbox GL: Powering our map-related features for an enhanced user experience.</li>
                    <li>Stripe: Facilitating secure and seamless payment transactions.</li>
                    <li>React-Slick, React-Responsive-Carousel: Enhancing the presentation of image carousels.</li>
                    <li>React-Bootstrap: Bootstrap components built with React for responsive design.</li>
                    <li>React-Map-GL: React wrapper for Mapbox GL, enhancing map features.</li>
                    <li>React-Modal: A simple way to create modals in React applications.</li>
                    <li>React-Range: A flexible input range component for React.</li>
                    <li>React-Rating-Stars-Component: A customizable star rating component.</li>
                    <li>React-Spring: A spring-physics based animation library for React.</li>
                    <li>React-Star-Ratings: A star rating component for React applications.</li>
                    <li>React-Toastify: A toast notification library for React applications.</li>
                    <li>Redux-Thunk: Middleware for handling asynchronous actions in Redux.</li>
                </ul>
            </div>

            <div className="tech-stack-section">
                <h2 className="tech-stack-heading">Backend Technology Stack</h2>
                <p className="tech-stack-description">
                    Our backend is built with powerful technologies to ensure a secure and seamless operation. Here are some key packages and technologies used:
                </p>
                <ul className="tech-stack-list">
                    <li>Express.js: A fast and minimalistic web application framework for Node.js.</li>
                    <li>MongoDB with Mongoose: Providing a scalable and flexible database structure.</li>
                    <li>JWT (JSON Web Tokens): Ensuring secure authentication and authorization.</li>
                    <li>Stripe: Handling payment processing securely.</li>
                    <li>Nodemailer: Enabling email communication for essential notifications.</li>
                    <li>Cloudinary: Managing and optimizing image assets for a faster loading experience.</li>
                    <li>Express Fileupload: Middleware for handling file uploads in Express.</li>
                    <li>Axios: Promise-based HTTP client for making requests to the backend.</li>
                    <li>Bcrypt.js: Library for hashing passwords for secure storage.</li>
                </ul>
            </div>

            <div className="contact-section">
                <h2 className="contact-heading">Get in Touch</h2>
                <p className="contact-description">
                    We value your feedback and suggestions. If you have any questions or inquiries, feel free to reach out to us.
                </p>
                <p className="contact-email">Email: saadamin662@gmail.com</p>
                <p className="contact-github">GitHub: <a href="https://github.com/saad662/s.a-apparel" target="_blank" rel="noopener noreferrer">github.com/saad662</a></p>
            </div>
        </div>
    );
}

export default AboutPage;