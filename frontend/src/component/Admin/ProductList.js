import React, { Fragment, useEffect } from "react";
import { Table, Button, Tooltip } from "antd";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import SideBar from "./Sidebar";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);

  const columns = [
    { title: "Product ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "stock", dataIndex: "stock", key: "stock" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Fragment>
          <Tooltip title="Edit Product">
            <Link to={`/admin/product/${record.id}`}>
              <EditOutlined />
            </Link>
          </Tooltip>
          <Tooltip title="Delete Product">
            <Button onClick={() => deleteProductHandler(record.id)} className="actionButton">
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Fragment>
      ),
    },
  ];

  const data = products
    ? products.map((item) => ({
      key: item._id,
      id: item._id,
      stock: item.stock,
      price: item.price,
      name: item.name,
    }))
    : [];

    const { error: deleteError, isDeleted } = useSelector(
      (state) => state.product
    );

    const deleteProductHandler = (id) => {
      dispatch(deleteProduct(id));
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
      toast.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <Table
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 10 }}
            className="productListTable"
          />
        </div>
      </div>
    </Fragment>
  )
}

export default ProductList