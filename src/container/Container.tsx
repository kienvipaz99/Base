import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../../RootNavigation';
import Login from '../screen/login/Login';
import ButtomTabAdmin from './ButtomTabAdmin';
import ManageClient from '../screen/screenAdmin/home/manageclient/ManageClient';
import ManageEmployee from '../screen/screenAdmin/home/manageEmployee/ManageEmployee';
import MageProduct from '../screen/screenAdmin/home/manageProduct/MageProduct';
import ManageService from '../screen/screenAdmin/home/manageService/ManageService';
import ButtomTabUser from './ButtomTabUser';
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
        <Stack.Screen name="ManageEmployee" component={ManageEmployee} />
        <Stack.Screen name="MageProduct" component={MageProduct} />
        <Stack.Screen name="ManageService" component={ManageService} />
        <Stack.Screen name="ButtomTabUser" component={ButtomTabUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Container;
