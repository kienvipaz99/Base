import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import stylesCustom from '../../../res/stylesCustom';
import HeaderCustom from '../../../component/header/HeaderCustom';
import {colors} from '../../../res/colors';
import RenderListKey from './RenderListKey';
import sizes from '../../../res/sizes';
import {
  useChangeStatusMutation,
  useGetDataKeyQuery,
} from '../../../redux/api/auth.api';
import Loading from '../../../component/loading/Loading';

export default function List_Key() {
  const [perpage, setPerPage] = useState(10);
  const handleEndReached = () => {
    setPerPage(perpage + 10);
    refetch();
  };
  const {data, refetch, isLoading} = useGetDataKeyQuery({
    per_page: perpage,
  });
  const [fetching, setFetching] = useState(false);
  const [onChangeStatus] = useChangeStatusMutation();
  const OnClick = async ({id, status}: {id: number; status: string}) => {
    try {
      const select = await onChangeStatus({
        id: id,
        status:
          status === 'PAID' ? 'UNPAID' : status === 'UNPAID' ? 'PAID' : '',
      }).unwrap();
      if (select) {
        await refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <HeaderCustom title="Danh sách Key" sharp />
      <View style={stylesCustom.view1}>
        <Text style={styles.txt}>
          Báo cáo danh sách ({data?.payload?.pagination?.total})
        </Text>

        <FlatList
          data={data?.data}
          renderItem={({item}) => (
            <RenderListKey item={item} onChange={OnClick} />
          )}
          contentContainerStyle={{paddingBottom: 50}}
          onRefresh={async () => {
            setFetching(true);
            await refetch();
            setFetching(false);
          }}
          scrollEventThrottle={16}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.7}
          refreshing={fetching}
        />
      </View>
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
    marginTop: 23,
    marginLeft: 15,
    fontSize: sizes.width * 0.05,
  },
});
