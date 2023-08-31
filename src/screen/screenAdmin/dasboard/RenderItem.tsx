import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import images from '../../../res/images';
import {colors} from '../../../res/colors';
import stylesCustom from '../../../res/stylesCustom';
import sizes from '../../../res/sizes';
import fonts from '../../../res/fonts';
import {money} from '../../../res/convert';

export default function RenderItemSale({
  item,
  index,
}: {
  item: KPIEMPloyee;
  index: number;
}) {
  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.view3}>
            <Text>{index + 1}</Text>
            <Image source={images.kien} style={styles.img} />
          </View>
          <View>
            <Text style={styles.txtName}>{item?.name}</Text>
            <Text style={styles.txt1}>Team {item?.team?.name}</Text>
            <Text style={[styles.txtName, {color: '#DB0505'}]}>KPI: 0</Text>
            <Text style={[styles.txtName, {color: colors.green}]}>
              Doanh số: {money(item?.revenue)}
            </Text>
            <Text style={[styles.txtName, {color: colors.orange}]}>
              Đã duyệt: {money(item?.revenue_approve)}
            </Text>
          </View>
        </View>
        <View>
          <Image source={images.cup1} />
          <Image
            source={
              item?.revenue < item.revenue_last_month ? images.down : images.up
            }
            style={{marginTop: 15}}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    ...stylesCustom.shadowitem,
    marginBottom: 15,
    backgroundColor: colors.white,
    width: sizes.width * 0.8,
    alignSelf: 'center',
    padding: 8,
    marginTop: 10,
    borderRadius: 10,
  },
  view2: {flexDirection: 'row', justifyContent: 'space-between'},
  view3: {...stylesCustom.row1, alignSelf: 'flex-start'},
  txtName: {
    color: colors.text,
    fontFamily: fonts.Medium,
    fontSize: 16,
  },
  txt1: {
    color: colors.gray1,
    fontFamily: fonts.Medium,
    fontSize: 15,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 25,
    marginLeft: 10,
    marginRight: 10,
  },
});
