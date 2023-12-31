import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import fonts from '../../res/fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import stylesCustom from '../../res/stylesCustom';

const TextInputCustom = ({
  placeholder,
  add,
  nameIcon,
  onPressIcon,
  editable,
  numeric,
  value,
  setValue,
  multiline,
  styleView,
}: {
  placeholder?: string;
  add?: boolean;
  nameIcon?: string;
  onPressIcon?: () => void;
  editable?: boolean;
  numeric?: boolean;
  value?: string;
  setValue?: (val: string) => void;
  multiline?: boolean;
  styleView?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={[styles.view, styleView]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        editable={!editable}
        style={[
          styles.view1,
          styleView,
          {
            height: multiline ? 80 : undefined,
          },
        ]}
        placeholder={placeholder}
        cursorColor={colors.text}
        multiline={multiline}
        keyboardType={numeric ? 'numeric' : 'default'}
      />
      {add && (
        <FontAwesome5
          onPress={onPressIcon}
          name={nameIcon || ''}
          color={colors.text}
          size={25}
          style={{marginRight: 10}}
        />
      )}
    </View>
  );
};

export default TextInputCustom;

const styles = StyleSheet.create({
  view: {
    height: 50,
    width: sizes.width * 0.9,
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 15,
    borderColor: colors.gray2,
    borderWidth: 1,
    ...stylesCustom.row,
  },
  view1: {
    height: 50,
    width: sizes.width * 0.8,
    fontFamily: fonts.Regula,
    fontSize: sizes.width * 0.04,
    color: colors.text,
    paddingHorizontal: 10,
  },
});
