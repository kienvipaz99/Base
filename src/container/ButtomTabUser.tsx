import {Image, ImageURISource, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../res/colors';
import List_Key from '../screen/screenAdmin/list_key/List_Key';
import Add_Key from '../screen/screenAdmin/newKey/Add_Key';
import images from '../res/images';
import {BottomFabBar} from '../common/rn-wave-bottom-bar-custom/src';
import NotifiLog from '../screen/screenAdmin/notification/NotifiLog';
import sizes from '../res/sizes';
import DasboadUser from '../screen/screenUser/dasboadUser/DasboadUser';
import HomeUser from '../screen/screenUser/home/HomeUser';

export default function ButtomTabUser() {
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
            tintColor: focused ? 'white' : undefined,
          }}
          source={focused ? active : inactive}
        />
      );
  return (
    <View
      style={{
        height: sizes.height,
        width: sizes.width,
      }}>
      <Tabs.Navigator
        backBehavior="none"
        initialRouteName={'SplashScreen'}
        screenOptions={{
          headerShown: false,
          tabBarActiveBackgroundColor: colors.gray1,
        }}
        tabBar={props => <BottomFabBar {...props} mode="default" />}>
        <Tabs.Screen
          name={'HomeUser'}
          component={HomeUser}
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
          name={'DasboadUser'}
          component={DasboadUser}
          options={{
            tabBarIcon: tabBarIcon(images.icondasboad, images.icondasboad),
            tabBarLabel: 'Tổng quan',
          }}
        />
      </Tabs.Navigator>
    </View>
  );
}
