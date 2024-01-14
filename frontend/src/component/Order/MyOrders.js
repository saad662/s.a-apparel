import React, { Fragment, useEffect } from "react";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import MetaData from "../layout/MetaData";
import { ExportOutlined } from '@ant-design/icons';
import { Table, Typography,Tooltip } from "antd";

const MyOrders = () => {
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, error]);


    const columns = [
        { title: "Order ID", dataIndex: "id", key: "id", width: 300 },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 150,
            filters: [
                { text: "Processing", value: "Processing" },
                { text: "Delivered", value: "Delivered" },
                // Add more status options as needed
            ],
            onFilter: (value, record) => record.status === value,
            render: (status) => (
                <span className={status === "Delivered" ? "greenColor" : "redColor"}>{status}</span>
            ),
        },
        {
            title: "Items Qty",
            dataIndex: "itemsQty",
            key: "itemsQty",
            width: 150,
            sorter: (a, b) => a.itemsQty - b.itemsQty,
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Amount", 
            dataIndex: "amount", 
            key: "amount", 
            width: 150, 
            sorter: (a, b) => a.amount - b.amount,
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Actions",
            key: "actions",
            width: 185,
            render: (_, record) => (
                <Tooltip title="View Order">
                <Link to={`/order/${record.id}`}>
                    <ExportOutlined />
                </Link>
                </Tooltip>
            ),
        },
    ];

    const data = orders?.map((item) => ({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.OrderItems.length,
        amount: item.totalPrice,
    }));

    return (
        <Fragment>
            <MetaData title={`${user.name} - Orders`} />

            {loading ? (
                <Loader />
            ) : (
                <div className="myOrdersPage">
                    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                    <div className="table-container">
                        <Table
                            dataSource={data}
                            columns={columns}
                            pagination={{ pageSize: 9 }}
                            rowKey="id"
                            className="myOrdersTable"
                        />
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default MyOrders;