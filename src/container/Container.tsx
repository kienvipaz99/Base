import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../../RootNavigation';
import Login from '../screen/login/Login';
import ButtomTabAdmin from './ButtomTabAdmin';
import ManageClient from '../screen/screenAdmin/home/manageclient/ManageClient';
const Container = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={'Login'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ButtomTabAdmin" component={ButtomTabAdmin} />
        <Stack.Screen name="ManageClient" component={ManageClient} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Container;
