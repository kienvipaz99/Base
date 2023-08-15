import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import stylesCustom from '../../../res/stylesCustom';
import HeaderCustom from '../../../component/header/HeaderCustom';
import {colors} from '../../../res/colors';
import RenderListKey from './RenderListKey';
import feckdataKey from '../../../res/feckData/feckdataKey';
import sizes from '../../../res/sizes';
import {useGetDataKeyQuery} from '../../../redux/api/auth.api';

export default function List_Key() {
  const [perpage, setPerPage] = useState(10);
  const handleEndReached = () => {
    setPerPage(perpage + 10);
    refetch();
  };
  const {data, refetch, isFetching} = useGetDataKeyQuery({per_page: perpage});
  return (
    <View style={styles.container}>
      <HeaderCustom title="Danh sách Key" sharp />
      <View style={stylesCustom.view1}>
        <Text style={styles.txt}>
          Báo cáo danh sách ({data?.payload?.pagination?.total})
        </Text>

        <FlatList
          data={data?.data}
          renderItem={({item}) => <RenderListKey item={item} />}
          contentContainerStyle={{paddingBottom: 50}}
          onRefresh={refetch}
          scrollEventThrottle={16}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.7}
          refreshing={isFetching}
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
