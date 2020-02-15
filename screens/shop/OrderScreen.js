import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native'; 
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform } from '@unimodules/core';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrderScreen = (props) => {
    const orders = useSelector(state => state.orders.orders);

    return (
        <FlatList 
        data = {orders}
        keyExtractor={item => item.id}
        renderItem = {itemData => (
            <OrderItem 
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate} 
            items={itemData.item.items}/>
            )}
        />
    )
}

OrderScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Order',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                title="menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({

})

export default OrderScreen;