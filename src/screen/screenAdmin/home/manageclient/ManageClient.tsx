import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import stylesCustom from '../../../../res/stylesCustom';
import HeaderCustom from '../../../../component/header/HeaderCustom';
import {NavigationProp} from '@react-navigation/native';
import sizes from '../../../../res/sizes';
import {colors} from '../../../../res/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RenderItemManage from './RenderItemManage';
import BottomSheetClient from '../../../../component/bottomSheet/BottomSheetClient';
import {
  useGetUserQuery,
  useGetdataClientQuery,
} from '../../../../redux/api/auth.api';
import Loading from '../../../../component/loading/Loading';
import BottomSheetEditClient from '../../../../component/bottomSheet/BottomSheetEditClient';
import BottomSheetFilterClient from '../../../../component/bottomSheet/BottomSheetFilterClient';
import Nodata from '../../../../component/nofinddata/Nodata';
export default function ManageClient({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) {
  const refRBSheet = useRef<any>();
  const refBootomSheet = useRef<any>(null);
  const refFillter = useRef<any>(null);

  const [datas, setDatas] = useState<itemManage>();
  const [params, setParams] = useState('');
  const {data, isLoading, isFetching} = useGetdataClientQuery({
    option: `&filter[customer]=CUSTOMER${params}`,
  });
  const EditUser = (val: itemManage) => {
    refBootomSheet.current.open();
    setDatas(val);
  };

  return (
    <View style={styles.container}>
      <HeaderCustom
        title="Quản lý khách hàng"
        back
        onBackPress={() => navigation.goBack()}
        sharp
        OnPressSharp={async () => await refFillter.current.open()}
      />
      <View style={stylesCustom.view1}>
        <View style={styles.view}>
          <Text style={styles.txt}>Danh sách khách hàng</Text>
          <Ionicons
            name="person-add"
            color={colors.text}
            size={30}
            onPress={() => refRBSheet.current.open()}
          />
        </View>
        {data?.data?.length !== 0 ? (
          <FlatList
            data={data?.data}
            renderItem={({item}) => (
              <RenderItemManage item={item} onSelect={EditUser} />
            )}
            contentContainerStyle={styles.fl}
          />
        ) : (
          <Nodata />
        )}
      </View>
      <BottomSheetClient refRBSheet={refRBSheet} />
      <BottomSheetEditClient refRBSheet={refBootomSheet} item={datas} />
      {isLoading && <Loading />}
      <BottomSheetFilterClient
        refRBSheet={refFillter}
        params={val => setParams(val)}
        isLoading={isFetching}
      />
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
