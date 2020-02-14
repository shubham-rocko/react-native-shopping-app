import { ADD_TO_CART, REMOVE_TO_CART } from "../actions/cart";
import CartItem from "../../models/cart-items";

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART: 
            const addedProduct = action.product;
            const prodTitle = addedProduct.title;
            const prodPrice = addedProduct.price;

            let updatedCartItem = {};
            if(state.items[addedProduct.id]){
                updatedCartItem = new CartItem(
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
                updatedCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
            }
            return {
                ...state,
                items: {...state.items, [addedProduct.id]: updatedCartItem},
                totalAmount: state.totalAmount + prodPrice
            }
        case REMOVE_TO_CART:
                const selectedCartItem = state.items[action.pid];
                const currentQty = selectedCartItem.quantity;
                let updatedCartItems;
                if (currentQty > 1) {
                  // need to reduce it, not erase it
                  const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                  );
                  updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
                } else {
                  updatedCartItems = { ...state.items };
                  delete updatedCartItems[action.pid];
                }
                return {    
                  ...state,
                  items: updatedCartItems,
                  totalAmount: state.totalAmount - selectedCartItem.productPrice
                };
        default: 
            return state;
    }
}