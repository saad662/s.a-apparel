<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Frontend README</h1>
    <p>This README provides information about the frontend of the MERN stack project.</p>
    <h2>Dependencies</h2>
    <p>The frontend of this project relies on the following dependencies:</p>
    <ul>
        <li>@emailjs/browser</li>
        <li>@fortawesome/fontawesome-svg-core</li>
        <!-- Add more dependencies here -->
    </ul>
    <h2>Scripts</h2>
    <p>The following scripts are available:</p>
    <ul>
        <li><code>start</code>: Starts the development server.</li>
        <li><code>build</code>: Builds the project for production.</li>
        <li><code>test</code>: Runs tests.</li>
        <li><code>eject</code>: Ejects the project from Create React App.</li>
    </ul>
    <h2>Redux Store Setup</h2>
    <p>The Redux store is configured with middleware for handling asynchronous actions. It combines multiple reducers to manage the application's state.</p>
    <p>Initial state is defined with the shopping cart items and shipping information.</p>
    <h2>Components and Routing</h2>
    <p>The project consists of various components for different functionalities:</p>
    <ul>
        <li><code>Header</code>: Header component for navigation.</li>
        <li><code>Footer</code>: Footer component.</li>
        <!-- Add more components here -->
    </ul>
    <p>Routing is handled using <code>react-router-dom</code>, defining routes for different pages such as home, product details, cart, login/signup, etc.</p>
    <h2>Authentication and User Management</h2>
    <p>Authentication and user management functionalities are implemented using Redux for state management.</p>
    <p>Features include user authentication, profile management, password reset, etc.</p>
    <h2>Stripe Integration</h2>
    <p>Stripe integration is implemented for handling payments. Stripe API key is fetched dynamically from the backend.</p>
    <h2>Admin Dashboard</h2>
    <p>An admin dashboard is provided for managing products, orders, users, and reviews.</p>
    <h2>Additional Features</h2>
    <p>Additional features include search functionality, chatbot, WhatsApp chat integration, etc.</p>
    <h2>Setup Instructions</h2>
    <ol>
        <li>Clone the repository.</li>
        <li>Install dependencies using <code>npm install</code>.</li>
        <li>Start the development server using <code>npm start</code>.</li>
        <li>For production build, use <code>npm run build</code>.</li>
    </ol>
    <h2>Contributing</h2>
    <p>Contributions are welcome! Please follow the guidelines outlined in CONTRIBUTING.md.</p>
    <h2>License</h2>
    <p>This project is licensed under the MIT License. See LICENSE.md for details.</p>
</body>
</html>
