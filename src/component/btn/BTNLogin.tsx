import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../res/colors';
import sizes from '../../res/sizes';
import fonts from '../../res/fonts';
import stylesCustom from '../../res/stylesCustom';

export default function BTNLogin({onPress}: {onPress: () => void}) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.txt}>ĐĂNG NHẬP</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
    height: 50,
    width: sizes.width * 0.5,
    alignSelf: 'center',
    borderRadius: 15,
  },
  txt: {
    color: colors.white,
    ...stylesCustom.txtTitle,
  },
});
