import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Input = (props) => {
    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput 
            style={styles.input}
            {...props.options}
            value={formState.inputValues.title}
            onChangeText={(text) => textChangeHandler('title', text)}/>
            {!formState.inputValues.title && <Text>{props.errorText}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({

});

export default Input;