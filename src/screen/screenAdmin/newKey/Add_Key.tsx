import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import stylesCustom from '../../../res/stylesCustom';
import HeaderCustom from '../../../component/header/HeaderCustom';
import {colors} from '../../../res/colors';
import TextInputCustom from '../../../component/txtInput/TextInputCustom';
import SelectCustom from '../../../component/select/SelectCustom';
import BTNLogin from '../../../component/btn/BTNLogin';
import BottomSheetClient from '../../../component/bottomSheet/BottomSheetClient';
import BottomSheetBank from '../../../component/bottomSheet/BottomSheetBank';
import sizes from '../../../res/sizes';

const Add_Key = () => {
  const refRBSheet = useRef<any>();
  const refRBSheetBank = useRef<any>();

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
            <SelectCustom title="Chọn phần mềm" />
            <SelectCustom title="Chọn gói bản quyền" />
            <TextInputCustom placeholder="Mã máy" />
            <Text style={styles.txt}>Nội dung thanh toán</Text>
            <SelectCustom title="Giá phần mềm" />
            <TextInputCustom placeholder="Khuyễn mãi" />
            <SelectCustom
              title="Thanh toán"
              add
              nameIcon="logo-usd"
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
