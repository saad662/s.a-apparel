import React from "react";
import { useSelector } from "react-redux";
import CheckCircleFilled from "@ant-design/icons/CheckCircleFilled";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="orderSuccess">
      <CheckCircleFilled className="successIcon" />
      <Typography.Title level={3} className="successTitle">
        {`Thank you, ${user.name}! Your Order has been Placed Successfully`}
      </Typography.Title>
      <Typography.Text className="successText">
        Thank you for shopping with us! Your order is confirmed, and we're
        preparing it for shipment.
      </Typography.Text>
      <Link to="/account">
        <button type="primary" className="viewOrdersBtn">
          View Orders
        </button>
      </Link>
    </div>
  );
};

export default OrderSuccess;