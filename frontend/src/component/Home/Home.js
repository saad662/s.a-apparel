import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./Home.css";
import logo from "../../images/banner.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt, faFlag, faPerson } from '@fortawesome/free-solid-svg-icons';
import ProductCard from "./ProductCard.js";
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useDispatch, useSelector } from "react-redux"
import Loader from '../layout/Loader/Loader';
import { toast } from 'react-toastify';
import image1 from "../../images/download.webp";
import image2 from "../../images/download2.webp";
import girlImage from "../../images/HOL236214_Girls_DESK.jpeg";
import boyImage from "../../images/HOL236214_Boys_DESK.jpeg";
import toddlerImage from "../../images/HOL236214_Toddler_DESK.jpeg";
import babyImage from "../../images/HOL236214_Baby_DESK.jpeg";
import maternityImage from "../../images/cn28151191.avif";

const Home = () => {
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        } else {
            // Dispatch the action to get products
            dispatch(getProduct());
        }
    }, [dispatch, error]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>

                    <MetaData title="S.A APPAREL - Home" />

                    <div className='firstBanner'>
                        <img src={logo} alt="Your Logo" className="logo" />
                    </div>

                    <div className='imageContainer'>
                        <div className='image'>
                            <Link to="/products/apparel">
                                <img src={image1} alt="Product 1 - A high-quality electronic device" className="image1" />
                            </Link>
                        </div>
                        <div className='image'>
                            <Link to="/products/Laptop">
                                <img src={image2} alt="Product 2 - A sleek and modern technology gadget" className="image2" />
                            </Link>
                        </div>
                    </div>

                    <div className="mgbox">
                        <h1>A Fashion Destination for Everyone</h1>
                        <div className="feature">
                            <div>
                                <FontAwesomeIcon icon={faShirt} size="2xl" />
                                <h2>Premium Fabric Selection</h2>
                                <p>
                                    S.A Apparel traces its roots to a revolutionary insight: 'Quality should be accessible to all.' We blend the perfect combination of quality and style, all without breaking the bank.
                                </p>
                            </div>
                            <div>

                                <FontAwesomeIcon icon={faPerson} size="2xl" />
                                <h2>Inclusivity for All Sizes</h2>
                                <p>
                                    Humanity's greatest strength lies in our unique diversity. We celebrate all shapes and sizes, so each of our designs is a tribute to inclusivity. Everything we craft is infused with love, style, and equality.
                                </p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faFlag} size="2xl" />
                                <h2>Crafted with Pride in Pakistan</h2>
                                <p>
                                    Our textile industry is the backbone for beloved global brands. Consequently, we imbue each piece of fabric with the same commitment to excellence for international markets. Yet, we take pride in our Pakistani heritage and ownership.
                                </p>
                            </div>
                        </div>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className='container' id="container">
                        {
                            products &&
                            products.map((product) =>
                                <ProductCard key={product._id} product={product} />)
                        }
                    </div>


                    <div className="categoryContainer">
                        <div className="category">
                            <Link to="/girls">
                                <img src={girlImage} alt="Girls" />
                                <button>Girls</button>
                            </Link>
                        </div>
                        <div className="category">
                            <Link to="/boys">
                                <img src={boyImage} alt="Boys" />
                                <button>Boys</button>
                            </Link>
                        </div>
                        <div className="category">
                            <Link to="/toddlers">
                                <img src={toddlerImage} alt="Toddlers" />
                                <button>Toddlers</button>
                            </Link>
                        </div>
                        <div className="category">
                            <Link to="/baby">
                                <img src={babyImage} alt="Baby" />
                                <button>Baby</button>
                            </Link>
                        </div>
                        <div className="category">
                            <Link to="/maternity">
                                <img src={maternityImage} alt="Maternity" />
                                <button>Maternity</button>
                            </Link>
                        </div>
                    </div>


                </Fragment>}
        </Fragment>
    );
};

export default Home