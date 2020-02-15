import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetails from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import Colors from '../constants/Colors';


const defaultNavigation = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    }
}

const ProductsNavigator = createStackNavigator({
    productOverview: ProductOverviewScreen,
    productDetail: ProductDetails,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons 
        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        size={23}
        color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavigation,
    headerTintColor: Platform.OS === "android" ? 'white' : Colors.primary
});

const OrdersNavigator = createStackNavigator({
    Orders: OrderScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons 
        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
        size={23}
        color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavigation
});

const AdminNavigator = createStackNavigator({
    UserProduct: UserProductScreen
},{
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons 
        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        size={23}
        color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNavigation
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
})

export default createAppContainer(ShopNavigator);