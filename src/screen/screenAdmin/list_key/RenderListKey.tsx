import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import sizes from '../../../res/sizes';
import {colors} from '../../../res/colors';
import stylesCustom from '../../../res/stylesCustom';
import {Image} from 'react-native';
import fonts from '../../../res/fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import images from '../../../res/images';
import ModalLog from '../../../component/modal/ModalLog';
import ModalEditKey from '../../../component/modal/ModalEditKey';
export default function RenderListKey({item}: {item: dataKeyFake}) {
  const [check, setCheck] = useState(item.status);
  const [showModalLog, setShowModalLog] = useState(false);
  const [showEditKey, setShowEditKey] = useState(false);

  const OnClick = () => setCheck(!check);
  return (
    <View style={styles.view}>
      <View style={stylesCustom.row}>
        <View style={styles.view1}>
          <Image source={item.avt} style={styles.img} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <Pressable onPress={OnClick}>
          <Image
            source={check ? images.checkbox : images.unchek}
            style={styles.img1}
          />
        </Pressable>
      </View>
      <View style={stylesCustom.row}>
        <View style={{width: sizes.width * 0.65}}>
          <Text style={styles.txt}>Họ tên KH:{item.nameKH}</Text>
          <Text style={styles.txt}>Email: {item.email}</Text>
          <Text style={styles.txt}>Sđt: {item.sdt}</Text>
          <Text style={styles.txt}>Gói: {item.goi}</Text>
          <Text style={styles.txt}>Ngày bán: {item.ngayban}</Text>
          <Text style={styles.txt}>Giá tiền: {item.giatien}</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text>Còn lại: {item.time}</Text>
          <Pressable onPress={() => setShowEditKey(true)}>
            <Image source={images.pen} />
          </Pressable>
          <Pressable onPress={() => setShowModalLog(true)}>
            <Image source={images.log} />
          </Pressable>
          <Image source={images.image} />
          <Image source={images.bin} />
        </View>
      </View>
      <Text style={styles.txt}>Nội dung: {item.noidung}</Text>

      <ModalLog
        isShow={showModalLog}
        toggleDate={() => setShowModalLog(false)}
      />

      <ModalEditKey
        isShow={showEditKey}
        toggleDate={() => setShowEditKey(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: sizes.width * 0.9,
    borderRadius: 15,
    backgroundColor: colors.white,
    ...stylesCustom.shadowitem,
    alignSelf: 'center',
    marginTop: 20,

    padding: 10,
  },
  view1: {
    ...stylesCustom.row1,
    width: sizes.width * 0.65,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  name: {
    fontFamily: fonts.Medium,
    fontSize: 17,
    color: colors.text,
    marginLeft: 8,
  },
  txt: {
    fontFamily: fonts.Regula,
    fontSize: 15,
    color: colors.text,
  },
  img1: {width: 25, height: 25},
});
