import React from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as CartAction from "../../store/actions/cart";

const ProductDetails = (props) => {
    const productId = props.navigation.getParam('productId');
    const product = useSelector(state => state.products.availableProducts.find(product => product.id === productId));
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: product.imageUrl}} />
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add to Cart" onPress={() => {
                    dispatch(CartAction.addToCart(product))
                }} />
            </View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
    )
}

ProductDetails.navigationOptions = (navData) => {
    const title = navData.navigation.getParam('productTitle');
    return {
        headerTitle: title
    }
}

const styles = StyleSheet.create({
    price: {
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 14,
        fontFamily: 'open-sans',
        textAlign: 'center',
        marginHorizontal: 20
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 300
    }
});

export default ProductDetails;