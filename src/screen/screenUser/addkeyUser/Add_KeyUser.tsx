import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import stylesCustom from '../../../res/stylesCustom';
import HeaderCustom from '../../../component/header/HeaderCustom';
import {colors} from '../../../res/colors';
import TextInputCustom from '../../../component/txtInput/TextInputCustom';
import BTNLogin from '../../../component/btn/BTNLogin';
import BottomSheetClient from '../../../component/bottomSheet/BottomSheetClient';
import BottomSheetBank from '../../../component/bottomSheet/BottomSheetBank';
import {
  useCreatInvoicesMutation,
  useGetBankQuery,
  useGetPlansQuery,
  useGetProductQuery,
} from '../../../redux/api/auth.api';
import SelectItemBank from '../../../component/select/SelectItemBank';
import SelectProduct from '../../../component/select/SelectProduct';
import {money} from '../../../res/convert';
import SelectUser from '../../../component/select/SelectUser';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import {Profile} from '../../../redux/type/Auth';
import Loading from '../../../component/loading/Loading';
import ToastCustom from '../../../component/toastCustom/ToastCustom';

const Add_KeyUser = () => {
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const profile = useAppSelect(data => data?.getProfile?.getProfile) as Profile;
  const ToastRef = useRef<any>(null);
  const refRBSheet = useRef<any>();
  const refRBSheetBank = useRef<any>();
  const [userId, setUserId] = useState<number>();
  const [his, setHis] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [discount, setDiscount] = useState<number>(0);
  const [nameProduct, setNameProduct] = useState<string>();
  const [product_id, setProduct_id] = useState<number>();
  const [total, setTotal] = useState<number>(0);
  const [plan_id, setPlan_id] = useState<number>();
  const [content_bank, setContent_Bank] = useState('');
  const [bank_id, setbank_id] = useState<number>();
  const [note, setNote] = useState('');
  const {data: dataBank, refetch} = useGetBankQuery('');
  const {data: dataProduct} = useGetProductQuery('');
  const {data: dataPlans} = useGetPlansQuery({
    option: `?filter[product.name]=${nameProduct}`,
  });
  const [price, setPrice] = useState(0);
  const [createInvoid, {isLoading}] = useCreatInvoicesMutation();
  const [toast, setToast] = useState('');
  let checkSumit = () => {
    if (userId && product_id && plan_id && his && bank_id && content_bank) {
      return true;
    } else {
      return false;
    }
  };

  const Submit = async () => {
    try {
      const Create = await createInvoid({
        subscriber_id: userId,
        user_id: profile?.data?.id,
        product_id: product_id,
        plan_id: plan_id,
        his: his,
        code: '1',
        discount: discount,
        total: total,
        note: note,
        bank_id: bank_id,
        status: 'UNPAID',
        bank_memo: content_bank,
      }).unwrap();
      if (Create) {
        setToast('Tạo key thành công ');
        await ToastRef.current.toast();
      }
    } catch (error: any) {
      let err = error;

      setToast('Tạo key thất bại');
      await ToastRef.current.toast();
    }
  };
  return (
    <View style={styles.view}>
      <HeaderCustom title="Thêm mới key" />
      <View style={stylesCustom.view1}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          automaticallyAdjustKeyboardInsets>
          <View style={{marginBottom: 50}}>
            <Text style={styles.txt}>Thông tin</Text>
            <SelectUser
              setSelect={(val: GetUser) => {
                setUserId(val?.id);
                setEmail(val?.email);
                setPhone(val?.phone);
              }}
              onPressIcon={() => refRBSheet.current.open()}
            />
            <TextInputCustom
              placeholder="Email khách hàng"
              value={email}
              editable
            />
            <TextInputCustom
              placeholder="Số điện thoại"
              value={phone}
              editable
            />
            <Text style={styles.txt}>Nâng cao</Text>
            <SelectProduct
              title="Chọn phần mềm"
              setSelect={val => {
                setNameProduct(val?.name);
                setProduct_id(val?.id);
              }}
              data={dataProduct?.data}
            />
            <SelectProduct
              show={nameProduct ? false : true}
              title="Chọn gói bản quyền"
              setSelect={val => {
                setPrice(Number(val?.price));
                setPlan_id(val?.id);
                setTotal(Number(val?.price));
              }}
              data={dataPlans?.data}
            />
            <TextInputCustom
              placeholder="Mã máy"
              value={his}
              setValue={setHis}
            />
            <Text style={styles.txt}>Nội dung thanh toán</Text>
            <TextInputCustom
              placeholder="Giá phần mềm"
              editable
              value={String(money(price))}
            />
            <TextInputCustom
              placeholder="Khuyễn mãi"
              numeric
              value={discount.toString()}
              setValue={val => {
                setDiscount(Number(val));
                setTotal(price - Number(val));
              }}
            />
            <TextInputCustom
              placeholder="Tổng tiền"
              numeric
              editable
              value={String(money(total))}
            />
            <SelectItemBank
              showIcon={false}
              data={dataBank?.data}
              setSelect={val => setbank_id(val.id)}
              onPressIcon={() => refRBSheetBank.current.open()}
            />
            <TextInputCustom
              placeholder="Nội dung chuyển khoản"
              value={content_bank}
              setValue={setContent_Bank}
            />
            <TextInputCustom
              placeholder="Ghi chú"
              value={note}
              setValue={setNote}
            />
            <BTNLogin
              onPress={() => {
                checkSumit() ? Submit() : undefined;
              }}
              title="Lưu"
              styleProps={{
                marginTop: 30,
                backgroundColor: checkSumit() ? colors.blue : '#bdcdeb',
              }}
            />
          </View>
        </ScrollView>
      </View>
      <BottomSheetClient refRBSheet={refRBSheet} />
      <BottomSheetBank refRBSheet={refRBSheetBank} refetch={refetch} />
      {isLoading && <Loading />}
      <ToastCustom ref={ToastRef} val={toast} />
    </View>
  );
};

export default Add_KeyUser;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },

  txt: {
    ...stylesCustom.txtTitle,
    color: colors.text,
    marginTop: 23,
    marginLeft: 15,
  },
});
