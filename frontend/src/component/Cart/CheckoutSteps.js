import React from "react";
import "./CheckoutSteps.css";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "Shipping Details",
      icon: <ShoppingCartOutlined />,
    },
    {
      label: "Confirm Order",
      icon: <CheckCircleOutlined />,
    },
    {
      label: "Payment",
      icon: <CreditCardOutlined />,
    },
  ];

  return (
    <div className="checkout-steps-container">
      <div className="step-indicators">
        {steps.map((item, index) => (
          <div
            key={index}
            className={`step-indicator ${activeStep === index ? "active" : ""}`}
          >
            <div className="step-icon">{item.icon}</div>
            <div className="step-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;