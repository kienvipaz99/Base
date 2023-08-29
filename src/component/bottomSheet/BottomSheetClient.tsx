import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import TextInputCustom from '../txtInput/TextInputCustom';
import sizes from '../../res/sizes';
import DoubleButton from '../btn/DoubleButton';
import {useCreatUserMutation, useGetUserQuery} from '../../redux/api/auth.api';
import ToastCustom from '../toastCustom/ToastCustom';
import {ErrorSubs} from '../../res/ErrorSub';
import ErrorText from '../err/ErrorCall';
export default function BottomSheetClient({refRBSheet}: {refRBSheet: any}) {
  const [last_name, setLast_name] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [errlast_name, setErrLast_name] = useState('');
  const [errfirst_name, setErrFirst_name] = useState('');
  const [erremail, setErrEmail] = useState('');
  const [errpassword, setErrPassword] = useState('');
  const [createUser, {isLoading}] = useCreatUserMutation();
  const {refetch} = useGetUserQuery({
    option: 'filter[customer]=CUSTOMER',
  });
  const [err, setErr] = useState('');
  const ToastRef = useRef<any>(null);

  const Summit = async () => {
    try {
      const dataUser = await createUser({
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: password,
        password_confirmation: password_confirmation,
        user_type: 'CUSTOMER',
      }).unwrap();
      if (dataUser) {
        refetch();
        setErr('Thêm thành công ');
        await ToastRef.current.toast();
      }
    } catch (error: any) {
      let err = error?.data?.payload?.errors;
      console.log(error);
      setErrFirst_name(err?.first_name);
      setErrLast_name(err?.last_name);
      setErrEmail(err?.email);
      setErrPassword(err?.password);
      setErr('Thêm thất bại');
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
        wrapper: styles.wrapper,
        draggableIcon: styles.draggableIcon,
        container: styles.container,
      }}>
      <Text style={styles.title}>Thêm khách hàng</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets>
        <View style={{paddingBottom: 30}}>
          <TextInputCustom
            placeholder="Nhập họ và tên đệm"
            value={last_name}
            setValue={setLast_name}
          />
          {errlast_name && <ErrorText err={ErrorSubs(errlast_name)} />}
          <TextInputCustom
            placeholder="Tên khách hàng"
            value={first_name}
            setValue={setFirst_name}
          />
          {errfirst_name && <ErrorText err={ErrorSubs(errfirst_name)} />}

          <TextInputCustom
            placeholder="Email khách hàng"
            value={email}
            setValue={setEmail}
          />
          {erremail && <ErrorText err={ErrorSubs(erremail)} />}

          <TextInputCustom
            placeholder="Số điện thoại"
            value={phone}
            setValue={setPhone}
          />
          <TextInputCustom
            placeholder="Mật khẩu"
            value={password}
            setValue={setPassword}
          />
          {errpassword && <ErrorText err={ErrorSubs(errpassword)} />}

          <TextInputCustom
            placeholder="Xác nhận mật khẩu"
            value={password_confirmation}
            setValue={setPassword_confirmation}
          />
          <DoubleButton
            conFirm={Summit}
            loading={isLoading}
            cancel={async () => await refRBSheet.current.close()}
          />
        </View>
        <ToastCustom ref={ToastRef} val={err} />
      </ScrollView>
    </RBSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    ...stylesCustom.txtTitle1,
    color: colors.text,
    alignSelf: 'center',
  },
  container: {
    height: sizes.height * 0.7,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  draggableIcon: {
    backgroundColor: '#000',
  },
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
