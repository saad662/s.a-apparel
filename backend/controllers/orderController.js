const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");

// Create a new order (User)
const newOrder = catchAsyncErrors(
    async (req, res) => {
        const {
            shippingInfo, OrderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice,
            orderNotes, shippingMethod
        } = req.body;

        const user = req.user._id;

        // Create a new order instance
        const order = new Order({
            shippingInfo, OrderItems, user, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice,
            orderNotes, shippingMethod, paidAt: new Date()
        });
        await order.save();
        res.status(201).json({
            success: true,
            order,
        });
    }
);


// Get details of a single order (User)
const getSingleOrder = catchAsyncErrors(
    async (req, res) => {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate("user", "name email");

        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }

        res.status(200).json({
            success: true,
            order,
        });
    }
);

// Get orders for the logged-in user (User)
const myOrders = catchAsyncErrors(
    async (req, res, next) => {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json({
            success: true,
            orders,
        });
    }
);

// Get all orders (Admin)
const getAllOrders = catchAsyncErrors(
    async (req, res, next) => {
        const orders = await Order.find();
        let totalAmount = 0;
        let totalOrders = orders.length;
        orders.forEach(order => {
            totalAmount += order.totalPrice;

        });

        res.status(200).json({
            success: true,
            totalOrders,
            totalAmount,
            orders,
        });
    }
);

// Update order status (Admin)
const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHander("You have already delivered this order", 400));
    }

    if (req.body.status === "Shipped" && order.OrderItems.length > 0) {
        for (const orderItem of order.OrderItems) {
            await updateStock(orderItem.product, orderItem.quantity);
        }
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
});

// Update product stock by product ID and quantity
async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

// Delete an order (Admin)
const deleteOrder = catchAsyncErrors(
    async (req, res, next) => {
        const orderId = req.params.id;

        const order = await Order.findById(orderId);

        if (!order) {
            return next(new ErrorHandler("Order not found", 404));
        }

        await Order.deleteOne({ _id: orderId });

        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
        });
    }
);

module.exports = {
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    updateStock,
    deleteOrder
};