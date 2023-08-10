import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import TextInputCustom from '../txtInput/TextInputCustom';
import sizes from '../../res/sizes';
import DoubleButton from '../btn/DoubleButton';
export default function BottomSheetaddProduct({refRBSheet}: {refRBSheet: any}) {
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
      <Text style={styles.title}>Thêm mới sản phẩm</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets>
        <View style={{paddingBottom: 30}}>
          <TextInputCustom placeholder="Mã SP" />
          <TextInputCustom placeholder="Tên SP" />
          <TextInputCustom placeholder="Nhập phiên bản" />
          <TextInputCustom placeholder="Nhập đường dẫn" />
          <TextInputCustom placeholder="Mô tả" />
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
