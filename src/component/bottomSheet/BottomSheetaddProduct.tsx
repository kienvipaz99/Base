import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import TextInputCustom from '../txtInput/TextInputCustom';
import sizes from '../../res/sizes';
import DoubleButton from '../btn/DoubleButton';
import {useCreatProductMutation} from '../../redux/api/auth.api';
import {chuyenChuoi} from '../../res/convert';
import ToastCustom from '../toastCustom/ToastCustom';
import {ErrorSubs} from '../../res/ErrorSub';
import ErrorText from '../err/ErrorCall';
export default function BottomSheetaddProduct({
  refRBSheet,
  reload,
}: {
  refRBSheet: any;
  reload: () => void;
}) {
  const ToastRef = useRef<any>(null);

  const [CreatProduct, {isLoading}] = useCreatProductMutation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [prefix_key, setPrefix_key] = useState('');
  const [url, setUrl] = useState('');
  const [version, setVersion] = useState('');
  const [err, setErr] = useState('');
  const [errName, setErrName] = useState('');
  const [errprefix_key, setErrPrefix_key] = useState('');

  const OnCreat = async () => {
    try {
      await CreatProduct({
        description: description,
        name: name,
        slug: chuyenChuoi(name),
        prefix_key: prefix_key,
        url: url,
        status: 1,
        version: version,
      }).unwrap();

      setErr('Thêm thành công sản phẩm');
      reload();
      await ToastRef.current.toast();
    } catch (error: any) {
      let err = error?.data?.payload?.errors;
      setErrPrefix_key(ErrorSubs(err?.prefix_key));
      setErrName(ErrorSubs(err?.name));
      if (err?.slug == 'The slug has already been taken.') {
        setErrName(ErrorSubs(err?.slug));
      }
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
      <Text style={styles.title}>Thêm mới sản phẩm</Text>

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
          />
          {errprefix_key && <ErrorText err={errprefix_key} />}
          <TextInputCustom
            placeholder="Tên SP"
            value={name}
            setValue={setName}
          />
          {errName && <ErrorText err={errName} />}
          <TextInputCustom
            placeholder="Nhập phiên bản"
            value={version}
            setValue={setVersion}
          />

          <TextInputCustom
            placeholder="Nhập đường dẫn"
            value={url}
            setValue={setUrl}
          />
          <TextInputCustom
            placeholder="Mô tả"
            value={description}
            multiline
            styleView={{height: 100, padding: 10}}
            setValue={setDescription}
          />
          <DoubleButton
            loading={isLoading}
            conFirm={OnCreat}
            cancel={async () => await refRBSheet.current.close()}
          />
        </View>
      </ScrollView>
      <ToastCustom ref={ToastRef} val={err} />
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
