import React from 'react';
import { FlatList, StyleSheet, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';

const UserProductScreen = props => {
    const productDetails = useSelector(state => state.products.userProducts);

    return (<FlatList 
        data={productDetails}
        renderItem={itemData => (<ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {}}
            addToCart={() => {}} />)}
    />)
};

UserProductScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'User Product',
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

export default UserProductScreen;