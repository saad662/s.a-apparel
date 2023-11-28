import React, { Fragment } from "react";
import { Typography, Steps } from "antd";
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import "./CheckoutSteps.css";

const { Title } = Typography;
const { Step } = Steps;

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      title: "Shipping Details",
      icon: <ShoppingCartOutlined />,
    },
    {
      title: "Confirm Order",
      icon: <CheckCircleOutlined />,
    },
    {
      title: "Payment",
      icon: <CreditCardOutlined />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Title level={4}>Checkout Steps</Title>
      <Steps current={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            status={
              activeStep === index ? "process" : activeStep > index ? "finish" : "wait"
            }
            icon={item.icon}
          />
        ))}
      </Steps>
    </Fragment>
  );
};

export default CheckoutSteps;