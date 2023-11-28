import React, { Fragment } from "react";
import { Stepper, StepLabel, Step } from "@material-ui/core";
// import LocalShippingIcon from "@material-ui/icons/LocalShipping";
// import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
// import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <p>Shipping Details</p>,
      icon: <p>icon</p>,
    },
    {
      label: <p>Confirm Order</p>,
      icon: <p>icon</p>,
    },
    {
      label: <p>Payment</p>,
      icon: <p>icon</p>,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;