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
        <Typography component="h1" className="dashboardTitle">
          Dashboard
        </Typography>

        <div className="dashboardSummary">
          <div className="dashboardSummaryItem">
            <p>Total Amount</p>
            <p className="currency">PKR 13231.</p>
          </div>
          <div className="dashboardSummaryBox">
            <Link to="/admin/products" className="dashboardLink">
              <p>Products</p>
            </Link>
            <Link to="/admin/orders" className="dashboardLink">
              <p>Orders</p>
            </Link>
            <Link to="/admin/users" className="dashboardLink">
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