import React, { Fragment, useEffect } from "react";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { Typography } from "antd";
import MetaData from "../layout/MetaData";
import { RightOutlined } from '@ant-design/icons';

const MyOrders = () => {
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, error]);

    return (
        <Fragment>
            <MetaData title={`${user.name} - Orders`} />

            {loading ? (
                <Loader />
            ) : (
                <div className="myOrdersPage">
                    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>

                    <table className="myOrdersTable">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Items Qty</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders &&
                                orders.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item._id}</td>
                                        <td className={item.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                                            {item.orderStatus}
                                        </td>
                                        <td>{item.OrderItems.length}</td>
                                        <td>{item.totalPrice}</td>
                                        <td>
                                            <Link to={`/order/${item._id}`}>
                                                <RightOutlined />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                </div>

            )}
        </Fragment>
    );
};

export default MyOrders;