import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "antd";
import { toast } from 'react-toastify';
import axios from "axios";
import "./Payment.css";
import { useNavigate } from 'react-router-dom';
import { CreditCardOutlined, CalendarOutlined, KeyOutlined } from '@ant-design/icons';
import { createOrder, clearErrors } from "../../actions/orderAction";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        OrderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.postalCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;
                toast.error("saad", result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(createOrder(order));
                    navigate("/success");
                } else {
                    toast.error("There's some issue while processing payment ");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    return (
        <Fragment>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardOutlined />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <CalendarOutlined />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <KeyOutlined />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - PKR ${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>
    );
};

export default Payment;