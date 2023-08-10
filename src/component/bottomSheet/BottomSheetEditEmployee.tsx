import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import TextInputCustom from '../txtInput/TextInputCustom';
import sizes from '../../res/sizes';
import DoubleButton from '../btn/DoubleButton';
import SelectCustom from '../select/SelectCustom';
export default function BottomSheetEditEmployee({
  refRBSheet,
}: {
  refRBSheet: any;
}) {
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
      <Text style={styles.title}>Chỉnh sửa nhân viên</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        // bounces={false}
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets>
        <View style={{paddingBottom: 30}}>
          <SelectCustom title="Chi nhánh" />
          <SelectCustom title="Đội nhóm" />
          <SelectCustom title="Vai trò" />
          <TextInputCustom placeholder="Họ và đệm" />
          <TextInputCustom placeholder="Tên" />
          <TextInputCustom placeholder="Email" />
          <TextInputCustom placeholder="Số điện thoại" />
          <SelectCustom title="Trạng thái" />
          <TextInputCustom placeholder="Mật khẩu mới" />

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
