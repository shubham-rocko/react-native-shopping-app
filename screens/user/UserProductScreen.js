import React from 'react';
import { FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as ProductsAction from '../../store/actions/Products'

const UserProductScreen = props => {
    const productDetails = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', {productId: id})
    }

    return (<FlatList 
        data={productDetails}
        renderItem={itemData => (
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    editProductHandler(itemData.item.id)
                }}>
                    <Button 
                    color={Colors.primary} 
                    title="Edit" 
                    onPress={() => {
                        editProductHandler(itemData.item.id)
                    }}/>
                    <Button 
                    color={Colors.primary} 
                    title="Delete" 
                    onPress={() => {
                        dispatch(ProductsAction.deleteProduct(itemData.item.id))
                    }}/>
            </ProductItem>)}
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
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                title="menu"
                iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => {
                    navData.navigation.navigate('EditProduct');
                }}
                />
            </HeaderButtons>
        )
    }
}

export default UserProductScreen;