import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {colors} from '../../../../res/colors';
import fonts from '../../../../res/fonts';
import sizes from '../../../../res/sizes';
import stylesCustom from '../../../../res/stylesCustom';
import images from '../../../../res/images';
import BottomSheetEditEmployee from '../../../../component/bottomSheet/BottomSheetEditEmployee';
const RenderItemManageEmployee = ({
  item,
  onPressDelete,
}: {
  item: itemManageEmployee;
  onPressDelete: (id: number) => void;
}) => {
  const refBootomSheet = useRef<any>(null);
  const [data, setData] = useState<itemManageEmployee>();
  return (
    <View style={styles.view}>
      <View style={stylesCustom.row}>
        <Text style={styles.txt1}>Tên NV: {item?.name}</Text>
        <View
          style={[
            styles.status,
            {backgroundColor: item?.status ? colors.green : colors.red},
          ]}
        />
      </View>
      <View style={stylesCustom.row}>
        <View>
          <Text style={styles.txt2}>Email: {item?.email}</Text>
          <Text style={styles.txt2}>Số điện thoại: {item?.phone}</Text>
          <Text style={styles.txt2}>Team: {item?.team?.name}</Text>
          <Text style={styles.txt2}>Vai trò: {item?.roles[0]?.name}</Text>
          <Text style={styles.txt2}>Ngày tạo: {item?.created_at}</Text>
        </View>
        <View style={{justifyContent: 'space-around', height: 70}}>
          <Pressable
            onPress={() => {
              setData(item);
              refBootomSheet.current.open();
            }}>
            <Image source={images.pen} />
          </Pressable>
          <Pressable
            onPress={() => {
              onPressDelete(item?.id);
            }}>
            <Image source={images.bin} />
          </Pressable>
        </View>
      </View>
      <BottomSheetEditEmployee refRBSheet={refBootomSheet} data={data} />
    </View>
  );
};

export default RenderItemManageEmployee;

const styles = StyleSheet.create({
  fl: {marginBottom: 20, paddingBottom: 40},
  txt1: {
    color: colors.text,
    fontFamily: fonts.Medium,
    fontSize: 16,
    width: sizes.width * 0.75,
  },
  txt2: {
    color: colors.text,
    fontFamily: fonts.Regula,
    fontSize: 15,
    width: sizes.width * 0.75,
  },
  status: {
    height: 15,
    width: 15,
    borderRadius: 10,
  },
  view: {
    width: sizes.width * 0.9,
    ...stylesCustom.shadowitem,
    backgroundColor: colors.white,
    alignSelf: 'center',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
  },
});
