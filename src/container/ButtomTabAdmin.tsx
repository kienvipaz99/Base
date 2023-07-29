import {Image, ImageURISource, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../res/colors';
import Home from '../screen/screenAdmin/Home';
import List_Key from '../screen/screenAdmin/List_Key';
import Add_Key from '../screen/screenAdmin/Add_Key';
import Dasboad from '../screen/screenAdmin/Dasboad';
import images from '../res/images';
import {BottomFabBar} from '../common/rn-wave-bottom-bar-custom/src';
import NotifiLog from '../screen/screenAdmin/NotifiLog';

export default function ButtomTabAdmin() {
  const Tabs = createBottomTabNavigator();
  const tabBarIcon =
    (active: ImageURISource, inactive: ImageURISource) =>
    ({focused, color, size}: {focused: boolean; color: string; size: number}) =>
      (
        <Image
          style={{
            width: 24,
            height: 24,
            resizeMode: 'contain',
          }}
          source={focused ? active : inactive}
        />
      );
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}>
      <Tabs.Navigator
        backBehavior="none"
        initialRouteName={'SplashScreen'}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'red',
          tabBarActiveBackgroundColor: colors.gray1,
          tabBarInactiveTintColor: colors.text,
        }}
        tabBar={props => <BottomFabBar {...props} mode="default" />}>
        <Tabs.Screen
          name={'Home'}
          component={Home}
          options={{
            tabBarIcon: tabBarIcon(images.iconHome, images.iconHome),
            tabBarLabel: 'Trang chủ',
          }}
        />
        <Tabs.Screen
          name={'List_Key'}
          component={List_Key}
          options={{
            tabBarIcon: tabBarIcon(images.iconListkey, images.iconListkey),
            tabBarLabel: 'Danh sách',
          }}
        />
        <Tabs.Screen
          name={'Add_Key'}
          component={Add_Key}
          options={{
            tabBarIcon: tabBarIcon(images.iconadd, images.iconadd),
            tabBarLabel: 'Cấp key',
          }}
        />
        <Tabs.Screen
          name={'NotifiLog'}
          component={NotifiLog}
          options={{
            tabBarIcon: tabBarIcon(images.iconnotifi, images.iconnotifi),
            tabBarLabel: 'Thông báo',
          }}
        />
        <Tabs.Screen
          name={'Dasboad'}
          component={Dasboad}
          options={{
            tabBarIcon: tabBarIcon(images.icondasboad, images.icondasboad),
            tabBarLabel: 'Danh mục',
          }}
        />
      </Tabs.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({});
