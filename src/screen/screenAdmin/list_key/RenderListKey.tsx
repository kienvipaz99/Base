import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import sizes from '../../../res/sizes';
import {colors} from '../../../res/colors';
import stylesCustom from '../../../res/stylesCustom';
import {Image} from 'react-native';
import fonts from '../../../res/fonts';
import images from '../../../res/images';
import ModalLog from '../../../component/modal/ModalLog';
import ModalEditKey from '../../../component/modal/ModalEditKey';
import {date, money} from '../../../res/convert';
import {
  useChangeInvoidMutation,
  useChangeStatusMutation,
} from '../../../redux/api/auth.api';
export default function RenderListKey({
  item,
  onChange,
}: {
  item: TypeDataListKey;
  onChange: ({id, status}: {id: number; status: string}) => void;
}) {
  const [showModalLog, setShowModalLog] = useState(false);
  const [showEditKey, setShowEditKey] = useState(false);
  const [idItem, setIdItem] = useState<number | undefined>();

  return (
    <View style={styles.view}>
      <View style={stylesCustom.row}>
        <View style={styles.view1}>
          <Image source={images.kien} style={styles.img} />
          <View style={{marginLeft: 8}}>
            <Text style={styles.name}>{item?.subscriber?.name}</Text>
            <Text style={styles.txt}>Email: {item?.subscriber?.email}</Text>
          </View>
        </View>
        <Pressable
          onPress={() => {
            onChange({
              id: item.invoices[0]?.id,
              status: item.invoices[0]?.status,
            });
          }}>
          <Image
            source={
              item.invoices[0]?.status === 'PAID'
                ? images.checkbox
                : images.unchek
            }
            style={styles.img1}
          />
        </Pressable>
      </View>
      <View style={stylesCustom.row}>
        <View style={{width: sizes.width * 0.65}}>
          <Text style={styles.txt}>
            Họ tên KH:{item?.invoices[0]?.user?.name}
          </Text>
          <Text style={styles.txt}>
            Email: {item?.invoices[0]?.user?.email}
          </Text>
          <Text style={styles.txt}>
            Sđt:{' '}
            {item?.invoices[0]?.user?.phone
              ? item?.invoices[0]?.user?.phone
              : 'Không có'}
          </Text>
          <Text style={styles.txt}>Gói: {item?.plan?.name}</Text>
          <Text style={styles.txt}>Ngày bán: {date(item?.starts_at)}</Text>
          <Text style={styles.txt}>
            Giá tiền: {money(item?.invoices[0]?.total)}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end', width: sizes.width * 0.2}}>
          <Text
            style={[
              styles.txt,
              {
                textAlign: 'center',
              },
            ]}>
            Còn lại: {item?.remaing_day}
          </Text>
          <Pressable
            onPress={() => {
              setIdItem(item.invoices[0]?.id);
              setShowEditKey(true);
            }}>
            <Image source={images.pen} />
          </Pressable>
          <Pressable onPress={() => setShowModalLog(true)}>
            <Image source={images.log} />
          </Pressable>
          <Image source={images.image} />
          <Image source={images.bin} />
        </View>
      </View>
      <Text style={styles.txt}>Nội dung: {item?.description}</Text>

      <ModalLog
        isShow={showModalLog}
        toggleDate={() => setShowModalLog(false)}
      />

      <ModalEditKey
        isShow={showEditKey}
        toggleDate={() => setShowEditKey(false)}
        ids={idItem}
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
  },
  txt: {
    fontFamily: fonts.Regula,
    fontSize: 15,
    color: colors.text,
  },
  img1: {width: 25, height: 25},
});
