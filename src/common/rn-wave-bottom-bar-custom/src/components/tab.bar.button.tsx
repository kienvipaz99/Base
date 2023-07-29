import React, { memo, useEffect, useState } from 'react';
import {
  Animated,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { style } from '../styles/tab.bar.button.styles';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
interface Props {
  mode: 'default' | 'square';
  index: number;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  options: BottomTabNavigationOptions;
  inactiveTintColor?: string;
  activeTintColor?: string;
  springConfig?: Animated.SpringAnimationConfig;
  focusedButtonStyle?: StyleProp<any>;
}

export const defaultSpringConfig = {
  damping: 30,
  mass: 0.7,
  stiffness: 250,
};

export const BarButton: React.FC<Props> = memo(
  ({
    isFocused,
    options,
    onPress,
    onLongPress,
    inactiveTintColor,
    springConfig,
  }) => {
    const [animationValueThreshold] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.spring(animationValueThreshold, {
        toValue: isFocused ? 0 : 1,
        ...(springConfig || defaultSpringConfig),
        useNativeDriver: true,
      }).start();
    }, [isFocused, animationValueThreshold]);

    return (
      <View style={style.wrapper}>
        <AnimatedTouchable
          accessibilityRole="button"
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          style={[style.unfocusedButton]}
          onLongPress={onLongPress}
        >
          <View style={{ zIndex: 12, alignItems: 'center' }}>
            {options.tabBarIcon && !isFocused ? (
              options.tabBarIcon({
                focused: isFocused,
                color: inactiveTintColor || 'white',
                size: 28,
              })
            ) : (
              <View />
            )}
            <View style={{ zIndex: 20, alignItems: 'center' }}>
              {options.tabBarLabel && (
                <Text
                  style={[
                    {
                      marginTop: isFocused ? 60 : 0,
                      color: inactiveTintColor,
                      fontWeight: 'bold',
                    },
                  ]}
                ></Text>
              )}
            </View>
          </View>
        </AnimatedTouchable>
      </View>
    );
  }
);

export const TabBarButton: React.FC<Props> = memo(
  ({
    isFocused,
    options,
    onPress,
    onLongPress,
    activeTintColor,
    springConfig,
    focusedButtonStyle,
    mode,
  }) => {
    const [animationValueThreshold] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.spring(animationValueThreshold, {
        toValue: isFocused ? 0 : 1,
        ...(springConfig || defaultSpringConfig),
        useNativeDriver: true,
      }).start();
    }, [isFocused, animationValueThreshold]);

    return (
      <View style={style.wrapper}>
        <AnimatedTouchable
          accessibilityRole="button"
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          style={[
            {
              ...style.focusedButton,
              ...(mode === 'square' ? style.squareFocusedButton : {}),
              backgroundColor: activeTintColor || 'white',
              transform: [
                {
                  translateY: animationValueThreshold.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-18, 100],
                  }),
                },
              ],
            },
            isFocused ? focusedButtonStyle : {},
          ]}
          onLongPress={onLongPress}
        >
          {options.tabBarIcon
            ? options.tabBarIcon({
                focused: isFocused,
                color: 'white',
                size: 28,
              })
            : null}
        </AnimatedTouchable>
      </View>
    );
  }
);

export default TabBarButton;
