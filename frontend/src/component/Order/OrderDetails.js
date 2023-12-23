import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "antd";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import { toast } from 'react-toastify';
import Loader from "../layout/Loader/Loader";

const OrderDetails = () => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, error, id]);

    const renderShippingInfo = () => (
        <div className="order-section">
            <Typography.Title level={3}>Shipping Information</Typography.Title>
            <p><strong>Name:</strong> {order.user && order.user.name}</p>
            <p><strong>Phone:</strong> {order.shippingInfo && order.shippingInfo.phoneNumber}</p>
            <p><strong>Address:</strong> {order.shippingInfo &&
                `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`
            }</p>
        </div>
    );

    const renderPaymentInfo = () => (
        <div className="order-section">
            <Typography.Title level={3}>Payment</Typography.Title>
            <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>
                {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
            </p>
            <p><strong>Total Amount:</strong> {order.totalPrice && order.totalPrice}</p>
        </div>
    );

    const renderOrderStatus = () => (
        <div className="order-section">
            <Typography.Title level={3}>Order Status</Typography.Title>
            <p className={order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                {order.orderStatus && order.orderStatus}
            </p>
        </div>
    );

    const renderOrderItems = () => (
        <div className="order-section">
            <Typography.Title level={3}>Order Items</Typography.Title>
            <div className="orderDetailsCartItemsContainer">
                {order.OrderItems &&
                    order.OrderItems.map((item) => (
                        <div key={item.product}>
                            <img src={item.image} alt="Product" />
                            <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                            <span>{item.quantity} X {item.price} = <b>PKR{item.price * item.quantity}</b></span>
                        </div>
                    ))}
            </div>
        </div>
    );

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Order Details" />
                    <div className="orderDetailsPage">
                        <div className="orderDetailsContainer">
                            <Typography.Title level={1}>Order #{order && order._id}</Typography.Title>
                            {renderShippingInfo()}
                            {renderPaymentInfo()}
                            {renderOrderStatus()}
                        </div>
                        <div className="orderDetailsCartItems">
                            {renderOrderItems()}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default OrderDetails;