const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
    },
    OrderItems: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number, 
                required: true
            },
            price: {
                type: Number, 
                required: true
            },
            image: {
                type: String,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
        },
    },
    paidAt: {
        type: Date,
        required: true
    },
    itemsPrice: {
        type: Number,
        default: 0,
        require: true
    },
    taxPrice: {
        type: Number,
        default: 0,
        require: true
    },
    shippingPrice: {
        type: Number,
        default: 0,
        require: true
    },
    totalPrice: {
        type: Number,
        default: 0,
        require: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing"
    },
    deliveredAt: Date,
    orderNotes: String,
    shippingMethod: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", orderSchema);