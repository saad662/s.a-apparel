const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//Register a user
const registerUser = catchAsyncErrors(
    async (req, res, next) => {

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 300, // Increase the width for better resolution
            height: 300, // Increase the height for better resolution
            crop: "scale",
            quality: "auto:best", // Set quality to the best possible
            fetch_format: "auto", // Use the best format
        });
        const { name, email, password } = req.body;
        const user = await User.create({
            name, email, password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        });
        sendToken(user, 201, res)
    }
);

//Log in a user.
const loginUser = catchAsyncErrors(
    async (req, res, next) => {
        const { email, password } = req.body;

        // checking if user has given password and email both
        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email & Password", 400));
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        sendToken(user, 200, res);
    }
);

// Log out a user.
const logoutUser = catchAsyncErrors(
    async (req, res, next) => {
        // Simply clear the token stored in the client-side cookie
        //console.log(req.cookies)
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    }
);


// Send a password reset email to a user.
const forgotPassword = catchAsyncErrors(
    async (req, res, next) => {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("User not found with this email", 404));
        }

        // Generate reset token and set its expiration
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        // Create reset password URL
        // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
        const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

        // Get the user's IP address
        const ipAddress = req.ip;

        // Get the current date and time in GMT format
        const currentDate = new Date().toUTCString();

        // Email message
        const message = `
        <html>
            <body style="font-family: Arial, sans-serif;">
                <img src="https://i.pinimg.com/originals/c5/07/c2/c507c28cfe9ca6eb06a594a2a11e80e7.png" alt="Your Website Logo" width="200">
                <h1 style="color: #333;">Password Assistance Request</h1>
                <p>Dear ${user.name},</p>
                <p>We received a request to reset the password for your Ecommerce account. To reset your password, please click the button below:</p>
                <a href="${resetPasswordUrl}" style="display: inline-block; padding: 10px 20px; background-color: #FF9900; color: #fff; text-decoration: none; border-radius: 5px; text-align: center;">Reset Your Password</a>
                <p>If you did not request a password reset, please ignore this email. Your account security is important to us.</p>
                <p>IP Address: ${ipAddress}</p>
                <p>Created: ${currentDate}</p>
                <p>Thank you for choosing our Website!</p>
            </body>
        </html>
    `;

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Recovery Ecommerce-mern-first",
                message,
            });

            res.status(200).json({
                success: true,
                message: `Password reset token sent to ${user.email} successfully`,
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });

            return next(
                new ErrorHandler(error.message, 500)
            );
        }
    }
);

// Reset a user's password.
const resetPassword = catchAsyncErrors(
    async (req, res, next) => {
        // creating token hash
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(
                new ErrorHandler(
                    "Reset Password Token is invalid or has been expired",
                    400
                )
            );
        }

        if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler("Password does not password", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        sendToken(user, 200, res);
    }
);


// Get user details.
const getUserDetails = catchAsyncErrors(
    async (req, res, next) => {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user,
        });
    }
);


// Update the user's password.
const updatePassword = catchAsyncErrors(
    async (req, res, next) => {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findById(req.user.id).select("+password");

        // Check if the current password provided matches the stored password
        if (!(await user.comparePassword(currentPassword))) {
            return next(new ErrorHandler("old password is incorrect", 400));
        }

        if (newPassword !== confirmPassword) {
            return next(new ErrorHandler("New password and confirm password do not match", 400));
        }

        user.password = newPassword;
        await user.save();

        sendToken(user, 200, res);
    }
);

// Update user profile details.
const updateProfile = catchAsyncErrors(
    async (req, res, next) => {
        const newUserData = {
            name: req.body.name,
            email: req.body.email
        }

        if (req.body.avatar !== "") {
            const user = await User.findById(req.user.id);

            const imageId = user.avatar.public_id;

            await cloudinary.v2.uploader.destroy(imageId);

            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 300, // Increase the width for better resolution
                height: 300, // Increase the height for better resolution
                crop: "scale",
                quality: "auto:best", // Set quality to the best possible
                fetch_format: "auto", // Use the best format
            });

            newUserData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }

        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });
    }
);

// Get all users (Admin only).
const getAllUsers = catchAsyncErrors(
    async (req, res, next) => {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users,
        });
    }
);

// Get a single user's details (Admin only)
const getSingleUser = catchAsyncErrors(
    async (req, res, next) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(
                new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
            );
        }

        res.status(200).json({
            success: true,
            user,
        });
    }
);

// Update user role (Admin only).
const updateRole = catchAsyncErrors(
    async (req, res, next) => {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        };

        await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
            message: `User role has been updated`,
            newUserData,
        });
    }
);

// Delete a user (Admin only).
const deleteUser = catchAsyncErrors(
    async (req, res, next) => {
        const { id } = req.params;

        // Find the user by ID and delete it
        const user = await User.deleteOne({ _id: id });

        if (user.deletedCount === 0) {
            return next(new ErrorHandler(`User not found with ID: ${id}`, 404));
        }

        res.status(200).json({
            success: true,
            message: `User with ID: ${id} has been deleted.`,
        });
    }
);

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateRole,
    deleteUser
};