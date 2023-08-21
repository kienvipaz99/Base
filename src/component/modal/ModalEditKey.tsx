import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import sizes from '../../res/sizes';
import fonts from '../../res/fonts';
import {colors} from '../../res/colors';
import stylesCustom from '../../res/stylesCustom';
import {useChangeInvoidMutation} from '../../redux/api/auth.api';
import ToastCustom from '../toastCustom/ToastCustom';
import {Image} from 'react-native';
import images from '../../res/images';
interface Props {
  isShow?: boolean;
  toggleDate: () => void;
  ids: number | undefined;
}
const ModalEditKey = (props: Props) => {
  const [editKey, setEditKey] = useState('');
  const [ChangInvoid, {isLoading}] = useChangeInvoidMutation();
  const [err, setErr] = useState('');
  const [note, setNote] = useState('');

  const ToastRef = useRef<any>(null);
  const ChangeKey = async () => {
    if (editKey) {
      try {
        const change = await ChangInvoid({
          id: props?.ids,
          data: {
            _method: 'patch',
            his: editKey,
            note: note,
          },
        }).unwrap();
        if (change) {
          setErr('Chỉnh sửa thành công');
          await ToastRef.current.toast();
        }
      } catch (error) {
        setErr('Chỉnh sửa thất bại');
        await ToastRef.current.toast();
      }
    }
  };
  const renderContent = () => {
    return (
      <View style={styles.content}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>Chỉnh sửa hoá đơn</Text>
          <TextInput
            style={styles.view}
            placeholder="Nhập mã máy"
            value={editKey}
            onChangeText={setEditKey}
          />
          <TextInput
            style={styles.view}
            placeholder="Ghi chú"
            value={note}
            onChangeText={setNote}
          />
          <View style={styles.viewImage}>
            <TouchableOpacity style={styles.img}>
              <Image source={images.uploadImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.view1}>
            <TouchableOpacity
              onPress={async () => {
                await ChangeKey();
              }}
              style={[styles.btn, {backgroundColor: colors.blue}]}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <Text style={[styles.txt, {color: colors.white}]}>
                  Xác nhận
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.toggleDate}
              style={[styles.btn, {backgroundColor: colors.gray2}]}>
              <Text style={[styles.txt, {color: colors.text}]}>Huỷ</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ToastCustom ref={ToastRef} val={err} />
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
            <View style={styles.view3} />
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
    padding: 40,
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
  view3: {zIndex: 0, flex: 1, height: '100%', width: '100%'},
  viewImage: {
    ...stylesCustom.row1,
    justifyContent: 'flex-start',
    width: sizes.width * 0.8,
    marginTop: 15,
  },
  img: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderRadius: 10,
    borderColor: colors.gray3,
    borderWidth: 1,
  },
});
