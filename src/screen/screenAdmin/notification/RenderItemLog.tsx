import {StyleSheet, Text, View, LayoutAnimation, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import sizes from '../../../res/sizes';
import {colors} from '../../../res/colors';
import {date, maxlengText} from '../../../res/convert';
import fonts from '../../../res/fonts';

export default function RenderItemLog({item}: {item: Activities}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const toggle = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };
    toggle();
  }, [show]);
  let headerStyle = Object.assign({}, styles.view);
  if (!show) {
    headerStyle;
  }
  const PressShow = () => setShow(!show);
  return (
    <Pressable style={styles.view} onPress={PressShow}>
      <Text style={styles.name}>{item?.subject_type}</Text>
      <Text style={styles.function}>Hành động: {item?.event}</Text>
      <Text style={styles.function}>Thời gian: {date(item?.created_at)}</Text>
      <Text style={styles.function}>
        Mô tả: {show ? item?.description : maxlengText(item?.description)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  view: {
    width: sizes.width * 0.9,
    alignSelf: 'center',
    marginTop: 22,
    elevation: 1,
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 10,
  },
  name: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: 17,
  },
  function: {
    fontFamily: fonts.Regula,
    color: colors.text,
    fontSize: 15,
  },
});
