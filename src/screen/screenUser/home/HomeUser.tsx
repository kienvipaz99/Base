import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderCustom from '../../../component/header/HeaderCustom';
import stylesCustom from '../../../res/stylesCustom';
import sizes from '../../../res/sizes';
import images from '../../../res/images';
import {colors} from '../../../res/colors';
import fonts from '../../../res/fonts';
import StatisticalChart from './StatisticalChart';
import BTNLogin from '../../../component/btn/BTNLogin';
import {NavigationProp} from '@react-navigation/native';

export default function HomeUser({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) {
  const RenderFooter = () => (
    <>
      <View style={[stylesCustom.row1, styles.view1]}>
        <Image source={images.kien} style={styles.img} />
        <View style={styles.view}>
          <Text style={styles.txt}>Nguyễn Văn Kiên</Text>
          <Text style={styles.txt1}>Email: kienvipaz99@gmail.com</Text>
        </View>
      </View>
      <View style={styles.view4}>
        <View style={styles.view3}>
          <Text style={styles.txt2}>Doanh thu tháng này</Text>
          <Text style={styles.txt3}>30.000.000</Text>
          <Text style={styles.txt2}>KPI: 50.000.000</Text>
        </View>

        <View style={styles.view3}>
          <Text style={styles.txt2}>Doanh thu tháng trước</Text>
          <Text style={styles.txt3}>36.000.000</Text>
          <Text style={styles.txt2}>KPI: 50.000.000</Text>
        </View>
      </View>
      <Text style={styles.txt4}>Biểu đồ doanh thu các tháng </Text>
      <StatisticalChart />
      <Text style={styles.txt4}>Tổng doanh thu: 300tr </Text>
      <BTNLogin
        title="Đăng xuất"
        styleProps={{marginTop: 25}}
        onPress={() => navigation.navigate('Login')}
      />
    </>
  );
  return (
    <View style={styles.container}>
      <HeaderCustom title="Trang chủ" />
      <View style={stylesCustom.view1}>
        <FlatList
          data={[]}
          renderItem={null}
          ListFooterComponent={() => <RenderFooter />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {height: 55, width: 55, borderRadius: 60},
  txt: {
    color: colors.text,
    fontFamily: fonts.Medium,
    fontSize: 18,
  },
  txt1: {
    color: colors.gray3,
    fontFamily: fonts.Regula,
    fontSize: 16,
  },
  view: {
    marginLeft: 15,
  },
  view1: {marginTop: 30, width: sizes.width * 0.9, alignSelf: 'center'},
  view3: {
    width: sizes.width * 0.42,
    padding: 8,
    ...stylesCustom.shadowitem,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  view4: {
    marginTop: 25,
    width: sizes.width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt2: {
    color: colors.text,
    fontFamily: fonts.Medium,
    fontSize: 17,
    textAlign: 'center',
    marginTop: 5,
  },
  txt3: {
    color: colors.green,
    fontFamily: fonts.Medium,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  txt4: {
    ...stylesCustom.txtTitle,
    color: colors.text,
    marginTop: 23,
    fontSize: sizes.width * 0.045,
    marginLeft: 25,
  },
});
