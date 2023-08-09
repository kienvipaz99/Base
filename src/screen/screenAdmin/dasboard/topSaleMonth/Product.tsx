import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {dataEmployeeSaleToday} from '../../../../res/feckData/dataEmployeeSaleToday';
import RenderItemSale from '../RenderItem';

export default function Product() {
  return (
    <ScrollView
      key={'Product'}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      style={{marginTop: 20}}>
      {dataEmployeeSaleToday.map((item, index) => (
        <RenderItemSale item={item} index={index} key={index.toString()} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
