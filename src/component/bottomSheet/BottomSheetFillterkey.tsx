import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import sizes from '../../res/sizes';
import DoubleButton from '../btn/DoubleButton';
import {useGetPlansQuery, useGetProductQuery} from '../../redux/api/auth.api';
import Select from '../select/Select';
import fonts from '../../res/fonts';
import {dataStatus} from '../../res/feckData/dataStatus';
import TextInputCustom from '../txtInput/TextInputCustom';

export default function BottomSheetFillterkey({
  refRBSheet,
  params,
  isLoading,
}: {
  refRBSheet: any;
  params: (val: string) => void;
  isLoading: boolean;
}) {
  const {data: Product} = useGetProductQuery('');

  const [product, setProduct] = useState<string>();
  const [productid, setProductId] = useState<number>();
  const [stattus, setStattus] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [plansId, setPlanId] = useState<number | string>();
  const {data: dataPlans} = useGetPlansQuery({
    option: `?filter[product.name]=${product}`,
  });
  const Confirm = () => {
    const findEmails = email ? `&filter[whereSearch]=${email}` : '';
    const findStatus = stattus ? `&filter[invoices.status]=${stattus}` : '';
    const findProduct = productid ? `&filter[product_id]=${productid}` : '';
    const findPlansid = plansId ? `&filter[plan_id]=${plansId}` : '';
    params(findEmails + findStatus + findProduct + findPlansid);
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
          height: sizes.height * 0.55,
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
              setProduct(val?.name);
              setProductId(val?.id);
            }}
            data={Product?.data}
            defaultButtonText="Chọn sản phẩm"
            icons={product ? 'close-circle' : ''}
            onPressIcon={() => {
              setProduct('');
            }}
            holder="Chọn sản phẩm"
            select={product}
          />
          <Select
            setSelect={val => {
              setPlanId(val?.id);
            }}
            data={dataPlans?.data}
            defaultButtonText="Chọn gói bản quyền"
            icons={plansId ? 'close-circle' : ''}
            onPressIcon={() => setPlanId('')}
            disabled={product ? false : true}
            holder="Chọn gói bản quyền"
            select={plansId}
          />
          <Select
            setSelect={val => {
              setStattus(val?.params);
            }}
            data={dataStatus}
            defaultButtonText="Chọn trạng thái"
            icons={stattus ? 'close-circle' : ''}
            onPressIcon={() => setStattus('')}
            holder="Chọn trạng thái"
            select={stattus}
          />
          <TextInputCustom
            value={email}
            setValue={setEmail}
            placeholder="Tìm kiếm theo email hoặc mã kích hoạt"
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
