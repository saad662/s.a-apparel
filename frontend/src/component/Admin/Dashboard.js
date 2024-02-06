import React, { useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar.js";
import { Typography } from "antd";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import { PieChart, Pie, Cell } from "recharts";
import { VictoryChart, VictoryLine } from 'victory';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  const COLORS = ["#00A6B4", "#6800B4"]; //for pie chart

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  const pieChartData = [
    { name: "Out of Stock", value: outOfStock },
    { name: "In Stock", value: products.length - outOfStock },
  ];

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

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
            <p className="currency">PKR {totalAmount}.</p>
          </div>

          <div className="dashboardSummaryBox">
            <Link to="/admin/products" className="dashboardLink">
              <p className="dashboardLinkText">{products && products.length} Products</p>
              <p></p>
            </Link>
            <Link to="/admin/orders" className="dashboardLink">
              <p className="dashboardLinkText">{orders && orders.length} Orders</p>
            </Link>
            <Link to="/admin/users" className="dashboardLink">
              <p className="dashboardLinkText">{users && users.length} Users</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <VictoryChart>
            <VictoryLine
              data={[
                { x: 0, y: 0 },
                { x: 1, y: 10 },
              ]}
            />
          </VictoryChart>
        </div>

        <div className="doughnutChart">
          <h2>Product Stock</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>

        </div>
        <div className="indicator">
          <div className="colorBox" style={{ backgroundColor: COLORS[0] }} />
          <p>Out of Stock Products</p>
        </div>
        <div className="indicator">
          <div className="colorBox" style={{ backgroundColor: COLORS[1] }} />
          <p>Stocked Products</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard