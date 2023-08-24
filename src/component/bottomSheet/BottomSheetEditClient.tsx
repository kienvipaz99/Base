import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import TextInputCustom from '../txtInput/TextInputCustom';
import sizes from '../../res/sizes';
import DoubleButton from '../btn/DoubleButton';
import {useChangeUserMutation} from '../../redux/api/auth.api';
import SelectStatusUser from '../select/SelectStatusUser';
export default function BottomSheetEditClient({
  refRBSheet,
  item,
}: {
  refRBSheet: any;

  item: itemManage | undefined;
}) {
  const [password, setPassWord] = useState<string>();
  const [phone, setPhone] = useState<string | undefined>('');
  const [status, setStatus] = useState<boolean>();
  const [email, setEmail] = useState<string | undefined>('');
  const [first_name, setFirst_Name] = useState<string | undefined>('');
  const [last_name, setLast_Name] = useState<string | undefined>('');
  useEffect(() => {
    setPhone(item?.phone);
    setEmail(item?.email);
    setFirst_Name(item?.first_name);
    setLast_Name(item?.last_name);
    setStatus(item?.status);
  }, [item]);

  const [ChangeUser, {isLoading}] = useChangeUserMutation();

  const Submit = async () => {
    try {
      const datas = await ChangeUser({
        id: item?.id,
        data: {
          password: password,
          password_confirmation: password,
          phone: phone,
          status: status,
          email: email,
          first_name: first_name,
          last_name: last_name,
          user_type: 'CUSTOMER',
        },
      }).unwrap();
      console.log(datas);
    } catch (error: any) {
      console.log(error.data.payload.errors);
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
      <Text style={styles.title}>Chỉnh sửa khách hàng</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets>
        <View style={{paddingBottom: 30}}>
          <TextInputCustom
            placeholder="Họ và đệm"
            value={last_name}
            setValue={setLast_Name}
          />
          <TextInputCustom
            placeholder="Tên"
            value={first_name}
            setValue={setFirst_Name}
          />
          <TextInputCustom
            placeholder="Email"
            value={email}
            setValue={setEmail}
          />
          <TextInputCustom
            placeholder="Số điện thoại"
            value={phone}
            setValue={setPhone}
          />
          <SelectStatusUser
            setSelect={val => {
              setStatus(val?.status);
            }}
            select={status}
          />
          <TextInputCustom
            placeholder="Mật khẩu mới"
            value={password}
            setValue={setPassWord}
          />

          <DoubleButton
            loading={isLoading}
            conFirm={Submit}
            cancel={() => refRBSheet.current.close()}
          />
        </View>
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
});
