import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import stylesCustom from '../../res/stylesCustom';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';

export default function DoubleButton({
  conFirm,
  cancel,
}: {
  conFirm: () => void;
  cancel: () => void;
}) {
  return (
    <View style={styles.view}>
      <TouchableOpacity
        style={[styles.btn, {backgroundColor: colors.blue}]}
        onPress={conFirm}>
        <Text style={[styles.txt, {color: colors.white}]}>Xác nhận</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, {backgroundColor: colors.gray2}]}
        onPress={cancel}>
        <Text style={[styles.txt, {color: colors.text}]}>Huỷ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignSelf: 'center',
    ...stylesCustom.row,
    width: sizes.width * 0.9,
    marginTop: 30,
  },
  btn: {
    height: 50,
    width: sizes.width * 0.4,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    ...stylesCustom.txtTitle,
  },
});
