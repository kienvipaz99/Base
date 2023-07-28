import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from './src/container/Container';
import stylesCustom from './src/res/stylesCustom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import store from './src/redux/store/store';
const persistor = persistStore(store);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={stylesCustom.container}>
          <StatusBar
            backgroundColor="transparent"
            barStyle={'light-content'}
            showHideTransition={'fade'}
            translucent={true}
          />
          <Container />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
