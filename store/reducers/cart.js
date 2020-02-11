import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/cart-items";

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state, action) => {
    switch(action.type){
        case ADD_TO_CART: 
            const addedProduct = action.product;
            const prodTitle = addedProduct.title;
            const prodPrice = addedProduct.price;

            if(items[addedProduct.id]){
                const updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity+1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum+prodPrice
                );
                return {
                    ...state,
                    items: {...state.items, [addedProduct.id]: updatedCartItem},
                    totalAmount: state.totalAmount + prodPrice
                };
            } else {
                const cartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
                return {
                    ...state,
                    items: {...items, [addedProduct.id]: CartItem},
                    totalAmount: state.totalAmount + prodPrice
                }
            }
    }
}