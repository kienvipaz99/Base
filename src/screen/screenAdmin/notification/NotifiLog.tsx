import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderCustom from '../../../component/header/HeaderCustom';
import stylesCustom from '../../../res/stylesCustom';
import {colors} from '../../../res/colors';
import {dataLog} from '../../../res/feckData/feckLog';
import RenderItemLog from './RenderItemLog';

const NotifiLog = () => {
  const RemdeItem = ({item, index}: {item: dataLog; index: number}) => (
    <RenderItemLog item={item} />
  );
  return (
    <View style={styles.container}>
      <HeaderCustom title="Thông báo log" sharp />
      <View style={stylesCustom.view1}>
        <Text style={styles.txt}>Thông báo ({dataLog.length})</Text>
        <FlatList
          data={dataLog}
          renderItem={RemdeItem}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{paddingBottom: 50}}
          removeClippedSubviews
          maxToRenderPerBatch={10}
        />
      </View>
    </View>
  );
};

export default NotifiLog;

const styles = StyleSheet.create({
  container: {flex: 1},
  txt: {
    ...stylesCustom.txtTitle,
    color: colors.text,
    marginTop: 23,
    marginLeft: 15,
  },
});
