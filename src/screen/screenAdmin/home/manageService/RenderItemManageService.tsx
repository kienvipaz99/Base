import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {colors} from '../../../../res/colors';
import fonts from '../../../../res/fonts';
import sizes from '../../../../res/sizes';
import stylesCustom from '../../../../res/stylesCustom';
import images from '../../../../res/images';
import ModalConfirm from '../../../../component/modal/ModalConfirm';
import BottomSheetEditService from '../../../../component/bottomSheet/BottomSheetEditService';
import {useDeletePlansMutation} from '../../../../redux/api/auth.api';
import ToastCustom from '../../../../component/toastCustom/ToastCustom';
import {money} from '../../../../res/convert';

const RenderItemManageService = ({item}: {item: Plans}) => {
  const refBootomSheet = useRef<any>(null);
  const [show, setShow] = useState(false);
  const [id, setId] = useState<number>();
  const [toast, setToast] = useState('');
  const ToastRef = useRef<any>(null);
  const [data, setData] = useState<Plans>();
  const [deletePlans, {isLoading}] = useDeletePlansMutation();
  const Delete = async () => {
    try {
      await deletePlans({
        id: id,
      }).unwrap();
      setToast('Xoá thành công!');
      await ToastRef.current.toast();
    } catch (error) {
      setToast('Xoá thất bại!');
      await ToastRef.current.toast();
    }
  };

  return (
    <View style={styles.view}>
      <View style={stylesCustom.row}>
        <Text style={styles.txt1}>Tên gói: {item?.name}</Text>
        <View
          style={[
            styles.status,
            {backgroundColor: item?.is_active ? colors.green : colors.red},
          ]}
        />
      </View>
      <View style={stylesCustom.row}>
        <View>
          <Text style={styles.txt2}>Giá: {money(item?.price)}</Text>
          <Text style={styles.txt2}>Thời hạn: {item?.invoice_period} Ngày</Text>
          <Text style={styles.txt2}>Sản phẩm: {item?.product?.name}</Text>
        </View>
        <View style={{justifyContent: 'space-around', height: 70}}>
          <Pressable
            onPress={() => {
              setData(item);
              refBootomSheet.current.open();
            }}>
            <Image source={images.pen} />
          </Pressable>
          <Pressable
            onPress={() => {
              setId(item?.id);
              setShow(true);
            }}>
            <Image source={images.bin} />
          </Pressable>
        </View>
      </View>
      <ToastCustom ref={ToastRef} val={toast} />
      <BottomSheetEditService refRBSheet={refBootomSheet} data={data} />
      <ModalConfirm
        isShow={show}
        toggleDate={() => setShow(false)}
        title="Bạn có muốn xoá khách hàng"
        confirm={Delete}
        isLoading={isLoading}
      />
    </View>
  );
};

export default RenderItemManageService;

const styles = StyleSheet.create({
  fl: {marginBottom: 20, paddingBottom: 40},
  txt1: {
    color: colors.text,
    fontFamily: fonts.Medium,
    fontSize: 16,
    width: sizes.width * 0.75,
  },
  txt2: {
    color: colors.text,
    fontFamily: fonts.Regula,
    fontSize: 15,
    width: sizes.width * 0.75,
  },
  status: {
    height: 15,
    width: 15,
    borderRadius: 10,
  },
  view: {
    width: sizes.width * 0.9,
    ...stylesCustom.shadowitem,
    backgroundColor: colors.white,
    alignSelf: 'center',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
  },
});
