import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as ProductsAction from '../../store/actions/Products';

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: [action.value]
        };
        const updateValidities = {
            ...state.inputValidities,
            [action.input]: [action.isValid]
        };
        let updatedFormIsValid = true;
        for(let key in updateValidities){
            if(!updateValidities[key]){
                updatedFormIsValid = false;
            }
        }
        return {
            inputValues: updatedValues,
            inputValidities: updateValidities,
            formIsValid: updatedFormIsValid
        }
    }
    return state;
}

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageURL: editedProduct ? editedProduct.imageUrl : '',
            price: '',
            description: editedProduct ? editedProduct.description : '',
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageURL: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false
    });

    const submitHandler = useCallback(() => {
        if(!formState.formIsValid) {
            Alert.alert('Wrong Input!', 'Please check the form Inputs!', [{
                text: 'Okay'
            }])
            return ;
        }
        if(editedProduct){
            dispatch(ProductsAction.updateProduct(prodId, 
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageURL));
        } else {
            dispatch(ProductsAction.createProduct(formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageURL, 
                +formState.inputValues.price));
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler]);

    textChangeHandler = (inputIndetifier, text) => {
        let isValid = false;
        if(text.trim().length > 0){
            isValid = true
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            input: inputIndetifier
        })
    }

    return (
        <ScrollView style={styles.form}>
            <View style={styles.formControl}>
                <Text style={styles.label}>Image URL</Text>
                <TextInput 
                style={styles.input}
                value={formState.inputValues.imageURL}
                onChangeText={textChangeHandler.bind(this, 'imageURL')}/>
            </View>
            {editedProduct ? null : <View style={styles.formControl}>
                <Text style={styles.label}>Price</Text>
                <TextInput 
                style={styles.input}
                value={formState.inputValues.price}
                keyboardType="decimal-pad"
                onChangeText={textChangeHandler.bind(this, 'price')}/>
            </View>}
            <View style={styles.formControl}>
                <Text style={styles.label}>Description</Text>
                <TextInput 
                style={styles.input}
                value={formState.inputValues.description}
                onChangeText={textChangeHandler.bind(this, 'description')}/>
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