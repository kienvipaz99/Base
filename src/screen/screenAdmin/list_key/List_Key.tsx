import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import stylesCustom from '../../../res/stylesCustom';
import HeaderCustom from '../../../component/header/HeaderCustom';
import {colors} from '../../../res/colors';
import RenderListKey from './RenderListKey';
import feckdataKey from '../../../res/feckData/feckdataKey';
import sizes from '../../../res/sizes';

export default function List_Key() {
  const RenderItem = ({item}: {item: dataKeyFake}) => (
    <RenderListKey item={item} />
  );
  return (
    <View style={styles.container}>
      <HeaderCustom title="Danh sách Key" sharp />
      <View style={stylesCustom.view1}>
        <Text style={styles.txt}>Báo cáo danh sách ({feckdataKey.length})</Text>

        <FlatList
          data={feckdataKey}
          renderItem={RenderItem}
          contentContainerStyle={{paddingBottom: 50}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    ...stylesCustom.txtTitle,
    color: colors.text,
    marginTop: 23,
    marginLeft: 15,
    fontSize: sizes.width * 0.05,
  },
});
