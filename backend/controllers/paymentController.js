const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const processPayment = catchAsyncErrors(
    async (req, res, next) => {

        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "PKR",
            metadata: {
                company: "S.A APPAREL",
            },
        });

        res.status(201).json({
            sucess: true,
            client_secret: myPayment.client_secret,
        });
    }
);

const sendStripeApiKey = catchAsyncErrors(
    async (req, res, next) => {

        res.status(201).json({
            sucess: true,
            stripeApiKey: process.env.STRIPE_API_KEY,
        });
    }
);

module.exports = { processPayment, sendStripeApiKey };