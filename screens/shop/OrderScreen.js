import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native'; 
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import { Platform } from '@unimodules/core';

const OrderScreen = (props) => {
    const orders = useSelector(state => state.orders.orders);

    return (
        <FlatList 
        data = {orders}
        keyExtractor={item => item.id}
        renderItem = {itemData => (
            <Text>{itemData.item.totalAmount}</Text>
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