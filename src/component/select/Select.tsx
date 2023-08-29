import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import fonts from '../../res/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import stylesCustom from '../../res/stylesCustom';
export default function Select({
  data,
  select,
  setSelect,
  onPressIcon,
  defaultButtonText,
  icons,
  disabled,
  styleItem,
  defaultValueByIndex,
  holder,
}: {
  data?: Team[] | Branches[] | KeyInvoid[];
  select?: string | number;
  setSelect: (val: SelectCustom) => void;
  onPressIcon?: () => void;
  defaultButtonText?: string;
  icons?: string;
  disabled?: boolean;
  styleItem?: StyleProp<ViewStyle>;
  defaultValueByIndex?: number;
  holder?: string;
}) {
  return (
    <>
      <SelectDropdown
        data={data || []}
        onSelect={(selectedItem, index) => {
          setSelect(selectedItem);
        }}
        buttonStyle={[styles.view, styleItem]}
        buttonTextAfterSelection={item => {
          return select ? item?.name : holder;
        }}
        defaultValueByIndex={defaultValueByIndex}
        defaultValue={select}
        defaultButtonText={defaultButtonText}
        buttonTextStyle={styles.txt}
        rowTextStyle={styles.txt}
        rowTextForSelection={item => {
          return item?.name;
        }}
        disabled={disabled}
        dropdownStyle={{borderRadius: 10}}
        renderDropdownIcon={() => (
          <View style={stylesCustom.row1}>
            {icons && (
              <Ionicons
                onPress={onPressIcon}
                name={icons ? icons : ''}
                size={25}
                color={colors.text}
                style={{zIndex: 1000}}
              />
            )}

            <Entypo name="chevron-down" color={colors.text} size={25} />
          </View>
        )}
      />
    </>
  );
}

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
    backgroundColor: 'transparent',
  },
  txt: {
    fontFamily: fonts.Regula,
    fontSize: sizes.width * 0.04,
    color: colors.text,
    textAlign: 'left',
  },
});
