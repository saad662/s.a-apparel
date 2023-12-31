import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    CLEAR_CART,
    UPDATE_QUANTITY
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.product === newItem.product);

            if (existingItem) {
                // If the item already exists, update the quantity
                const updatedCartItems = state.cartItems.map(item =>
                    item.product === existingItem.product
                        ? { ...item, quantity: Math.min(item.quantity + newItem.quantity, item.stock) }
                        : item
                );

                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            } else {
                // If the item does not exist, add it to the cart
                return {
                    ...state,
                    cartItems: [...state.cartItems, newItem],
                };
            }

        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload),
            };

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        case UPDATE_QUANTITY:
            const { product, quantity } = action.payload;

            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.product === product ? { ...item, quantity: Math.min(quantity, item.stock) } : item
                ),
            };

        case CLEAR_CART:  // Add this case
            return {
                ...state,
                cartItems: [],
            };


        default:
            return state;
    }
};