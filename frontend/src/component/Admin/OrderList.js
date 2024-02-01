import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Table, Button, Tooltip } from "antd";
import MetaData from "../layout/MetaData";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, navigate, error, deleteError, isDeleted]);

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span className={text === "Delivered" ? "greenColor" : "redColor"}>
          {text}
        </span>
      ),
    },
    {
      title: "Items Qty",
      dataIndex: "itemsQty",
      key: "itemsQty",
      sorter: (a, b) => a.itemsQty - b.itemsQty,
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Fragment>
          <Tooltip title="Edit Order">
            <Link to={`/admin/order/${record.id}`}>
              <EditOutlined />
            </Link>
          </Tooltip>
          <span style={{ marginRight: '30px' }}></span>
          <Tooltip title="Delete Order">
            <Button onClick={() => deleteOrderHandler(record.id)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Fragment>
      ),
    },
  ];

  const data = orders
    ? orders.map((item) => ({
      id: item._id,
      itemsQty: item.OrderItems.length, // Assuming you want the number of items
      amount: item.totalPrice, // Assuming 'itemsPrice' is the correct property for total price
      status: item.orderStatus,
    }))
    : [];

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
          <Table
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 10 }}
            className="productListTable"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;