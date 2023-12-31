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
import ViewImage from './ViewImage';

export default function RenderListKey({
  item,
  onChange,
  deletes,
  refetch,
}: {
  item: TypeDataListKey;
  onChange: ({id, status}: {id: number; status: string}) => void;
  deletes: (id: number) => void;
  refetch: () => void;
}) {
  const [showModalLog, setShowModalLog] = useState(false);
  const [showEditKey, setShowEditKey] = useState(false);
  const [idItem, setIdItem] = useState<number | undefined>();
  const [showImage, setShowImage] = useState(false);
  return (
    <View style={styles.view}>
      <View style={stylesCustom.row}>
        <View style={styles.view1}>
          <Image source={images.kien} style={styles.img} />
          <View style={{marginLeft: 8}}>
            <Text style={styles.name}>{item?.invoices[0]?.user?.name}</Text>
            <Text style={styles.txt}>
              Email: {item?.invoices[0]?.user?.email}
            </Text>
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
          <Text style={styles.txt}>Họ tên KH:{item?.subscriber?.name}</Text>
          <Text style={styles.txt}>Email: {item?.subscriber?.email}</Text>
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
            {item?.remaing_day > 10000
              ? 'Vĩnh viễn'
              : 'Còn lại: ' + item?.remaing_day}
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
          <Pressable
            onPress={() => {
              if (item?.invoices[0]?.files.length === 0) {
              } else {
                setShowImage(true);
              }
            }}>
            <Image source={images.image} />
          </Pressable>
          <Pressable
            onPress={() => {
              deletes(item?.invoices[0]?.id);
            }}>
            <Image source={images.bin} />
          </Pressable>
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
        his={item?.invoices[0]?.his}
        note={item?.invoices[0]?.note}
        imageKey={item?.invoices[0]?.files}
        refetch={refetch}
      />
      <ViewImage
        isShow={showImage}
        toggleDate={() => setShowImage(false)}
        image={item?.invoices[0]?.files}
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
