import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../../constants/Colors';

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
        return trasformedItems;
    })

    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: 
                    <Text style={styles.amount}> ${cartTotalAmt.toFixed(2)}</Text>
                </Text>
                <Button color={Colors.accent} title="Order Now" disabled={cartItems.length === 0} />
            </View>
            <View>
                <Text>CART ITEMS</Text>
            </View>
        </View>
        );
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