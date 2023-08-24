import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import fonts from '../../res/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import stylesCustom from '../../res/stylesCustom';
import {Text} from 'react-native-paper';
import {useGetUserQuery} from '../../redux/api/auth.api';
export default function SelectUser({
  select,
  setSelect,
  onPressIcon,
}: {
  select?: string;
  setSelect: (val: GetUser) => void;
  onPressIcon?: () => void;
}) {
  const {data: user} = useGetUserQuery({
    option: 'filter[customer]=CUSTOMER',
  });
  return (
    <SelectDropdown
      data={user?.data || []}
      onSelect={(selectedItem, index) => {
        setSelect(selectedItem);
      }}
      buttonStyle={styles.view}
      buttonTextAfterSelection={item => {
        return `${item?.name} (${item.email})`;
      }}
      defaultValue={select}
      defaultButtonText="Chọn khách hàng"
      buttonTextStyle={styles.txt}
      rowTextStyle={styles.txt}
      rowTextForSelection={item => {
        return item?.name + item.email;
      }}
      search
      searchInputTxtColor={colors.text}
      searchPlaceHolder="Tìm kiếm..."
      searchInputTxtStyle={styles.txt}
      selectedRowStyle={{backgroundColor: colors.gray1}}
      dropdownStyle={{borderRadius: 10}}
      renderSearchInputLeftIcon={() => {
        return (
          <Ionicons
            onPress={onPressIcon}
            name={'search'}
            size={25}
            color={colors.text}
          />
        );
      }}
      renderCustomizedRowChild={item => {
        return (
          <View style={stylesCustom.row}>
            <Text style={styles.txt}>{`${item?.name} (${item.email})`}</Text>
          </View>
        );
      }}
      renderDropdownIcon={() => (
        <View style={stylesCustom.row1}>
          <Ionicons
            onPress={onPressIcon}
            name={'person-add'}
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
    marginLeft: 15,
  },
});
