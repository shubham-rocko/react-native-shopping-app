import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../../constants/Colors';

const ProductItem = props => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onViewDetail}>
            <View style={styles.product}>
                <View style={styles.imageContainer}>
                    <Image
                    style={styles.image}
                    source={{ uri: props.image }}/>
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.actions}>
                    <Button color={Colors.primary} title="View Details" onPress={props.onViewDetail}/>
                    <Button color={Colors.primary} title="To Cart" onPress={props.addToCart}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    title: {
        fontSize: 18,
        fontFamily: 'open-sans-bold',
        marginVertical: 2
    },
    price: {
        fontSize: 14,
        fontFamily: 'open-sans',
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 10
    },
})

export default ProductItem;