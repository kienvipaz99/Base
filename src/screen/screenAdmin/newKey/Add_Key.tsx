import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import stylesCustom from '../../../res/stylesCustom';
import HeaderCustom from '../../../component/header/HeaderCustom';
import {colors} from '../../../res/colors';
import TextInputCustom from '../../../component/txtInput/TextInputCustom';
import SelectCustom from '../../../component/select/SelectCustom';
import BTNLogin from '../../../component/btn/BTNLogin';
import BottomSheetClient from '../../../component/bottomSheet/BottomSheetClient';
import BottomSheetBank from '../../../component/bottomSheet/BottomSheetBank';
import {
  useGetBankQuery,
  useGetPlansQuery,
  useGetProductQuery,
} from '../../../redux/api/auth.api';
import SelectItemBank from '../../../component/select/SelectItemBank';
import SelectProduct from '../../../component/select/SelectProduct';
import {money} from '../../../res/convert';

const Add_Key = () => {
  const refRBSheet = useRef<any>();
  const refRBSheetBank = useRef<any>();
  const {data: dataBank} = useGetBankQuery('');
  const {data: dataProduct} = useGetProductQuery('');
  const {data: dataPlans} = useGetPlansQuery('');
  const [price, setPrice] = useState('');
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
            <TextInputCustom
              placeholder="Tên khách hàng"
              add
              nameIcon="user-plus"
              onPressIcon={() => refRBSheet.current.open()}
            />
            <TextInputCustom placeholder="Mã khách hàng" />
            <TextInputCustom placeholder="Email khách hàng" />
            <TextInputCustom placeholder="Số điện thoại" />
            <Text style={styles.txt}>Nâng cao</Text>
            <SelectProduct
              title="Chọn phần mềm"
              setSelect={val => console.log(val)}
              data={dataProduct?.data}
            />
            <SelectProduct
              title="Chọn gói bản quyền"
              setSelect={val => setPrice(String(money(val?.price)))}
              data={dataPlans?.data}
            />
            <TextInputCustom placeholder="Mã máy" />
            <Text style={styles.txt}>Nội dung thanh toán</Text>
            <TextInputCustom
              placeholder="Giá phần mềm"
              editable
              value={price}
            />
            <TextInputCustom placeholder="Khuyễn mãi" numeric />
            <SelectItemBank
              data={dataBank?.data}
              setSelect={val => console.log(val)}
              onPressIcon={() => refRBSheetBank.current.open()}
            />
            <TextInputCustom placeholder="Nội dung chuyển khoản" />
            <TextInputCustom placeholder="Ghi chú" />
            <BTNLogin
              onPress={() => {}}
              title="Lưu"
              styleProps={{marginTop: 30}}
            />
          </View>
        </ScrollView>
      </View>
      <BottomSheetClient refRBSheet={refRBSheet} />
      <BottomSheetBank refRBSheet={refRBSheetBank} />
    </View>
  );
};

export default Add_Key;

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
