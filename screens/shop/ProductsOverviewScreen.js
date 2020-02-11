import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductOverviewScreen = props => {

    const productData = useSelector(state => state.products.availableProducts);

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
            addToCart={() => {}}/>
        )}/>)
}

ProductOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
}

const styles = StyleSheet.create({

});

export default ProductOverviewScreen;