import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes';
import stylesCustom from '../../../res/stylesCustom';
import {colors} from '../../../res/colors';
import fonts from '../../../res/fonts';
import {dataEmployeeSaleToday} from '../../../res/feckData/dataEmployeeSaleToday';
import images from '../../../res/images';
import RenderItemSale from './RenderItem';

export default function EmployeeSaleToday() {
  return (
    <View style={styles.view}>
      <Text style={styles.txt}>Tổng thu: 20000000</Text>
      <ScrollView
        key={'scrollEmployeeSaleToday'}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={{marginTop: 20}}>
        {dataEmployeeSaleToday.map((item, index) => (
          <RenderItemSale
            item={item}
            index={index}
            key={index.toString() + 1}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: sizes.width * 0.9,
    padding: 15,
    ...stylesCustom.shadowitem,
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    marginTop: 25,
    height: 500,
  },
  txt: {
    fontFamily: fonts.Medium,
    fontSize: 18,
    color: colors.green,
  },
  txtName: {
    color: colors.text,
    fontFamily: fonts.Medium,
    fontSize: 16,
  },
});
