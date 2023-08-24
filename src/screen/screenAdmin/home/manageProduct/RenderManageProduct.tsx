import {
  Image,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '../../../../res/colors';
import fonts from '../../../../res/fonts';
import sizes from '../../../../res/sizes';
import stylesCustom from '../../../../res/stylesCustom';
import images from '../../../../res/images';
import ModalConfirm from '../../../../component/modal/ModalConfirm';
import BottomSheetEditProduct from '../../../../component/bottomSheet/BottomSheetEditProduct';
import {maxlengText} from '../../../../res/convert';
import {useDeleteProductMutation} from '../../../../redux/api/auth.api';

const RenderManageProduct = ({item}: {item: Product}) => {
  const [showView, setShowView] = useState(false);
  const [show, setShow] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();
  const OnDelete = async (id: number) => {
    try {
      deleteProduct({
        id: id,
      });
    } catch (error) {}
  };
  const PressShow = () => setShowView(!showView);
  useEffect(() => {
    const toggle = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };
    toggle();
  }, [showView]);
  let headerStyle = Object.assign({}, styles.view);
  if (!showView) {
    headerStyle;
  }
  const refBootomSheet = useRef<any>(null);

  return (
    <Pressable style={styles.view} onPress={PressShow}>
      <View style={stylesCustom.row}>
        <Text style={styles.txt1}>Tên SP: {item.name}</Text>
        <View
          style={[
            styles.status,
            {backgroundColor: item.status ? colors.green : colors.red},
          ]}
        />
      </View>
      <View style={stylesCustom.row}>
        <View>
          <Text style={styles.txt2}>Mã SP: {item?.slug}</Text>
          <Text style={styles.txt2}>Ngày tạo: {item?.created_at}</Text>
          <Text style={styles.txt2}>Mã PB: {item?.version}</Text>
          <Text style={styles.txt2}>
            Mô tả:{' '}
            {showView ? item?.description : maxlengText(item?.description)}
          </Text>
        </View>
        <View style={{justifyContent: 'space-around', height: 70}}>
          <Pressable
            onPress={() => {
              OnDelete(item?.id);
              refBootomSheet.current.open();
            }}>
            <Image source={images.pen} />
          </Pressable>
          <Pressable onPress={() => setShow(true)}>
            <Image source={images.bin} />
          </Pressable>
        </View>
      </View>
      <BottomSheetEditProduct refRBSheet={refBootomSheet} />
      <ModalConfirm
        isShow={show}
        toggleDate={() => setShow(false)}
        title="Bạn có muốn xoá sản phẩm"
      />
    </Pressable>
  );
};

export default RenderManageProduct;

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
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
  },
});
