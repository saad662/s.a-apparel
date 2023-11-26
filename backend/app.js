const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");  
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Import and use routes for various API endpoints
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

// Set up routes for different API resources
app.use("/api/v1", product); 
app.use("/api/v1", user);
app.use("/api/v1", order);

// Apply error handling middleware
app.use(errorMiddleware);

module.exports = app