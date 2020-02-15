import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as CartActions from '../../store/actions/cart';
import * as OrderActions from '../../store/actions/order';

const CartScreen = props => {
    const cartTotalAmt = useSelector(state => state.cartItems.totalAmount);
    const cartItems = useSelector(state => {
        let trasformedItems = [];
        for(let key in state.cartItems.items){
            trasformedItems.push({
                productId: key,
                productTitle: state.cartItems.items[key].productTitle,
                productPrice: state.cartItems.items[key].productPrice,
                quantity: state.cartItems.items[key].quantity,
                sum: state.cartItems.items[key].sum
            })
        }
        return trasformedItems.sort((a,b) => a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();

    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: 
                    <Text style={styles.amount}> ${cartTotalAmt.toFixed(2)}</Text>
                </Text>
                <Button 
                color={Colors.accent} 
                title="Order Now"
                disabled={cartItems.length === 0}
                onPress={() =>{
                    dispatch(OrderActions.addOrder(cartItems, cartTotalAmt))
                }
                } />
            </View>
            <View>
                <FlatList 
                    data={cartItems}
                    keyExtractor={item => item.productId} 
                    renderItem={itemData => <CartItem 
                                                    quantity={itemData.item.quantity}
                                                    title={itemData.item.productTitle}
                                                    amount={itemData.item.sum}
                                                    deleteable={true}
                                                    onRemove={() => {
                                                        dispatch(CartActions.deleteFromCart(itemData.item.productId))
                                                    }}/>} />
            </View>
        </View>
        );
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    },
});

export default CartScreen;