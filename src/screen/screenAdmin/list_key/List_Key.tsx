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
import BottomSheetFillterkey from '../../../component/bottomSheet/BottomSheetFillterkey';
import Nodata from '../../../component/nofinddata/Nodata';
import ModalConfirm from '../../../component/modal/ModalConfirm';
export default function List_Key() {
  const [err, setErr] = useState('');
  const [perpage, setPerPage] = useState(10);
  const handleEndReached = () => {
    setPerPage(perpage + 10);
    refetch();
  };
  const refBootomSheet = useRef<any>(null);
  const [params, setParams] = useState('');
  const {data, refetch, isLoading, isFetching} = useGetDataKeyQuery(
    {
      per_page: perpage,
      params: params,
    },
    {},
  );
  const RefToast = useRef<any>(null);
  const [fetching, setFetching] = useState(false);
  const [show, setShow] = useState(false);

  const [onChangeStatus, {isLoading: onLoadStatus}] = useChangeInvoidMutation();
  const [deleteItem, {isLoading: loadingDelete}] = useDeleteInvoidMutation();
  const [id, setID] = useState<number>();
  const DeleteInvoid = async () => {
    try {
      const aa = await deleteItem({
        id: id,
      }).unwrap();
      if (aa) {
        setErr('Xoá thành công');
        await RefToast.current.toast();
      }
    } catch (error) {
      setErr('Xoá thất bại');
      await RefToast.current.toast();
    }
    setShow(false);
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
      <HeaderCustom
        title="Danh sách Key"
        sharp
        OnPressSharp={() => refBootomSheet.current.open()}
      />
      <View style={stylesCustom.view1}>
        <Text style={styles.txt}>
          Báo cáo danh sách ({data?.payload?.pagination?.total})
        </Text>

        {data?.data?.length !== 0 ? (
          <FlatList
            data={data?.data}
            renderItem={({item}) => (
              <RenderListKey
                item={item}
                onChange={OnClick}
                deletes={val => {
                  setID(val);
                  setShow(true);
                }}
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
        ) : (
          <Nodata />
        )}
      </View>
      {isLoading && <Loading />}

      {(onLoadStatus || isFetching) && <Loading />}
      <ToastCustom val={err} ref={RefToast} />
      <BottomSheetFillterkey
        refRBSheet={refBootomSheet}
        params={val => setParams(val)}
        isLoading={isFetching}
        refetch={refetch}
      />
      <ModalConfirm
        confirm={DeleteInvoid}
        toggleDate={() => setShow(false)}
        isShow={show}
        isLoading={loadingDelete}
        title="Bạn có chắc muốn xoá key bản quyền"
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
    marginTop: 23,
    marginLeft: 15,
    fontSize: sizes.width * 0.05,
  },
});
