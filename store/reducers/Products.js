import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../actions/Products';
import Product from '../../models/Product';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === "u1")
}

export default (state = initialState, actions) => {
    switch(actions.type){
        case CREATE_PRODUCT: 
            const newProduct = new Product(
                new Date().toString(), 
                'u1', 
                actions.productData.title,
                actions.productData.imageUrl,
                actions.productData.description,
                actions.productData.price,
                );
                return {
                    ...state, 
                    availableProducts: state.availableProducts.concat(newProduct),
                    userProducts: state.userProducts.concat(newProduct),
                };
        case UPDATE_PRODUCT: 
            const productIndex = state.userProducts.findIndex(product => product.id === actions.pid);
            const updatedProduct = new Product(
                actions.pid,
                state.userProducts[productIndex].ownerId,
                actions.productData.title,
                actions.productData.imageUrl,
                actions.productData.description,
                state.userProducts[productIndex].price,
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;
            const availableProductsIndex = state.availableProducts.findIndex(product => product.id === actions.pid);
            const updatedAvailableProduct = [...state.availableProducts];
            updatedAvailableProduct[availableProductsIndex] = updatedProduct;
            return {
                ...state,
                availableProducts: updatedAvailableProduct,
                userProducts: updatedUserProducts
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== actions.pid),
                availableProducts: state.availableProducts.filter(product => product.id !== actions.pid)
            }
    }
    return state;
}