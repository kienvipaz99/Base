import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import stylesCustom from '../../../res/stylesCustom';
import HeaderCustom from '../../../component/header/HeaderCustom';
import {colors} from '../../../res/colors';
import RenderListKey from './RenderListKey';
import sizes from '../../../res/sizes';
import {
  useChangeInvoidMutation,
  useDeleteInvoidMutation,
  useGetDataKeyQuery,
} from '../../../redux/api/auth.api';
import Loading from '../../../component/loading/Loading';
import ToastCustom from '../../../component/toastCustom/ToastCustom';

export default function List_Key() {
  const [perpage, setPerPage] = useState(10);
  const handleEndReached = () => {
    setPerPage(perpage + 10);
    refetch();
  };
  const {data, refetch, isLoading, isFetching} = useGetDataKeyQuery({
    per_page: perpage,
  });
  const RefToast = useRef<any>(null);
  const [fetching, setFetching] = useState(false);
  const [onChangeStatus, {isLoading: onLoadStatus}] = useChangeInvoidMutation();
  const [deleteItem, {isLoading: loadingDelete}] = useDeleteInvoidMutation();
  const DeleteInvoid = async (id: number) => {
    try {
      const aa = await deleteItem({
        id: id,
      }).unwrap();
      if (aa) {
        await RefToast.current.toast();
      }
    } catch (error) {}
  };
  const OnClick = async ({id, status}: {id: number; status: string}) => {
    try {
      const select = await onChangeStatus({
        id: id,
        data: {
          status:
            status === 'PAID' ? 'UNPAID' : status === 'UNPAID' ? 'PAID' : '',
          _method: 'PATCH',
        },
      }).unwrap();
      if (select) {
        await refetch();
      }
    } catch (error) {}
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
            <RenderListKey
              item={item}
              onChange={OnClick}
              deletes={DeleteInvoid}
              refetch={refetch}
            />
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
      {loadingDelete && <Loading />}

      {(onLoadStatus || isFetching) && <Loading />}
      <ToastCustom val="Xoá thành công " ref={RefToast} />
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
