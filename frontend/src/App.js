import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import webfont from "webfontloader";
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import WhatsAppChat from "./component/WhatsAppChat/WhatsAppChat.js"
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js";
import Account from "./component/User/Profile.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from "react-redux";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })

    store.dispatch(loadUser());
  }, [])

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/search" element={<Search />} />

        <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/login" replace={true} />} />

        <Route path="/me/update" element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" replace={true} />} />

        <Route path="/password/update" element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" replace={true} />} />

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
      <WhatsAppChat />
    </Router>
  );
}

export default App;