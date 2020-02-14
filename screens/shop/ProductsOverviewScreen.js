import React from 'react';
import { FlatList, StyleSheet, Text, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as CartAction from '../../store/actions/cart';
import CustomHeaderButton from '../../components/UI/HeaderButton';

const ProductOverviewScreen = props => {

    const productData = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    return (<FlatList 
        data={productData} renderItem={(itemData) => (
            <ProductItem 
            title={itemData.item.title} 
            price={itemData.item.price} 
            image={itemData.item.imageUrl} 
            onViewDetail={() => {
                props.navigation.navigate('productDetail', 
                {productId: itemData.item.id,
                productTitle: itemData.item.title})
            }}
            addToCart={() => {
                dispatch(CartAction.addToCart(itemData.item))
            }}/>
        )}/>)
}

ProductOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
                />
            </HeaderButtons>
        ),
        headerRight: () => ( 
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Cart"
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart')
                    }} />
            </HeaderButtons>)
        };
}

const styles = StyleSheet.create({

});

export default ProductOverviewScreen;