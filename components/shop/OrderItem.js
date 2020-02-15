import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import CartItem from './CartItem';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button 
            color={Colors.primary} 
            title={showDetails ? "Hide Details" : "Show Details"}
            onPress={() => {
                setShowDetails(prevState => !prevState);
            }}/>
             {showDetails && <View>
                 {props.items.map(cartItem => 
                            <CartItem 
                                key={cartItem.productId}
                                quantity={cartItem.quantity}
                                amount={cartItem.sum}
                                title={cartItem.productTitle}
                                deleteable={false}/>)}
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
      },
      summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
      },
      totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
      },
      date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888'
      },
});

export default OrderItem;