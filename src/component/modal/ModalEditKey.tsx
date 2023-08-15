import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import sizes from '../../res/sizes';
import fonts from '../../res/fonts';
import {colors} from '../../res/colors';
import stylesCustom from '../../res/stylesCustom';
interface Props {
  isShow?: boolean;
  toggleDate?: () => void;
}
const ModalEditKey = (props: Props) => {
  const renderContent = () => {
    return (
      <View style={styles.content}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>Chỉnh sửa mã máy</Text>
          <TextInput style={styles.view} placeholder="Nhập mã máy" />
          <View style={styles.view1}>
            <TouchableOpacity
              onPress={props.toggleDate}
              style={[styles.btn, {backgroundColor: colors.blue}]}>
              <Text style={[styles.txt, {color: colors.white}]}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.toggleDate}
              style={[styles.btn, {backgroundColor: colors.gray2}]}>
              <Text style={[styles.txt, {color: colors.text}]}>Huỷ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Modal
        visible={props.isShow}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}>
        <View style={styles.container1}>
          <TouchableWithoutFeedback>
            <View style={{zIndex: 0, flex: 1, height: '100%', width: '100%'}} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>{renderContent()}</View>
        </View>
      </Modal>
    </View>
  );
};
export default ModalEditKey;
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: sizes.width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: colors.white,
    padding: 10,
    height: 250,
  },
  title: {...stylesCustom.txtTitle1, color: colors.blue},
  view: {
    height: 45,
    width: sizes.width * 0.8,
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 15,
    borderColor: colors.gray2,
    borderWidth: 1,
    ...stylesCustom.row,
    paddingHorizontal: 8,
    fontFamily: fonts.Regula,
    fontSize: sizes.width * 0.04,
    color: colors.text,
  },
  view1: {
    alignSelf: 'center',
    ...stylesCustom.row,
    width: sizes.width * 0.8,
    marginTop: 30,
  },
  btn: {
    height: 45,
    width: sizes.width * 0.35,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    ...stylesCustom.txtTitle,
  },
});
