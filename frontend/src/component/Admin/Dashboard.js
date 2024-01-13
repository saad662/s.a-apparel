import React from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar.js";
import { Typography } from "antd";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> PKR
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
          
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              
            </Link>
          </div>
        </div>

        <div className="lineChart">
          
        </div>

        <div className="doughnutChart">
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard