import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../../res/colors';
import fonts from '../../../../res/fonts';
import sizes from '../../../../res/sizes';
import stylesCustom from '../../../../res/stylesCustom';
import images from '../../../../res/images';

const RenderItemManage = ({item}: {item: itemManage}) => {
  return (
    <View style={styles.view}>
      <View style={stylesCustom.row}>
        <Text style={styles.txt1}>Tên KH: {item.name}</Text>
        <View
          style={[
            styles.status,
            {backgroundColor: item.status ? colors.green : colors.red},
          ]}
        />
      </View>
      <View style={stylesCustom.row}>
        <View>
          <Text style={styles.txt2}>Email: {item.email}</Text>
          <Text style={styles.txt2}>Số điện thoại: {item.phone}</Text>
          <Text style={styles.txt2}>Ngày tạo: {item.created_at}</Text>
        </View>
        <View>
          <Pressable>
            <Image source={images.pen} />
          </Pressable>
          <Pressable>
            <Image source={images.bin} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default RenderItemManage;

const styles = StyleSheet.create({
  fl: {marginBottom: 20, paddingBottom: 40},
  txt1: {
    color: colors.text,
    fontFamily: fonts.Medium,
    fontSize: 16,
    width: sizes.width * 0.75,
  },
  txt2: {
    color: colors.text,
    fontFamily: fonts.Regula,
    fontSize: 15,
    width: sizes.width * 0.75,
  },
  status: {
    height: 15,
    width: 15,
    borderRadius: 10,
  },
  view: {
    width: sizes.width * 0.9,
    ...stylesCustom.shadowitem,
    backgroundColor: colors.white,
    alignSelf: 'center',
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
  },
});
