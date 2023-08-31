import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../res/sizes';
import stylesCustom from '../../res/stylesCustom';
import images from '../../res/images';

export default function Nodata() {
  return (
    <View style={styles.view2}>
      <Image source={images.nodata} style={styles.img} />
      <Text style={[stylesCustom.txtTitle1, {color: 'black'}]}>
        Không tìm thấy nội dung
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: sizes.width * 0.7,
    width: sizes.width * 0.7,
  },
  view2: {alignItems: 'center', width: sizes.width},
});
