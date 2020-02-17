import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as ProductsAction from '../../store/actions/Products';

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const dispatch = useDispatch();

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageURL, setImageURL] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const submitHandler = useCallback(() => {
        if(editedProduct){
            dispatch(ProductsAction.updateProduct(prodId, title, description, imageURL));
        } else {
            dispatch(ProductsAction.createProduct(title, description, imageURL, +price));
        }
        props.navigation.goBack();
    }, [dispatch, prodId, title, description, imageURL, price]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler]);

    return (
        <ScrollView style={styles.form}>
            <View style={styles.formControl}>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                style={styles.input}
                value={title}
                keyboardType='default'
                autoCapitalize="sentences"
                autoCorrect
                returnKeyType="next"
                onChangeText={(text) => setTitle(text)}/>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Image URL</Text>
                <TextInput 
                style={styles.input}
                value={imageURL}
                onChangeText={(text) => setImageURL(text)}/>
            </View>
            {editedProduct ? null : <View style={styles.formControl}>
                <Text style={styles.label}>Price</Text>
                <TextInput 
                style={styles.input}
                value={price}
                keyboardType="decimal-pad"
                onChangeText={(text) => setPrice(text)}/>
            </View>}
            <View style={styles.formControl}>
                <Text style={styles.label}>Description</Text>
                <TextInput 
                style={styles.input}
                value={description}
                onChangeText={(text) => setDescription(text)}/>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = (navData) => {
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                title="Save"
                iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                onPress={navData.navigation.getParam('submit')}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    form : {
        margin: 20
    },
    formControl : {
        width: '100%'
    },
    label : {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input : {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
});

export default EditProductScreen;