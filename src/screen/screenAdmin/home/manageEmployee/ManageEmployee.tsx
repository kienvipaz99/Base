import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import HeaderCustom from '../../../../component/header/HeaderCustom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import stylesCustom from '../../../../res/stylesCustom';
import {colors} from '../../../../res/colors';
import sizes from '../../../../res/sizes';
import RenderItemManageEmployee from './RenderItemManageEmployee';
import {useGetEmployeeQuery} from '../../../../redux/api/auth.api';
import Loading from '../../../../component/loading/Loading';
import BottomSheetCreatEmployee from '../../../../component/bottomSheet/BottomSheetCreatEmployee';
import BottomSheetFillterEmployee from '../../../../component/bottomSheet/BottomSheetFillterEmployee';
import Nodata from '../../../../component/nofinddata/Nodata';

export default function ManageEmployee({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) {
  const [perpage, setPerPage] = useState(20);
  const handleEndReached = () => {
    setPerPage(perpage + 20);
    refetch();
  };
  const refFillter = useRef<any>(null);
  const [params, setParams] = useState('');
  const refRBSheet = useRef<any>(null);
  const {data, isLoading, refetch, isFetching} = useGetEmployeeQuery({
    per_page: perpage,
    option: params,
  });

  return (
    <View style={styles.container}>
      <HeaderCustom
        title="Quản lý nhân viên"
        back
        onBackPress={() => navigation.goBack()}
        sharp
        OnPressSharp={async () => await refFillter?.current?.open()}
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
        {data?.data?.length !== 0 ? (
          <FlatList
            data={data?.data}
            renderItem={({item}) => <RenderItemManageEmployee item={item} />}
            contentContainerStyle={styles.fl}
            style={{marginTop: 15}}
            onRefresh={refetch}
            scrollEventThrottle={16}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.7}
            refreshing={isFetching}
          />
        ) : (
          <Nodata />
        )}
      </View>
      <BottomSheetCreatEmployee refRBSheet={refRBSheet} refetchs={refetch} />
      <BottomSheetFillterEmployee
        refRBSheet={refFillter}
        params={val => setParams(val)}
        isLoading={isFetching}
      />
      {isLoading && <Loading />}
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
