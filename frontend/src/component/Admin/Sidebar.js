import React, { useState } from 'react'
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { Tree } from "antd";
import {
    ExpandAltOutlined,
    PlusOutlined,
    ImportOutlined,
    OrderedListOutlined,
    DashboardOutlined,
    UserOutlined,
    StarOutlined,
} from "@ant-design/icons";
import logo from "../../images/LOGO.png";

const Sidebar = () => {

    const [selectedKeys, setSelectedKeys] = useState([]);

    const handleSelect = (selectedKeys, info) => {
        setSelectedKeys(selectedKeys);
    };

    const treeData = [
        {
            key: 'products',
            title: (<p>Products</p>),
            children: [
                {
                    key: 'all',
                    title: (
                        <Link to="/admin/products">
                            <p><PlusOutlined /> All</p>
                        </Link>
                    ),
                },
                {
                    key: 'create',
                    title: (
                        <Link to="/admin/product">
                            <p><PlusOutlined /> Create</p>
                        </Link>
                    ),
                },
            ],
        },
    ];

    return (
        <div className="sidebar">
            <Link to="/">
                <img src={logo} alt="Ecommerce" />
            </Link>
            <Link to="/admin/dashboard">
                <p><DashboardOutlined /> Dashboard</p>
            </Link>
            <Tree
                className='treen'
                defaultExpandAll
                icon={<ImportOutlined />}
                switcherIcon={<ExpandAltOutlined />}
                onSelect={handleSelect}
                selectedKeys={selectedKeys}
                treeData={treeData}
            />
            <Link to="/admin/orders">
                <p><OrderedListOutlined />Orders</p>
            </Link>
            <Link to="/admin/users">
                <p><UserOutlined /> Users</p>
            </Link>
            <Link to="/admin/reviews">
                <p><StarOutlined />Reviews</p>
            </Link>
        </div>
    );
};
export default Sidebar;