<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>S.A-Apparel Backend README</title>
</head>
<body>
    <h1>s.a-apparel Backend</h1>
    <p>This is the backend for the s.a-apparel project. It provides APIs for managing products, users, orders, payments, and subscriptions.</p>
    <h2>Installation</h2>
    <ol>
        <li>Clone the repository:</li>
        <code>git clone &lt;repository-url&gt;</code>
        <li>Navigate to the backend directory:</li>
        <code>cd s.a-apparel/backend</code>
        <li>Install dependencies:</li>
        <code>npm install</code>
    </ol>
    <h2>Configuration</h2>
    <p>Make sure to set up your environment variables by creating a <code>.env</code> file in the <code>backend/config</code> directory. Here are the essential variables you need to set:</p>
    <pre>PORT=DB_URI=STRIPE_API_KEY=STRIPE_SECRET_KEY=JWT_SECRET=JWT_EXPIRE=COOKIE_EXPIRE=SMPT_SERVICE=SMPT_MAIL=SMPT_PASSWORD=SMPT_HOST=SMPT_PORT=CLOUDINARY_NAME=CLOUDINARY_API_KEY=CLOUDINARY_API_SECRET=</pre>
    <h2>Usage</h2>
    <p>To start the server, run:</p>
    <code>npm start</code>
    <p>To run the server in development mode with nodemon, use:</p>
    <code>npm run dev</code>
    <h2>API Endpoints</h2>
    <ul>
        <li><code>/api/v1/products</code>: Endpoints for managing products.</li>
        <li><code>/api/v1/users</code>: Endpoints for managing users.</li>
        <li><code>/api/v1/orders</code>: Endpoints for managing orders.</li>
        <li><code>/api/v1/payments</code>: Endpoints for processing payments.</li>
        <li><code>/api/v1/subscriptions</code>: Endpoints for managing subscriptions.</li>
    </ul>
    <h2>Error Handling</h2>
    <p>The server includes middleware for error handling. It returns appropriate error responses for different scenarios.</p>
    <h2>Database</h2>
    <p>The backend uses MongoDB as the database. Make sure to provide a valid MongoDB connection URI in the <code>.env</code> file.</p>
    <h2>Dependencies</h2>
    <ul>
        <li>axios</li>
        <li>bcryptjs</li>
        <li>body-parser</li>
        <li>cloudinary</li>
        <li>cookie-parser</li>
        <li>dotenv</li>
        <li>express</li>
        <li>express-fileupload</li>
        <li>express-formidable</li>
        <li>googleapis</li>
        <li>jsonwebtoken</li>
        <li>mongoose</li>
        <li>multer</li>
        <li>multer-storage-cloudinary</li>
        <li>nodemailer</li>
        <li>nodemon (dev dependency)</li>
        <li>stripe</li>
        <li>validator</li>
    </ul>
    <h2>License</h2>
    <p>This project is licensed under the ISC License.</p>
</body>

</html>
