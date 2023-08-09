import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import HeaderCustom from '../../../component/header/HeaderCustom';
import stylesCustom from '../../../res/stylesCustom';
import {colors} from '../../../res/colors';
import sizes from '../../../res/sizes';
import {ProgressBar} from 'react-native-paper';
import CuttomTab from './CuttomTab';
import LineChart from './LineChart';
import EmployeeSaleToday from './EmployeeSaleToday';
import TopSaleMonth from './topSaleMonth/TopSaleMonth';
const Dasboad = () => {
  const RenderFooter = () => (
    <>
      <Text style={styles.txt}>Doanh thu tháng này</Text>
      <View style={{width: sizes.width * 0.9, alignSelf: 'center'}}>
        <View>
          <Text style={styles.txt1}>20.000.000/100.000.000</Text>
          <ProgressBar
            progress={0.8}
            color={colors.blue}
            style={styles.progress}
          />
        </View>
        <View style={stylesCustom.row}>
          <Text style={styles.txt2}>Tỷ lệ doanh thu:</Text>
          <Text style={styles.txt2}>20%</Text>
        </View>
      </View>
      <Text style={styles.txt}>Doanh thu hôm nay</Text>
      <Text style={[styles.txt3, styles.txtmoney]}>10.000.000</Text>
      <Text style={styles.txt}>Doanh thu tháng 8</Text>
      <CuttomTab />
      <Text style={styles.txt}>Biểu đồ doanh thu</Text>
      <LineChart />
      <Text style={styles.txt}>Doanh số nhân viên hôm nay</Text>
      <EmployeeSaleToday />
      <View style={stylesCustom.row}>
        <Text style={styles.txt}>Top doanh thu tháng</Text>
        <Text style={[styles.txt, {color: colors.green, marginRight: 10}]}>
          Tổng 300 (tr)
        </Text>
      </View>
      <TopSaleMonth />
    </>
  );
  return (
    <View style={styles.container}>
      <HeaderCustom title="Tổng quan" />
      <View style={stylesCustom.view1}>
        <FlatList
          key={'Dasboad'}
          data={[]}
          renderItem={null}
          nestedScrollEnabled={true}
          ListFooterComponent={RenderFooter}
          showsVerticalScrollIndicator={false}
          ListFooterComponentStyle={{paddingBottom: 40}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    ...stylesCustom.txtTitle,
    color: colors.text,
    marginTop: 23,
    marginLeft: 15,
    fontSize: sizes.width * 0.05,
  },
  txt1: {
    ...stylesCustom.txtTitle,
    color: colors.text,
    marginTop: 23,
    fontSize: sizes.width * 0.045,
  },
  txt2: {
    ...stylesCustom.txtTitle,
    color: colors.text,
    marginTop: 20,
    fontSize: sizes.width * 0.04,
  },
  txt3: {
    ...stylesCustom.txtTitle,
    color: colors.text,
    fontSize: sizes.width * 0.04,
  },
  progress: {height: 10, borderRadius: 10, marginTop: 10},
  txtmoney: {
    width: sizes.width * 0.9,
    alignSelf: 'center',
    color: '#2FB77A',
    marginTop: 10,
  },
});

export default Dasboad;
