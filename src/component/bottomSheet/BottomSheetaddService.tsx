import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import TextInputCustom from '../txtInput/TextInputCustom';
import sizes from '../../res/sizes';
import DoubleButton from '../btn/DoubleButton';

import {
  useCreatPlansMutation,
  useGetProductsQuery,
} from '../../redux/api/auth.api';
import {chuyenChuoi} from '../../res/convert';
import SelectProduct from '../select/SelectProduct';
import ToastCustom from '../toastCustom/ToastCustom';
import {ErrorSubs} from '../../res/ErrorSub';
import ErrorText from '../err/ErrorCall';
import {validateService} from '../../res/validate';
export default function BottomSheetaddService({refRBSheet}: {refRBSheet: any}) {
  const [name, setName] = useState<string>();
  const [errname, setErrName] = useState<string>();
  const [description, setDesCription] = useState<string>();
  const [invoice_period, setInvoicePeriod] = useState<string>();
  const [errinvoice_period, setErrInvoicePeriod] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [product_id, setProductId] = useState<number>();
  const [formErr, setFormErr] = useState({
    price: '',
    name: '',
    invoice_period: '',
    product_id: '',
  });
  const {data} = useGetProductsQuery({
    per_page: 1000,
  });
  const [trial_period, settrial_period] = useState<string>();
  const [toast, setToast] = useState('');
  const ToastRef = useRef<any>(null);
  const [creatPlans, {isLoading}] = useCreatPlansMutation();
  const Confirm = async () => {
    try {
      if (name && product_id && invoice_period && price) {
        const datas = await creatPlans({
          currency: 'VND',
          description: description,
          invoice_interval: 'day',
          invoice_period: Number(invoice_period),
          is_active: true,
          name: name,
          price: Number(price),
          product_id: product_id,
          signup_fee: 0,
          tag: chuyenChuoi(name),
          trial_interval: 'day',
          trial_mode: 'inside',
          trial_period: Number(trial_period),
        }).unwrap();
        if (datas) {
          setFormErr({
            invoice_period: '',
            name: '',
            price: '',
            product_id: '',
          });
        }
        setToast('Thêm thành công dịch vụ!');
        await ToastRef.current.toast();
      } else {
        const err = validateService({
          invoice_period: Number(invoice_period),
          name: name,
          price: Number(price),
          product_id: product_id,
        });
        setFormErr({
          invoice_period: err?.invoice_period,
          name: err?.name,
          price: err.price,
          product_id: err?.product_id,
        });
      }
    } catch (error: any) {
      setToast('Thêm thất bại!');
      await ToastRef.current.toast();
      let err = error?.data?.payload?.errors;
      setErrInvoicePeriod(ErrorSubs(err?.invoice_period));
      setErrName(ErrorSubs(err?.tag));
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
      <Text style={styles.title}>Thêm mới dịch vụ</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets>
        <View style={{paddingBottom: 30}}>
          <TextInputCustom
            placeholder="Nhập tên gói"
            value={name}
            setValue={setName}
          />
          {formErr.name && <ErrorText err={formErr.name} />}

          {errname && <ErrorText err={errname} />}
          <TextInputCustom
            placeholder="Thời hạn (ngày)"
            numeric
            value={invoice_period}
            setValue={setInvoicePeriod}
          />
          {errinvoice_period && <ErrorText err={errinvoice_period} />}
          {formErr.invoice_period && <ErrorText err={formErr.invoice_period} />}

          <TextInputCustom
            placeholder="Giá"
            numeric
            value={price}
            setValue={setPrice}
          />
          {formErr.price && <ErrorText err={formErr.price} />}

          <TextInputCustom
            placeholder="Dùng thử (ngày)"
            numeric
            value={trial_period}
            setValue={settrial_period}
          />
          <SelectProduct
            setSelect={val => setProductId(val?.id)}
            title="Chọn sản phẩm"
            data={data?.data}
          />
          {formErr.product_id && <ErrorText err={formErr.product_id} />}
          <TextInputCustom
            placeholder="Mô tả"
            value={description}
            setValue={setDesCription}
          />

          <DoubleButton
            loading={isLoading}
            conFirm={Confirm}
            cancel={async () => await refRBSheet.current.close()}
          />
        </View>
      </ScrollView>
      <ToastCustom ref={ToastRef} val={toast} />
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
