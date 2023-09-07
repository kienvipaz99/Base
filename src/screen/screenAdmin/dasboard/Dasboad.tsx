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
import {useGetDashboardRevenueQuery} from '../../../redux/api/auth.api';
import {formatCurrencys, money, thang} from '../../../res/convert';
import Loading from '../../../component/loading/Loading';
const Dasboad = () => {
  const {data, isLoading} = useGetDashboardRevenueQuery('') as any;
  const RenderFooter = () => (
    <>
      <Text style={styles.txt}>Doanh thu tháng này</Text>
      <View style={{width: sizes.width * 0.9, alignSelf: 'center'}}>
        <View>
          <Text style={styles.txt1}>
            {money(data?.data?.thisMonthTotalCountryRevenueApprove)}/
            {money(data?.data?.totalKpiMonth)}
          </Text>
          <ProgressBar
            progress={
              data
                ? data?.data?.thisMonthTotalCountryRevenue /
                  data?.data?.totalKpiMonth
                : 0
            }
            color={colors.blue}
            style={styles.progress}
          />
        </View>
        <View style={stylesCustom.row}>
          <Text style={styles.txt2}>Tỷ lệ doanh thu:</Text>
          <Text style={styles.txt2}>
            {(
              (data?.data?.thisMonthTotalCountryRevenue /
                data?.data?.totalKpiMonth) *
              100
            ).toFixed(2)}
            %
          </Text>
        </View>
      </View>

      <Text style={styles.txt}>Doanh thu tháng {thang()}</Text>
      <CuttomTab />
      <Text style={styles.txt}>Biểu đồ doanh thu</Text>
      <LineChart />
      <Text style={styles.txt}>Doanh số nhân viên hôm nay</Text>
      <EmployeeSaleToday
        RevenueToday={data?.data?.today?.todayTotalCountryRevenue}
      />
      <View style={stylesCustom.row}>
        <Text style={styles.txt}>Top doanh thu tháng</Text>
        <Text style={[styles.txt, {color: colors.green, marginRight: 10}]}>
          Tổng ({formatCurrencys(data?.data?.thisMonthTotalCountryRevenue)})
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
      {isLoading && <Loading />}
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
