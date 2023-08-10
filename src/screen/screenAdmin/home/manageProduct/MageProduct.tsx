import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import HeaderCustom from '../../../../component/header/HeaderCustom';
import {NavigationProp} from '@react-navigation/native';
import stylesCustom from '../../../../res/stylesCustom';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../../../res/colors';
import sizes from '../../../../res/sizes';
import {dataProduct} from '../../../../res/feckData/dataProduct';
import RenderManageProduct from './RenderManageProduct';
import BottomSheetaddProduct from '../../../../component/bottomSheet/BottomSheetaddProduct';

const MageProduct = ({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) => {
  const refRBSheet = useRef<any>(null);

  return (
    <View style={styles.container}>
      <HeaderCustom
        title="Quản lý sản phẩm"
        back
        sharp
        onBackPress={() => navigation.goBack()}
      />
      <View style={stylesCustom.view1}>
        <View style={styles.view}>
          <Text style={styles.txt}>Danh sách sản phẩm</Text>
          <MaterialCommunityIcons
            name="book-plus"
            color={colors.text}
            size={30}
            onPress={() => refRBSheet.current.open()}
          />
        </View>
        <FlatList
          data={dataProduct}
          renderItem={({item}) => <RenderManageProduct item={item} />}
          contentContainerStyle={styles.fl}
        />
      </View>
      <BottomSheetaddProduct refRBSheet={refRBSheet} />
    </View>
  );
};

export default MageProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  txt: {
    ...stylesCustom.txtTitle,
    color: colors.text,
    marginLeft: 15,
    fontSize: sizes.width * 0.05,
  },
  fl: {marginBottom: 20, paddingBottom: 40},
  view: {
    ...stylesCustom.row,
    marginTop: 23,
    width: sizes.width * 0.9,
    alignSelf: 'center',
  },
});
