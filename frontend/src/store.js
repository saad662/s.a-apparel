import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Middleware for handling asynchronous actions
import { composeWithDevTools } from "redux-devtools-extension"; // DevTools for debugging Redux

import {
    productsReducer,         // Handles fetching a list of products
    newProductReducer,       // Handles creating new products
    newReviewReducer,        // Handles creating new reviews for products
    productDetailsReducer,   // Handles fetching details of a specific product
    productReducer,          // Handles fetching a list of products
    productReviewsReducer,   // Handles fetching reviews for a product
    reviewReducer,           // Handles fetching a specific review

} from "./reducers/productReducer";

import {
    profileReducer,            // Handles fetching user profile data
    // allUsersReducer,        // Handles fetching a list of all users
    forgotPasswordReducer,  // Handles the process of resetting a forgotten password 
    // userDetailsReducer,     // Handles fetching details of a specific user
    userReducer,            // Handles user authentication and user-related actions
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer"; // Reducer for handling the shopping cart

import {
    allOrdersReducer,       // Handles fetching a list of all orders
    myOrdersReducer,        // Handles fetching a list of orders for the current user
    newOrderReducer,        // Handles creating a new order
    orderDetailsReducer,    // Handles fetching details of a specific order
    orderReducer,           // Handles fetching a list of orders
} from "./reducers/orderReducer";

const reducer = combineReducers({
    products: productsReducer,             // Manages a list of products
    productDetails: productDetailsReducer, // Manages detailed information about a product
    user: userReducer,                     // Manages user-related actions and authentication
    profile: profileReducer,                // Manages user profile data     
    forgotPassword: forgotPasswordReducer, // Manages the password reset process
    cart: cartReducer,                     // Manages the shopping cart state
    newOrder: newOrderReducer,             // Manages the creation of new orders
    myOrders: myOrdersReducer,             // Manages user-specific order list
    orderDetails: orderDetailsReducer,     // Manages detailed information about an order
    newReview: newReviewReducer,           // Manages the creation of new product reviews
    newProduct: newProductReducer,         // Manages the creation of new products
    product: productReducer,               // Manages a list of products
    allOrders: allOrdersReducer,           // Manages a list of all orders
    order: orderReducer,                   // Manages a list of orders
    // allUsers: allUsersReducer,             // Manages a list of all users
    // userDetails: userDetailsReducer,       // Manages detailed information about a user
    productReviews: productReviewsReducer, // Manages product reviews
    review: reviewReducer,                 // Manages a specific product review
});

// Define the initial state for the application
let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
};

// Middleware setup 
const middleware = [thunk];

// Create the Redux store
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;