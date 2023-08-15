import {StyleSheet, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import fonts from '../../res/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import stylesCustom from '../../res/stylesCustom';
import {useGetBankingQuery} from '../../redux/api/auth.api';

export default function SelectItemBank({
  data,
  select,
  setSelect,
  onPressIcon,
}: {
  data: string[] | undefined;
  select?: string;
  setSelect: (val: string) => void;
  onPressIcon?: () => void;
}) {
  return (
    <SelectDropdown
      data={data || []}
      onSelect={(selectedItem, index) => {
        setSelect(selectedItem);
      }}
      buttonStyle={styles.view}
      buttonTextAfterSelection={item => {
        return `(${item.short_name}) ${item?.account_holder} ${item?.account_number}`;
      }}
      defaultValue={select}
      defaultButtonText="Thanh toán"
      buttonTextStyle={styles.txt}
      rowTextStyle={styles.txt}
      rowTextForSelection={item => {
        return `(${item.short_name}) ${item?.account_holder} ${item?.account_number}`;
      }}
      dropdownStyle={{borderRadius: 10}}
      renderDropdownIcon={() => (
        <View style={stylesCustom.row1}>
          <Ionicons
            onPress={onPressIcon}
            name={'logo-usd'}
            size={25}
            color={colors.text}
          />
          <Entypo name="chevron-down" color={colors.text} size={25} />
        </View>
      )}
    />
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
