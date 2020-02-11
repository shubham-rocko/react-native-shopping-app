import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import ShopNavigator from './navigation/shopNavigator';
import { AppLoading } from "expo";
import * as Fonts from 'expo-font';

import ProductReducer from './store/reducers/Products';

const rootReducer = combineReducers({
  products: ProductReducer
});

const store = createStore(rootReducer);

const fetchFont = () => {
  return Fonts.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return <AppLoading 
    startAsync={fetchFont}
    onFinish={() => setFontLoaded(true)}/>
  }

  return (
      <Provider store={store}>
        <ShopNavigator />
      </Provider>
  );
}

const styles = StyleSheet.create({
  root: { 
    padding: 50 
  }
  });
