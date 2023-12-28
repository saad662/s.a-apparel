import React, { Fragment, useState } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  FileOutlined,
  ShoppingCartOutlined,
  HomeOutlined
} from "@ant-design/icons";
import "antd/dist/reset.css";
import { Dropdown, Avatar, Drawer, Menu } from "antd";
import { toast } from 'react-toastify';
import { logout } from "../../../actions/userAction";

const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const options = [
    { icon: <HomeOutlined />, name: "Home", func: Home },
    { icon: <FileOutlined />, name: "Orders", func: orders },
    { icon: <UserOutlined />, name: "Profile", func: account },
    {
      icon: <ShoppingCartOutlined style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />,
      name: <span style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}>Cart({cartItems.length})</span>,
      func: cart,
    },
    { icon: <LogoutOutlined />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardOutlined />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function Home() {
    navigate("/");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  const showDrawer = () => {
    setOpen(false); // Close the dropdown
    setDrawerVisible(true); // Open the drawer
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <Fragment>
      <Dropdown trigger={['click']} open={open} onOpenChange={(visible) => setOpen(visible)} overlayClassName="dropdown-menu" className="avatar-dropdown">
        <Avatar
          className="avatar-img"
          src={user.avatar.url ? user.avatar.url : "https://i.pinimg.com/564x/7b/8c/d8/7b8cd8b068e4b9f80b4bcf0928d7d499.jpg"}
          alt="Profile"
          onClick={showDrawer}
        />
      </Dropdown>

      <Drawer
        title={
          <div className="drawer-title">
            Account Settings
          </div>
        }
        placement="right"
        closable={false}
        onClose={closeDrawer}
        open={drawerVisible}
        style={{ background: '#001529' }}
      >
        <Menu mode="vertical" theme="dark">
          {options.map((item) => (
            <Menu.Item key={item.name} onClick={() => {
              item.func();
              closeDrawer();
            }}
              style={{ fontSize: '1.2rem', fontWeight: 'normal', marginBottom: '10px' }}
            >
              {item.icon} {item.name}
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </Fragment>
  );
};

export default UserOptions;