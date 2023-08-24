import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AlertOptions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import sizes from '../../res/sizes';
import images from '../../res/images';
import fonts from '../../res/fonts';
import ImageCropPicker from 'react-native-image-crop-picker';

export default function BottomSheetUploadImage({
  refRBSheet,
  urlImage,
}: {
  refRBSheet: any;
  urlImage: (val: string) => void;
}) {
  const TakePhoTo = async () => {
    try {
      const image = await ImageCropPicker.openCamera({
        cropping: false,
        multiple: false,
        compressImageQuality: 0.6,
        includeBase64: true,
        mediaType: 'photo',
      });
      urlImage(image.path);
    } catch (error) {}
  };
  const SelectPhoTo = async () => {
    try {
      await ImageCropPicker.openPicker({
        cropping: false,
        multiple: false,
      }).then(images => {
        urlImage(images.path);
        refRBSheet.current.close();
      });
    } catch (error) {}
  };
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
          height: sizes.height * 0.3,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 20,
        },
      }}>
      <View>
        <Text style={styles.title}>Chọn ảnh</Text>
        <Text style={styles.title1} onPress={() => refRBSheet.current.close()}>
          Huỷ
        </Text>
      </View>

      <View style={styles.view}>
        <TouchableOpacity style={styles.img} onPress={TakePhoTo}>
          <Image source={images.takePhoto} />
          <Text style={styles.txt}>Chụp ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.img} onPress={SelectPhoTo}>
          <Image source={images.selectPhoto} style={{tintColor: '#676565'}} />
          <Text style={styles.txt}>Thư viện</Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    ...stylesCustom.txtTitle1,
    color: colors.text,
    alignSelf: 'center',
  },
  title1: {
    ...stylesCustom.txt,
    color: colors.text,
    position: 'absolute',
    right: 20,
  },
  view: {
    ...stylesCustom.row1,
    justifyContent: 'space-around',
    marginTop: 30,
    width: sizes.width * 0.8,
    alignSelf: 'center',
  },
  img: {
    height: 110,
    width: 110,
    borderColor: '#676565',
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontFamily: fonts.Regula,
    color: '#676565',
    fontSize: 16,
  },
});
