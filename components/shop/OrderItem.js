import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const OrderItem = props => {

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title="Show Details"/>
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