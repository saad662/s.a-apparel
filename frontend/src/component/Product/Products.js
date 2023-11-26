import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Pagination from "react-js-pagination";
import { Range } from 'react-range';

const categories = [
    "All Products",
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "apparel",
    "phone",
];

const Products = () => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState([0]);
    const [sort, setSort] = useState("");
    const [activeCategory, setActiveCategory] = useState("All Products");

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
    } = useSelector((state) => state.products);

    const { keyword } = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        // You may want to clear other filters like category and ratings here if necessary.
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct(keyword, currentPage, price, category, ratings, sort));
    }, [dispatch, keyword, currentPage, price, category, ratings, error, sort]);

    //console.log(currentPage, resultPerPage, productsCount);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="PRODUCTS - S.A APPAREL" />
                    <h2 className="productsHeading">Products</h2>

                    <div className="products-container">
                        <div className="products">
                            {products &&
                                products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                        </div>
                    </div>

                    <div className="test">
                        <div className="filterBox">
                            <p>Price</p>
                            <select className="filter-select" value={sort} onChange={handleSortChange}>
                                <option value="">Sort By Price</option>
                                <option value="price">Low to High</option>
                                <option value="-price">High to Low</option>
                            </select>

                            <p>Price with Range</p>
                            <Range
                                step={100}
                                min={0}
                                max={25000}
                                values={price}
                                onChange={newPrice => setPrice(newPrice)}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '6px',
                                            width: '100%',
                                            backgroundColor: '#ccc',
                                        }}
                                    >
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props, isDragged, value }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '16px',
                                            width: '16px',
                                            backgroundColor: isDragged ? '#007bff' : '#aaa',
                                            borderRadius: '50%',
                                            transform: `translateX(${props.value}px)`,
                                            transition: 'transform 0.1s',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: '#000',
                                        }}
                                    >
                                        {value}
                                    </div>
                                )}
                            />

                            <p>Date</p>
                            <select className="filter-select" value={sort} onChange={handleSortChange}>
                                <option value="">Sort By Date</option>
                                <option value="createdAt">Newest to Oldest</option>
                                <option value="-createdAt">Oldest to Newest</option>
                            </select>

                            <p>Categories</p>
                            <ul className="categoryBox">
                                {categories.map((category) => (
                                    <li
                                        className={`category-link ${activeCategory === category ? "active" : ""}`}
                                        key={category}
                                        onClick={() => {
                                            if (category === "All Products") {
                                                setActiveCategory("All Products");
                                                setCategory(""); // Reset the category filter
                                            } else {
                                                setCategory(category);
                                                setActiveCategory(category);
                                            }
                                            setCurrentPage(1);
                                        }}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>

                            <fieldset>
                                <label htmlFor="rating-filter">Filter by Rating</label>
                                <Range
                                    step={1}
                                    min={0}
                                    max={5}
                                    values={ratings}
                                    onChange={(newRatings) => setRatings(newRatings)}
                                    renderTrack={({ props, children }) => (
                                        <div
                                            {...props}
                                            style={{
                                                ...props.style,
                                                height: '6px',
                                                width: '100%',
                                                backgroundColor: '#ccc',
                                            }}
                                        >
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ index, props, isDragged }) => (
                                        <div
                                            {...props}
                                            style={{
                                                ...props.style,
                                                height: '16px',
                                                width: '16px',
                                                backgroundColor: isDragged ? '#007bff' : '#aaa',
                                                borderRadius: '50%',
                                                transform: `translateX(${props.value - 8}px)`, // Adjust the value to center the thumb
                                                transition: 'transform 0.1s',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: '#000',
                                            }}
                                        >
                                            {Math.round(ratings[index])}
                                        </div>
                                    )}
                                />
                            </fieldset>
                        </div>
                    </div>

                    {resultPerPage < productsCount && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </Fragment>

            )}

        </Fragment>
    );
};

export default Products;