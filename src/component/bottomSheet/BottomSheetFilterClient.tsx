import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import sizes from '../../res/sizes';
import DoubleButton from '../btn/DoubleButton';
import {useGetEmployeeQuery} from '../../redux/api/auth.api';
import Select from '../select/Select';
import fonts from '../../res/fonts';

import TextInputCustom from '../txtInput/TextInputCustom';

export default function BottomSheetFilterClient({
  refRBSheet,
  params,
  isLoading,
}: {
  refRBSheet: any;
  params: (val: string) => void;
  isLoading: boolean;
}) {
  const {data: Employee} = useGetEmployeeQuery({
    per_page: -1,
  });

  const [email, setEmail] = useState<string>();
  const [emailClient, setEmailClient] = useState<string>();

  const Confirm = () => {
    const findEmails = email ? `&filter[sales.email]=${email}` : '';
    const findEmailClient = emailClient ? `&filter[email]=${emailClient}` : '';
    params(findEmails + findEmailClient);
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
          height: sizes.height * 0.4,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 20,
        },
      }}>
      <Text style={styles.title}>Áp dụng bộ lọc</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets>
        <View style={{paddingBottom: 30}}>
          <Select
            setSelect={val => {
              setEmail(val?.email);
            }}
            data={Employee?.data}
            defaultButtonText="Chọn nhân viên"
            icons={email ? 'close-circle' : ''}
            onPressIcon={() => {
              setEmail('');
            }}
            holder="Chọn nhân viên"
            select={email}
          />

          <TextInputCustom
            value={emailClient}
            setValue={setEmailClient}
            placeholder="Tìm kiếm theo email khách hàng"
          />
          <DoubleButton
            loading={isLoading}
            conFirm={Confirm}
            cancel={async () => await refRBSheet.current.close()}
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
  txt: {
    width: sizes.width * 0.9,
    alignSelf: 'center',
    marginTop: 15,
    color: colors.text,
    fontFamily: fonts.Regula,
    fontSize: sizes.width * 0.04,
  },
  calenda: {
    width: sizes.width * 0.9,
    height: 50,
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.gray2,
    paddingHorizontal: 10,
    marginTop: 15,
    ...stylesCustom.row,
  },
  txt1: {
    color: colors.text,
    fontFamily: fonts.Regula,
    fontSize: sizes.width * 0.04,
  },
});
