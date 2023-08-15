import React, {useState, useImperativeHandle, forwardRef, useRef} from 'react';
import {Text, StyleSheet, Animated, Platform, UIManager} from 'react-native';
import fonts from '../../res/fonts';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ToastCustom = (props: any, ref: any) => {
  const [showToast, setShowToast] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toast = () => {
    if (!showToast) {
      setShowToast(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowToast(false);
        });
      }, 3000);
    }
  };

  useImperativeHandle(ref, () => ({
    toast,
  }));

  if (showToast) {
    return (
      <Animated.View style={[styles.toastContainer, {opacity: fadeAnim}]}>
        <Text style={styles.toastText}>{props?.val}</Text>
      </Animated.View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 30,
    overflow: 'hidden',
    flexDirection: 'row',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastContainer: {
    backgroundColor: '#292929',
    borderRadius: 10,
    padding: 15,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  toastText: {
    color: 'white',
    fontSize: 18,
    fontFamily: fonts.Regula,
  },
});

export default forwardRef(ToastCustom);
