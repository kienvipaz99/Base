import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import sizes from '../../res/sizes';
import fonts from '../../res/fonts';
import {colors} from '../../res/colors';
import stylesCustom from '../../res/stylesCustom';
import {dataLogClient} from '../../res/feckData/feckLog';
interface Props {
  isShow?: boolean;
  toggleDate?: () => void;
}
const renderItem = ({item}: {item: dataLogClient}) => {
  return (
    <View style={styles.view}>
      <Text style={styles.txt}>
        Lần {item.id}: {item.time}
      </Text>
      <Text style={styles.txt}>Ngày mua:{item.ngaymua}</Text>
      <Text style={styles.txt}>Cấp lại máy:{item.caplaimay}</Text>
      <Text style={styles.txt}>Nội dung khiếu nại:{item.noidungkhieunai}</Text>
      <Text style={styles.txt}>Nội dung phản hồi:{item.caplaimay}</Text>
    </View>
  );
};
const ModalLog = (props: Props) => {
  const renderContent = () => {
    return (
      <View style={styles.content}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>Log khách hàng</Text>
          <FlatList
            data={dataLogClient}
            renderItem={renderItem}
            contentContainerStyle={styles.fl}
          />
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
          <TouchableWithoutFeedback onPress={props.toggleDate}>
            <View style={{zIndex: 0, flex: 1, height: '100%', width: '100%'}} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>{renderContent()}</View>
        </View>
      </Modal>
    </View>
  );
};
export default ModalLog;
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
  },
  title: {...stylesCustom.txtTitle1, color: colors.blue},
  view: {width: sizes.width * 0.8, padding: 5},
  fl: {
    height: 200,
    justifyContent: 'center',
  },
  txt: {
    color: colors.text,
    fontFamily: fonts.Regula,
    fontSize: 15,
  },
});
