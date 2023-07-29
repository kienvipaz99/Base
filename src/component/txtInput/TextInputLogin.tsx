import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import stylesCustom from '../../res/stylesCustom';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import fonts from '../../res/fonts';
export default function TextInputLogin({
  nameIcon,
  state,
  setState,
  placeholder,
  secureTextEntry,
}: {
  nameIcon: string;
  state: string;
  setState: (data: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}) {
  const [show, setShow] = useState(true);
  const onPress = () => {
    setShow(!show);
  };
  return (
    <View style={[stylesCustom.row1, styles.txtInput]}>
      <Icon name={nameIcon} size={24} color={colors.gray2} />
      <TextInput
        value={state}
        placeholder={placeholder}
        onChangeText={setState}
        style={styles.txtInput1}
        secureTextEntry={secureTextEntry ? show : undefined}
      />
      {secureTextEntry && (
        <Ionicons
          onPress={onPress}
          name={show ? 'eye-off' : 'eye'}
          color={colors.gray2}
          size={sizes.width * 0.05}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  txtInput: {
    height: 50,
    width: sizes.width * 0.9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray2,
    alignSelf: 'center',
    padding: 10,
  },
  txtInput1: {
    height: 50,
    width: sizes.width * 0.72,
    marginLeft: 10,
    fontFamily: fonts.Regula,
    color: colors.text,
    fontSize: sizes.width * 0.04,
  },
});
