import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderCustom from '../../../component/header/HeaderCustom';
import stylesCustom from '../../../res/stylesCustom';
import {colors} from '../../../res/colors';
import sizes from '../../../res/sizes';
import HeaderRank from './HeaderRank';
import {dataRank} from '../../../res/feckData/dataRank';
import RenderItemRank from './RenderItemRank';

export default function Rank() {
  const RenderFooter = () => (
    <>
      <HeaderRank />
      <FlatList
        scrollEnabled={false}
        data={dataRank}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <RenderItemRank item={item} index={index} />
        )}
        style={{marginTop: 40}}
      />
    </>
  );
  return (
    <View style={styles.container}>
      <HeaderCustom title="Bảng xếp hạng" />
      <View style={stylesCustom.view1}>
        <Text style={styles.txt}>Top doanh thu tháng</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[]}
          renderItem={null}
          ListFooterComponentStyle={{paddingBottom: 40}}
          ListFooterComponent={RenderFooter}
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
