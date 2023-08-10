import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {NavigationProp} from '@react-navigation/native';
import HeaderCustom from '../../../../component/header/HeaderCustom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import stylesCustom from '../../../../res/stylesCustom';
import {colors} from '../../../../res/colors';
import sizes from '../../../../res/sizes';
import {dataEmployeeSaleToday} from '../../../../res/feckData/dataEmployeeSaleToday';
import RenderItemManageEmployee from './RenderItemManageEmployee';
import BottomSheetEditEmployee from '../../../../component/bottomSheet/BottomSheetEditEmployee';

export default function ManageEmployee({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) {
  const refRBSheet = useRef<any>(null);
  return (
    <View style={styles.container}>
      <HeaderCustom
        title="Quản lý nhân viên"
        back
        onBackPress={() => navigation.goBack()}
        sharp
      />
      <View style={stylesCustom.view1}>
        <View style={styles.view}>
          <Text style={styles.txt}>Danh sách nhân viên</Text>
          <Ionicons
            name="person-add"
            color={colors.text}
            size={30}
            onPress={() => refRBSheet.current.open()}
          />
        </View>
        <FlatList
          data={dataEmployeeSaleToday}
          renderItem={({item}) => <RenderItemManageEmployee item={item} />}
          contentContainerStyle={styles.fl}
        />
      </View>
      <BottomSheetEditEmployee refRBSheet={refRBSheet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  txt: {
    ...stylesCustom.txtTitle,
    color: colors.text,
    marginLeft: 15,
    fontSize: sizes.width * 0.05,
  },
  fl: {marginBottom: 20, paddingBottom: 40},
  view: {
    ...stylesCustom.row,
    marginTop: 23,
    width: sizes.width * 0.9,
    alignSelf: 'center',
  },
});
