import React, { Fragment, useEffect } from "react";
import { Table, Button, Tooltip } from "antd";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import MetaData from "../layout/MetaData";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      toast.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, navigate, message]);

  const columns = [
    { title: "User ID", dataIndex: "id", key: "id" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <span className={role === "admin" ? "greenColor" : "redColor"}>
          {role}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Fragment>
          <Link to={`/admin/user/${record.id}`}>
            <Tooltip title="Edit">
              <Button icon={<EditOutlined />} />
            </Tooltip>
          </Link>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => deleteUserHandler(record.id)}
            />
          </Tooltip>
        </Fragment>
      ),
    },
  ];

  const dataSource = users.map((item) => ({
    key: item._id,
    id: item._id,
    role: item.role,
    email: item.email,
    name: item.name,
  }));

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 10 }}
            className="productListTable"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;