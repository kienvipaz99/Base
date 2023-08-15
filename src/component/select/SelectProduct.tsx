import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import fonts from '../../res/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import stylesCustom from '../../res/stylesCustom';

export default function SelectProduct({
  data,
  setSelect,
  title,
  search,
}: {
  data: string[] | undefined;
  setSelect: (val: Plans) => void;
  title: string;
  search?: boolean;
}) {
  return (
    <SelectDropdown
      data={data || []}
      onSelect={(item, index) => {
        setSelect(item);
      }}
      buttonStyle={styles.view}
      buttonTextAfterSelection={item => {
        return item?.name;
      }}
      defaultButtonText={title}
      buttonTextStyle={styles.txt}
      rowTextForSelection={item => {
        return item?.name;
      }}
      search={search}
      searchInputTxtColor={colors.text}
      searchPlaceHolder="Tìm kiếm..."
      searchInputTxtStyle={styles.txt}
      dropdownIconPosition="right"
      renderSearchInputLeftIcon={() => (
        <Ionicons name="search" color={colors.text} size={25} />
      )}
      rowStyle={{padding: 10, height: 65}}
      renderCustomizedRowChild={item => {
        return (
          <View style={stylesCustom.row}>
            <Text style={styles.txt}>{item?.name}</Text>
          </View>
        );
      }}
      dropdownStyle={{borderRadius: 10}}
      renderDropdownIcon={() => (
        <Entypo name="chevron-down" color={colors.text} size={25} />
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
    width: sizes.width * 0.65,
  },
});
