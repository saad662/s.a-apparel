import React from "react";
import CheckCircleFilled from "@ant-design/icons";
import "./OrderSuccess.css";
import { Typography } from "antd";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleFilled />
      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;