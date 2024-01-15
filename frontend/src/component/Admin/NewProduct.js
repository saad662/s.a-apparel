import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { toast } from 'react-toastify';
import MetaData from "../layout/MetaData";
import { UnorderedListOutlined, ProfileOutlined, DatabaseOutlined, CheckSquareOutlined, DollarCircleOutlined } from '@ant-design/icons';
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setstock] = useState(0);
  // const [images, setImages] = useState([]);
  // const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "MEN",
    "WOMEN",
    "GIRLS",
    "BOYS",
    "TODDLERS",
    "BABY",
    "MATERNITY",
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    console.log("Submitting product...");

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    // images.forEach((image) => {
    //   myForm.append("images", image);
    // });

    console.log("Form data:", myForm);
    dispatch(createProduct(myForm));
  };

  // const createProductImagesChange = (e) => {
  //   const files = Array.from(e.target.files);

  //   setImages([]);
  //   setImagesPreview([]);

  //   files.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setImagesPreview((old) => [...old, reader.result]);
  //         setImages((old) => [...old, reader.result]);
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <CheckSquareOutlined />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <DollarCircleOutlined />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <ProfileOutlined />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <UnorderedListOutlined />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <DatabaseOutlined />
              <input
                type="number"
                placeholder="stock"
                required
                onChange={(e) => setstock(e.target.value)}
              />
            </div>

            {/* <div id="createProductFormFile">
              <label htmlFor="imageInput" className="fileInputLabel">
                Choose Images
              </label>
              <input
                type="file"
                id="imageInput"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div> */}

            {/* <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div> */}

            <button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;