import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import { toast } from 'react-toastify';
import Loader from "../layout/Loader/Loader";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import StarRatings from 'react-star-ratings';
import ReviewCard from "./ReviewCard.js";
import { Button, Modal } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';
// import { addItemsToCart } from "../../actions/cartAction";
// import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    //const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { id } = useParams();

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        // dispatch(addItemsToCart(id, quantity));
        toast.success("Item Added To Cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        // toast.success("Form Submitted");
        dispatch(newReview(myForm));
        setOpen(false);
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        // if (reviewError) {
        //     toast.error(reviewError);
        //     dispatch(clearErrors());
        //   }

        // if (success) {
        //     toast.success("Review Submitted Successfully");
        //     dispatch({ type: NEW_REVIEW_RESET });
        // }

        dispatch(getProductDetails(id));
    }, [dispatch, id, error]);


    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product.name} - S.A APPAREL`} />
                    <div className="ProductDetails">
                        <div >
                            <Carousel showArrows={true}>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <div key={i}>
                                            <img src={item.url} alt={`${i} Slide`} />
                                        </div>
                                    ))}
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2 className="product-title">{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <StarRatings
                                    rating={product.ratings}
                                    starRatedColor="gold"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="20px"
                                    starSpacing="5px"
                                />
                                <span className="detailsBlock-2-span">
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>

                            <div className="detailsBlock-3">
                                <h1 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#FF6347", margin: "1rem 0" }}>
                                    {product.price ? `Rs. ${product.price.toLocaleString('en-IN')}` : ''}
                                </h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1 quantity-control">
                                        <button onClick={decreaseQuantity}>-</button>
                                        {/* <input readOnly type="number" value={5} />   */}
                                        <NumericFormat value={quantity} displayType={'text'} thousandSeparator={true} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <p className="stock-info"> ( {product.stock} items left in stock )</p>
                                    <button
                                        className="add-to-cart-button"
                                        disabled={product.stock < 1 ? true : false}
                                        onClick={addToCartHandler}>
                                        Add to Cart
                                    </button>
                                </div>
                                <p className="status-info">
                                    Status:
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>

                            <button onClick={submitReviewToggle} className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>

                    <h3 className="reviewsHeading">Customer Reviews</h3>

                    <Modal show={open} onHide={submitReviewToggle}>
                        <Modal.Header closeButton>
                            <Modal.Title>Submit Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <StarRatings
                                rating={rating} // Use 'rating' to display the current rating
                                starRatedColor="gold"
                                numberOfStars={5}
                                name="rating"
                                starDimension="20px"
                                starSpacing="5px"
                                changeRating={(newRating) => setRating(newRating)} // Use 'changeRating' to update the 'rating' state
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </Modal.Footer>

                    </Modal>


                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))
                            }
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}

                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails