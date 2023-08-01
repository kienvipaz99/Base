import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import HeaderCustom from '../../../component/header/HeaderCustom';
import stylesCustom from '../../../res/stylesCustom';

const Dasboad = () => {
  return (
    <View style={styles.container}>
      <HeaderCustom title="Tổng quan" />
      <View style={stylesCustom.view1}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Dasboad;
