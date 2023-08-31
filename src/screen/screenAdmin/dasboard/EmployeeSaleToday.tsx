import {
  ActivityIndicator,
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
import RenderItemSale from './RenderItem';
import {useGetEmployeeTodayQuery} from '../../../redux/api/auth.api';
import {money} from '../../../res/convert';
export default function EmployeeSaleToday({
  RevenueToday,
}: {
  RevenueToday?: number;
}) {
  const {data, isLoading} = useGetEmployeeTodayQuery('');
  return (
    <View style={styles.view}>
      <Text style={styles.txt}>Tổng thu:{money(RevenueToday)} </Text>

      {isLoading ? (
        <View style={styles.view1}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          key={'scrollEmployeeSaleToday'}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          style={{marginTop: 20}}>
          {data?.data.map((item, index) => (
            <RenderItemSale
              item={item}
              index={index}
              key={index.toString() + 1}
            />
          ))}
        </ScrollView>
      )}
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
  view1: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 0,
    flex: 1,
    backgroundColor: 'white',
  },
});
