import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT } from '../actions/Products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === "u1")
}

export default (state = initialState, actions) => {
    switch(actions.type){
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== actions.pid),
                availableProducts: state.availableProducts.filter(product => product.id !== actions.pid)
            }
    }
    return state;
}