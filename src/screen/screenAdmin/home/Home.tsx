import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderCustom from '../../../component/header/HeaderCustom';
import stylesCustom from '../../../res/stylesCustom';

const Home = () => {
  return (
    <View style={styles.container}>
      <HeaderCustom title="Trang chủ" />
      <View style={stylesCustom.view1}></View>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
