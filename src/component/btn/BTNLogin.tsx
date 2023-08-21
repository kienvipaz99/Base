import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {colors} from '../../res/colors';
import sizes from '../../res/sizes';
import stylesCustom from '../../res/stylesCustom';
import {StyleProp} from 'react-native';

export default function BTNLogin({
  onPress,
  title,
  styleProps,
}: {
  onPress: () => void | undefined;
  title: string;
  styleProps?: StyleProp<ViewStyle>;
}) {
  return (
    <TouchableOpacity
      style={[styles.btn, styleProps]}
      onPress={onPress}
      activeOpacity={0.5}>
      <Text style={styles.txt}>{title}</Text>
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
