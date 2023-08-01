import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import stylesCustom from '../../../res/stylesCustom';
import HeaderCustom from '../../../component/header/HeaderCustom';

export default function List_Key() {
  return (
    <View style={styles.container}>
      <HeaderCustom title="Danh sách Key" />
      <View style={stylesCustom.view1}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
