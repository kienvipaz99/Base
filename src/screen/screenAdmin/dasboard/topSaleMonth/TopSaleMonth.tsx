import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import stylesCustom from '../../../../res/stylesCustom';
import sizes from '../../../../res/sizes';
import {colors} from '../../../../res/colors';
import fonts from '../../../../res/fonts';
import Empolyee from './Empolyee';
import Product from './Product';

export default function TopSaleMonth() {
  const [select, setSelect] = useState(0);
  return (
    <View style={styles.view}>
      <View style={stylesCustom.row}>
        <Pressable
          style={[
            styles.select,
            {backgroundColor: select === 0 ? '#00BDB0' : colors.gray1},
          ]}
          onPress={() => setSelect(0)}>
          <Text
            style={[
              styles.txt,
              {color: select === 0 ? colors.white : colors.text},
            ]}>
            Nhân Viên
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.select,
            {backgroundColor: select === 1 ? '#00BDB0' : colors.gray1},
          ]}
          onPress={() => setSelect(1)}>
          <Text
            style={[
              styles.txt,
              {color: select === 1 ? colors.white : colors.text},
            ]}>
            Phần mềm
          </Text>
        </Pressable>
      </View>
      <View style={styles.view1}>
        {select === 0 ? <Empolyee /> : <Product />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    marginTop: 25,
  },
  view1: {
    width: sizes.width * 0.9,
    padding: 15,
    ...stylesCustom.shadowitem,
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    marginTop: 25,
    height: 600,
  },
  select: {
    height: 50,
    width: sizes.width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontFamily: fonts.Medium,
    fontSize: 17,
  },
});
