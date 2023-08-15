import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import fonts from '../../res/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import stylesCustom from '../../res/stylesCustom';

export default function SelectBank({
  data,
  setSelect,
}: {
  data: string[] | undefined;
  setSelect: (val: Banking) => void;
}) {
  return (
    <SelectDropdown
      data={data || []}
      onSelect={(item, index) => {
        setSelect(item);
      }}
      buttonStyle={styles.view}
      buttonTextAfterSelection={item => {
        return `(${item?.short_name}) ${item?.name} `;
      }}
      defaultButtonText="Chọn ngân hàng"
      buttonTextStyle={styles.txt}
      rowTextForSelection={item => {
        return `(${item?.short_name}) ${item?.name} `;
      }}
      search
      searchInputTxtColor={colors.text}
      searchPlaceHolder="Tìm kiếm ngân hàng..."
      searchInputTxtStyle={styles.txt}
      dropdownIconPosition="right"
      renderSearchInputLeftIcon={() => (
        <Ionicons name="search" color={colors.text} size={25} />
      )}
      rowStyle={{padding: 10, height: 65}}
      renderCustomizedRowChild={item => {
        return (
          <View style={stylesCustom.row}>
            <Text style={styles.txt}>
              {`(${item?.short_name}) ${item?.name}`}
            </Text>
            <Image
              source={{uri: item.logo}}
              style={
                item.id === 5201
                  ? {height: 40, width: 40}
                  : {height: 60, width: 60}
              }
              resizeMode="contain"
            />
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
