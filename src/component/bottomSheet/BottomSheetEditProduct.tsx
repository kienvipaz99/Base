import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import TextInputCustom from '../txtInput/TextInputCustom';
import sizes from '../../res/sizes';
import DoubleButton from '../btn/DoubleButton';
import {useEditProductMutation} from '../../redux/api/auth.api';
import {chuyenChuoi} from '../../res/convert';
import ToastCustom from '../toastCustom/ToastCustom';
import ModalAddLog from '../modal/ModalAddLog';
export default function BottomSheetEditProduct({
  refRBSheet,
  data,
}: {
  refRBSheet: any;
  data?: Product;
}) {
  const [editProduct, {isLoading}] = useEditProductMutation();
  const [prefix_key, setPrefix_key] = useState<string>();
  const ToastRef = useRef<any>(null);
  const [toast, setToast] = useState('');

  const [name, setName] = useState<string>();
  const [version, setVersion] = useState<string>();
  const [url, setUrl] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setName(data?.name);
    setUrl(data?.url);
    setDescription(data?.description);
    setVersion(data?.version);
    setPrefix_key(data?.prefix_key);
  }, [data]);
  const Confirm = async () => {
    try {
      const datas = await editProduct({
        id: data?.id,
        data: {
          description: description,
          name: name,
          slug: chuyenChuoi(name),
          url: url,
          version: version,
        },
      }).unwrap();
      if (data) {
        setToast('Chỉnh sửa thành công');
        await ToastRef.current.toast();
      }
    } catch (error) {
      setToast('Chỉnh sửa thất bại công');
      await ToastRef.current.toast();
    }
  };
  return (
    //@ts-ignore
    <RBSheet
      ref={refRBSheet}
      animationType="fade"
      keyboardAvoidingViewEnabled={false}
      closeOnDragDown={true}
      closeOnPressMask={false}
      dragFromTopOnly={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.3)',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
        container: {
          height: sizes.height * 0.6,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 20,
        },
      }}>
      <Text style={styles.title}>Chỉnh sửa sản phẩm</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets>
        <View style={{paddingBottom: 30}}>
          <TextInputCustom
            placeholder="Mã SP"
            value={prefix_key}
            setValue={setPrefix_key}
            editable
          />
          <TextInputCustom
            placeholder="Tên SP"
            value={name}
            setValue={setName}
          />
          <TextInputCustom
            placeholder="Nhập phiên bản"
            add
            nameIcon="plus-circle"
            value={version}
            setValue={setVersion}
            onPressIcon={() => setShowModal(true)}
          />
          <TextInputCustom
            placeholder="Nhập đường dẫn"
            value={url}
            setValue={setUrl}
          />
          <TextInputCustom
            placeholder="Mô tả"
            multiline
            styleView={{height: 100, padding: 10}}
            value={description}
            setValue={setDescription}
          />
          <DoubleButton
            conFirm={Confirm}
            loading={isLoading}
            cancel={async () => await refRBSheet.current.close()}
          />
        </View>
      </ScrollView>
      <ToastCustom ref={ToastRef} val={toast} />
      <ModalAddLog
        data={val => {
          setVersion(val?.version);
        }}
        id={data?.id}
        isShow={showModal}
        toggleDate={() => {
          setShowModal(false);
        }}
        refetch={() => {}}
      />
    </RBSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    ...stylesCustom.txtTitle1,
    color: colors.text,
    alignSelf: 'center',
  },
});
