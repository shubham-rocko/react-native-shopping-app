import { ADD_ORDER } from "../actions/order";
import { Order } from '../../models/order'

const initialData = {
    orders: []
}

export default (state = initialData, action) => {
    switch(action.type){
        case ADD_ORDER:
            const newOrder = new Order(
                new Date(),
                action.orderData.items,
                action.orderData.amount,
                new Date(),
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
    }
    return state;
}