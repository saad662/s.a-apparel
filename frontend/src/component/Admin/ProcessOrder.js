import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import SideBar from "./Sidebar";
import {
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { toast } from 'react-toastify';
import { ClusterOutlined } from "@ant-design/icons";
import axios from 'axios';

import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./ProcessOrder.css";

const ProcessOrder = ({ match }) => {
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/v1/order/${id}`);
        setOrder(data.order);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <h1>Order Details</h1>
                  <div>
                    <p>Order Number: {order && order._id}</p>
                    <p>Order Date: {order.createdAt && new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <h2>Shipping Info</h2>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name: {order.user && order.user.name}</p>
                    </div>
                    <div>
                      <p>Phone: {order.shippingInfo && order.shippingInfo.phoneNumber}</p>
                    </div>
                    <div>
                      <p>Address:  {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`}</p>
                    </div>
                  </div>
                  <h2>Payment</h2>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Items Price: PKR {order.itemsPrice && order.itemsPrice}</p>
                      <p>Tax: PKR {order.taxPrice && order.taxPrice}</p>
                      <p>Shipping: PKR {order.shippingPrice && order.shippingPrice}</p>
                      <p>Total Amount: PKR {order.totalPrice && order.totalPrice}</p>
                      <p>Stripe Payment id: {order.paymentInfo.id && order.paymentInfo.id}</p>
                    </div>
                  </div>

                  <h2>Order Status</h2>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <h2>Your Cart Items:</h2>
                  <div className="confirmCartItemsContainer">
                    {order.OrderItems &&
                      order.OrderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X {item.price} ={" "}
                            <b>PKR{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <ClusterOutlined />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;