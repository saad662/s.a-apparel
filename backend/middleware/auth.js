/*
 * Middleware for handling user authentication.
 * This middleware checks if a user is authenticated by verifying the JWT token and attaching user information to the request object.
*/

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticatedUser = catchAsyncErrors(
    async (req, res, next) => {
        // Extract the JWT token from cookies
        const { token } = req.cookies;
        //console.log(token);
        if (!token) {
            return next(new ErrorHandler("Please login to access this resource", 401))
        }
        // Verify the JWT token and attach user information to the request
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);
        next();
    }
)

/*
 * Middleware for handling authorized roles.
 * This middleware checks if the user's role is allowed to access a resource.
 */
const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        // Check if the user's role is included in the allowed roles
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to use this resource`, 403));
        }
        next();
    };
};


module.exports = {
    isAuthenticatedUser,
    authorizedRoles
};