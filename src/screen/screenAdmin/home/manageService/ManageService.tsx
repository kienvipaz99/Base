import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import HeaderCustom from '../../../../component/header/HeaderCustom';
import {NavigationProp} from '@react-navigation/native';
import stylesCustom from '../../../../res/stylesCustom';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../../res/colors';
import sizes from '../../../../res/sizes';
import RenderItemManageServiec from './RenderItemManageService';
import BottomSheetaddService from '../../../../component/bottomSheet/BottomSheetaddService';
import {useGetPlansQuery} from '../../../../redux/api/auth.api';
import Loading from '../../../../component/loading/Loading';
import BottomSheetFillterProduct from '../../../../component/bottomSheet/BottomSheetFillterProduct';
import Nodata from '../../../../component/nofinddata/Nodata';

const ManageService = ({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) => {
  const refRBSheet = useRef<any>(null);
  const refRBFind = useRef<any>(null);

  const [perpage, setPerPage] = useState(20);
  const [params, setParams] = useState('');
  const {data, isLoading, refetch, isFetching} = useGetPlansQuery({
    option: `?include=product&per_page=${perpage}${params}`,
  });
  const handleEndReached = () => {
    setPerPage(perpage + 20);
    refetch();
  };
  return (
    <View style={styles.container}>
      <HeaderCustom
        title="Quản lý dịch vụ"
        back
        sharp
        onBackPress={() => navigation.goBack()}
        OnPressSharp={async () => refRBFind.current.open()}
      />
      <View style={stylesCustom.view1}>
        <View style={styles.view}>
          <Text style={styles.txt}>Danh sách dịch vụ</Text>
          <MaterialCommunityIcons
            name="book-plus"
            color={colors.text}
            size={30}
            onPress={() => refRBSheet.current.open()}
          />
        </View>

        {data?.data?.length !== 0 ? (
          <FlatList
            data={data?.data}
            keyExtractor={(item: Plans) => item?.id.toString()}
            renderItem={({item}) => <RenderItemManageServiec item={item} />}
            contentContainerStyle={styles.fl}
            onRefresh={refetch}
            scrollEventThrottle={16}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.7}
            style={{marginTop: 20}}
            refreshing={isFetching}
          />
        ) : (
          <Nodata />
        )}
      </View>
      <BottomSheetaddService refRBSheet={refRBSheet} />
      {isLoading && <Loading />}
      <BottomSheetFillterProduct
        isLoading={isFetching}
        params={setParams}
        refRBSheet={refRBFind}
      />
    </View>
  );
};

export default ManageService;

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
