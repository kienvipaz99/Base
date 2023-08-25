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
import ToastCustom from '../toastCustom/ToastCustom';
import {useCreatLogMutation} from '../../redux/api/auth.api';
interface Props {
  isShow?: boolean;
  toggleDate: () => void;
  refetch: () => void;
  id?: number;
  data: (val: Logs) => void;
}
const ModalAddLog = (props: Props) => {
  const [detail, setDetail] = useState('');
  const [version, setVersion] = useState('');

  const ToastRef = useRef<any>(null);
  const [err, setErr] = useState('');
  const [creatLog, {isLoading}] = useCreatLogMutation();
  const onClick = async () => {
    try {
      const aa = (await creatLog({
        detail: detail,
        product_id: props?.id,
        version: version,
      }).unwrap()) as any;

      if (aa) {
        setErr('Thêm thành công phiên bản ');
        props.data(aa?.data);
        await ToastRef.current.toast();
        props.refetch();
        props.toggleDate();
      }
    } catch (error) {
      console.log(error);

      setErr('Thêm thất bại');
      await ToastRef.current.toast();
    }
  };

  const renderContent = () => {
    return (
      <View style={styles.content}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>Nâng cấp phiên bản</Text>
          <TextInput
            style={styles.view}
            placeholder="Nhập phiên bản"
            value={version}
            onChangeText={setVersion}
          />
          <TextInput
            style={styles.view}
            placeholder="Mô tả phiên bản"
            value={detail}
            onChangeText={setDetail}
          />
          <View style={styles.view1}>
            <TouchableOpacity
              onPress={onClick}
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
              onPress={() => {
                props.toggleDate();
              }}
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
export default ModalAddLog;
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
    height: 90,
    width: 90,
    borderRadius: 10,
    borderColor: colors.gray3,
    borderWidth: 1,
  },
  txt1: {
    color: colors.gray3,
    fontFamily: fonts.Regula,
    fontSize: 15,
    marginTop: 3,
  },
  icon: {position: 'absolute', right: -17, top: -5},
  img1: {
    height: 90,
    width: 90,
    borderRadius: 10,
    marginLeft: 20,
  },
});
