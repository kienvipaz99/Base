import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AlertOptions,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import TextInputCustom from '../txtInput/TextInputCustom';
import sizes from '../../res/sizes';
import DoubleButton from '../btn/DoubleButton';
import {
  useCreatBankMutation,
  useGetBankQuery,
  useGetBankingQuery,
} from '../../redux/api/auth.api';
import SelectBank from '../select/SelectBank';
import ToastCustom from '../toastCustom/ToastCustom';
import ErrorText from '../err/ErrorCall';
import {ErrorSubs} from '../../res/ErrorSub';
export default function BottomSheetBank({
  refRBSheet,
  refetch,
}: {
  refRBSheet: any;
  refetch: () => void;
}) {
  const [nameAcount, setNameAcount] = useState('');
  const [numberBank, setNumberBank] = useState('');
  const [nameBank, setNameBank] = useState('');
  const [short_name, setShort_name] = useState('');
  const [code, setCode] = useState('');
  const [branch, setBranch] = useState('');
  const [errnameAcount, setErrNameAcount] = useState('');
  const [errnumberBank, setErrNumberBank] = useState('');
  const [errnameBank, setErrNameBank] = useState('');
  const [errbranch, setErrBranch] = useState('');
  const [Bank, {isLoading}] = useCreatBankMutation();
  const {data: ListBank} = useGetBankingQuery('');

  const ToastRef = useRef<any>(null);

  const AddBank = async () => {
    try {
      await Bank({
        account_holder: nameAcount,
        account_number: numberBank,
        name_bank: nameBank,
        short_name: short_name,
        code: code,
        branch: branch,
      }).unwrap();
      await ToastRef.current.toast();
      await refetch();
      await refRBSheet.current.close();
    } catch (error: any) {
      let erros = error.data.payload.errors;
      setErrNameAcount(erros?.account_holder);
      setErrNumberBank(erros?.account_number);
      setErrNameBank(erros?.name_bank);
      setErrBranch(erros?.branch);
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
      <Text style={styles.title}>Thêm ngân hàng</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets>
        <View style={{paddingBottom: 30}}>
          <TextInputCustom
            placeholder="Chủ tài khoản"
            value={nameAcount}
            setValue={setNameAcount}
          />
          {errnameAcount && <ErrorText err={ErrorSubs(errnameAcount)} />}
          <TextInputCustom
            placeholder="Nhập số tài khoản"
            value={numberBank}
            setValue={setNumberBank}
          />
          {errnumberBank && <ErrorText err={ErrorSubs(errnumberBank)} />}
          <SelectBank
            setSelect={(val: Banking) => {
              setCode(val?.code);
              setNameBank(val?.name);
              setShort_name(val?.short_name);
            }}
            data={ListBank?.data}
          />
          {errnameBank && <ErrorText err={ErrorSubs(errnameBank)} />}

          <TextInputCustom
            placeholder="Chi nhánh"
            value={branch}
            setValue={setBranch}
          />
          {errbranch && <ErrorText err={ErrorSubs(errbranch)} />}

          <DoubleButton
            loading={isLoading}
            conFirm={() => {
              AddBank();
            }}
            cancel={() => refRBSheet.current.close()}
          />
        </View>
      </ScrollView>
      <ToastCustom ref={ToastRef} val={'Tạo tài khoản ngân hàng thành công'} />
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
