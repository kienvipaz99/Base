import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import fonts from '../../res/fonts';
import stylesCustom from '../../res/stylesCustom';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
const SelectCustom = ({
  title,
  add,
  nameIcon,
  onPressIcon,
}: {
  title: string;
  add?: boolean;
  nameIcon?: string;
  onPressIcon?: () => void;
}) => {
  return (
    <View style={styles.view}>
      <Text style={styles.txt}>{title}</Text>
      <View style={stylesCustom.row1}>
        {add && (
          <Ionicons
            onPress={onPressIcon}
            name={nameIcon || ''}
            size={25}
            color={colors.text}
          />
        )}
        <Entypo name="chevron-down" color={colors.text} size={25} style={{}} />
      </View>
    </View>
  );
};

export default SelectCustom;

const styles = StyleSheet.create({
  view: {
    height: 50,
    width: sizes.width * 0.9,
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 15,
    borderColor: colors.gray2,
    borderWidth: 1,
    paddingHorizontal: 10,
    ...stylesCustom.row,
  },
  txt: {
    fontFamily: fonts.Regula,
    fontSize: sizes.width * 0.04,
    color: colors.text,
  },
});
