// Global error handling middleware for handling various types of errors.

const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  // Set default status code and error message
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Handle MongoDB CastError (Invalid ID)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Handle invalid JSON Web Token error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // Handle expired JSON Web Token error  
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};