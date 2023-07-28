import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screeen1 from '../screen/Screeen1';
import Screeen2 from '../screen/Screeen2';
import {navigationRef} from '../../RootNavigation';

const Container = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={'Screeen1'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Screeen1" component={Screeen1} />
        <Stack.Screen name="Screeen2" component={Screeen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Container;

const styles = StyleSheet.create({});
