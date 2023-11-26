import React from "react";
import "./Loader.css";

const Loader = () => {
    return (
        <div className="better-loader-container">
        <div className="better-loader">
          <div className="bar bar1"></div>
          <div className="bar bar2"></div>
          <div className="bar bar3"></div>
        </div>
        </div>
      );
    };

export default Loader;