import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt={item.name} />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: PKR${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Discard</p>
      </div>
    </div>
  );
};  

export default CartItemCard;