import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import TextInputCustom from '../txtInput/TextInputCustom';
import sizes from '../../res/sizes';
import DoubleButton from '../btn/DoubleButton';
import SelectCustom from '../select/SelectCustom';
import {
  useChangePlansMutation,
  useGetProductsQuery,
} from '../../redux/api/auth.api';
import ErrorText from '../err/ErrorCall';
import SelectProduct from '../select/SelectProduct';
import {chuyenChuoi} from '../../res/convert';
export default function BottomSheetEditService({
  refRBSheet,
  data,
}: {
  refRBSheet: any;
  data?: Plans;
}) {
  const [name, setName] = useState<string>();
  const [errname, setErrName] = useState<string>();

  const [description, setDesCription] = useState<string>();
  const [invoice_period, setInvoicePeriod] = useState<string>();
  const [errinvoice_period, setErrInvoicePeriod] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [errprice, setErrPrice] = useState<string>();
  const [product_id, setProductId] = useState<number>();
  const [errproduct_id, setErrProductId] = useState<string>();
  const [trial_period, settrial_period] = useState<string>();
  const {data: Product} = useGetProductsQuery({
    perPage: 1000,
  });
  const [changePlans, {isLoading: LoadingChange}] = useChangePlansMutation();
  useEffect(() => {
    setName(data?.name);
    setInvoicePeriod(String(data?.invoice_period));
    setPrice(String(data?.price));
    setProductId(data?.product?.id);
    settrial_period(String(data?.trial_period));
    setDesCription(data?.description);
  }, [data]);

  const ChangePlans = async () => {
    try {
      const datass = await changePlans({
        id: data?.id,
        data: {
          description: description,
          invoice_period: Number(invoice_period),
          name: name,
          price: Number(price),
          product_id: product_id,
          tag: chuyenChuoi(name),
          trial_period: Number(trial_period),
          currency: 'VND',
          signup_fee: 0,
          trial_mode: 'inside',
        },
      });
      if (datass) {
        await refRBSheet.current.close();
      }
    } catch (error) {}
    await refRBSheet.current.close();
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
      <Text style={styles.title}>Chỉnh sửa dịch vụ</Text>

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
          {errname && <ErrorText err={errname} />}
          <TextInputCustom
            placeholder="Thời hạn (ngày)"
            numeric
            value={invoice_period}
            setValue={setInvoicePeriod}
          />
          {errinvoice_period && <ErrorText err={errinvoice_period} />}

          <TextInputCustom
            placeholder="Giá"
            numeric
            value={price}
            setValue={setPrice}
          />
          {errprice && <ErrorText err={errprice} />}

          <TextInputCustom
            placeholder="Dùng thử (ngày)"
            numeric
            value={trial_period}
            setValue={settrial_period}
          />
          <SelectProduct
            setSelect={val => setProductId(val?.id)}
            title="Chọn sản phẩm"
            data={Product?.data}
          />
          {errproduct_id && <ErrorText err={errproduct_id} />}
          <TextInputCustom
            placeholder="Mô tả"
            value={description}
            setValue={setDesCription}
          />

          <DoubleButton
            conFirm={ChangePlans}
            loading={LoadingChange}
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
