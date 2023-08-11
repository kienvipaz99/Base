import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes';
import {colors} from '../../../res/colors';
import stylesCustom from '../../../res/stylesCustom';
import fonts from '../../../res/fonts';
import images from '../../../res/images';

export default function RenderItemRank({
  item,
  index,
}: {
  item: Rank;
  index: number;
}) {
  let you = 1;
  const backGround = item.id === you ? '#10869F' : colors.white;
  const colorText = item.id === you ? colors.white : colors.text;
  const colorText1 = item.id === you ? colors.white : colors.gray3;

  return (
    <View
      style={[
        styles.view,
        {
          backgroundColor: backGround,
        },
      ]}>
      <View style={stylesCustom.row1}>
        <Text style={[styles.txt, {color: colorText}]}>{index + 1}</Text>
        <Image source={item.img} style={styles.img} />
        <View>
          <Text style={[styles.txt, {color: colorText}]}>{item.name}</Text>
          <Text style={[styles.txt1, {color: colorText1}]}>
            Team: {item.team}
          </Text>
        </View>
      </View>
      <View style={stylesCustom.row1}>
        <Image
          style={styles.img1}
          source={item.key > item.lastMonth ? images.up : images.down}
        />
        <Text style={[styles.txt, {color: colorText}]}>{item.key}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: sizes.width * 0.9,
    alignSelf: 'center',
    padding: 15,
    backgroundColor: colors.white,
    ...stylesCustom.shadowitem,
    borderRadius: 15,
    marginTop: 20,
    ...stylesCustom.row,
  },
  txt: {
    color: colors.text,
    fontFamily: fonts.Medium,
    fontSize: 17,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  txt1: {
    color: colors.gray3,
    fontFamily: fonts.Regula,
    fontSize: 16,
  },
  img1: {height: 16, width: 16, marginRight: 10},
});
