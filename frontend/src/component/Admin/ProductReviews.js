import React, { Fragment, useEffect, useState } from "react";
import { Table, Button, Tooltip } from "antd";
import "./ProductReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import MetaData from "../layout/MetaData";
import { DeleteOutlined, StarOutlined } from '@ant-design/icons';

import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, navigate, error, deleteError, isDeleted, productId]);

  const columns = [
    { title: "Review ID", dataIndex: "id", key: "id" },
    { title: "User", dataIndex: "user", key: "user" },
    { title: "Comment", dataIndex: "comment", key: "comment" },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (text, record) => (
        <span className={record.rating >= 3 ? "greenColor" : "redColor"}>{text}</span>
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Tooltip title="Delete Review">
          <Button
            type="danger"
            onClick={() => deleteReviewHandler(record.id)}
            icon={<DeleteOutlined />}
          />
        </Tooltip>
      ),
    },
  ];

  const dataSource = reviews.map(item => ({
    key: item._id,
    id: item._id,
    rating: item.rating,
    comment: item.comment,
    user: item.name,
  }));

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <StarOutlined />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 10 }}
              className="productListTable"
              bordered
              size="middle"
              scroll={{ y: 240 }}
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;