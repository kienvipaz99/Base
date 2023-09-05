import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import HeaderCustom from '../../../component/header/HeaderCustom';
import stylesCustom from '../../../res/stylesCustom';
import {colors} from '../../../res/colors';
import RenderItemLog from '../../screenAdmin/notification/RenderItemLog';
import {useGetActivitiesQuery} from '../../../redux/api/auth.api';
import Loading from '../../../component/loading/Loading';
import BottomSheetFillter from '../../../component/bottomSheet/BottomSheetFillter';
import Nodata from '../../../component/nofinddata/Nodata';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import {Profile} from '../../../redux/type/Auth';

const LogUser = () => {
  const refBootomSheet = useRef<any>(null);
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const user = useAppSelect(data => data?.getProfile?.getProfile) as Profile;
  const [perpage, setPerPage] = useState(10);
  const handleEndReached = () => {
    setPerPage(perpage + 10);
    refetch();
  };

  const [params, setParams] = useState('');
  const {data, isLoading, refetch, isFetching} = useGetActivitiesQuery({
    per_page: perpage,
    params: `&filter[causer.id]=${user?.data?.id}${params}`,
  });

  return (
    <View style={styles.container}>
      <HeaderCustom
        title="Thông báo log"
        sharp
        OnPressSharp={() => refBootomSheet.current.open()}
      />
      <View style={stylesCustom.view1}>
        <Text style={styles.txt}>
          Thông báo ({data?.payload?.pagination?.total || 0})
        </Text>

        {data?.data?.length !== 0 ? (
          <FlatList
            data={data?.data}
            renderItem={({item}: {item: Activities}) => (
              <RenderItemLog item={item} />
            )}
            keyExtractor={item => `${item?.id}`}
            contentContainerStyle={{paddingBottom: 50}}
            removeClippedSubviews
            maxToRenderPerBatch={10}
            style={{marginTop: 20}}
            onRefresh={refetch}
            scrollEventThrottle={16}
            refreshing={isFetching}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.7}
          />
        ) : (
          <Nodata />
        )}
      </View>
      <BottomSheetFillter
        refRBSheet={refBootomSheet}
        params={val => setParams(val)}
        isLoading={isFetching}
      />
      {isLoading && <Loading />}
    </View>
  );
};

export default LogUser;

const styles = StyleSheet.create({
  container: {flex: 1},
  txt: {
    ...stylesCustom.txtTitle,
    color: colors.text,
    marginTop: 23,
    marginLeft: 15,
  },
});
