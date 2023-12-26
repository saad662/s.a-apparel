const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Subscription = require("../models/subscriptionModel");

const subscribeUser = catchAsyncErrors
    (async (req, res, next) => {
        const { email } = req.body;

        // Check if the email is already subscribed
        const existingSubscription = await Subscription.findOne({ email });

        if (existingSubscription) {
            return res.status(400).json({
                success: false,
                message: 'Email is already subscribed.'
            });
        }

        // Save the email to the database
        const newSubscription = await Subscription.create({ email });

        res.status(201).json({
            success: true,
            message: 'Subscription successful!',
            subscription: newSubscription
        });
    });

module.exports = {
    subscribeUser
};