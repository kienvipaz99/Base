import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import TextInputCustom from '../txtInput/TextInputCustom';
import sizes from '../../res/sizes';
import DoubleButton from '../btn/DoubleButton';
export default function BottomSheetClient({refRBSheet}: {refRBSheet: any}) {
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
          height: sizes.height * 0.7,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 20,
        },
      }}>
      <Text style={styles.title}>Thêm khách hàng</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        // bounces={false}
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets>
        <View style={{paddingBottom: 30}}>
          <TextInputCustom placeholder="Nhập họ và tên đệm" />
          <TextInputCustom placeholder="Tên khách hàng" />
          <TextInputCustom placeholder="Email khách hàng" />
          <TextInputCustom placeholder="Số điện thoại" />
          <TextInputCustom placeholder="Mật khẩu" />
          <TextInputCustom placeholder="Xác nhận mật khẩu" />
          <DoubleButton
            conFirm={() => refRBSheet.current.close()}
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
