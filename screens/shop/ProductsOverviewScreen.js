import React from 'react';
import { FlatList, StyleSheet, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as CartAction from '../../store/actions/cart';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const ProductOverviewScreen = props => {

    const productData = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const viewDetailHandler = (id, title) => {
        props.navigation.navigate('productDetail', 
        {productId: itemData.item.id,
        productTitle: itemData.item.title})
    }

    return (<FlatList 
        data={productData} renderItem={(itemData) => (
            <ProductItem 
            title={itemData.item.title} 
            price={itemData.item.price} 
            image={itemData.item.imageUrl} 
            onSelect={() => {
                viewDetailHandler(itemData.item.id, itemData.item.title)
            }}>
                <Button 
                color={Colors.primary} 
                title="View Details" 
                onPress={() => {
                    viewDetailHandler(itemData.item.id, itemData.item.title)
                }}/>
                <Button 
                color={Colors.primary} 
                title="To Cart" 
                onPress={() => {
                    dispatch(CartAction.addToCart(itemData.item))
                }}/>
            </ProductItem>
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