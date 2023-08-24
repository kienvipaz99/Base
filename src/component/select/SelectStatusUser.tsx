import {StyleSheet} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import sizes from '../../res/sizes';
import {colors} from '../../res/colors';
import fonts from '../../res/fonts';
export default function SelectStatusUser({
  select,
  setSelect,
}: {
  select?: boolean;
  setSelect: (val: Status) => void;
}) {
  const data = [
    {id: 1, status: true, name: 'Hoạt động'},
    {id: 2, status: false, name: 'Không hoạt động'},
  ];

  return (
    <>
      <SelectDropdown
        data={data || []}
        onSelect={(selectedItem, index) => {
          setSelect(selectedItem);
        }}
        buttonStyle={styles.view}
        buttonTextAfterSelection={item => {
          return item.name;
        }}
        defaultValueByIndex={select ? 0 : 1}
        defaultValue={select}
        defaultButtonText="Trạng thái"
        buttonTextStyle={styles.txt}
        rowTextStyle={styles.txt}
        rowTextForSelection={item => {
          return item.name;
        }}
        dropdownStyle={{borderRadius: 10}}
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
