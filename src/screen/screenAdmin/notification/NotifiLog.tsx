import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import HeaderCustom from '../../../component/header/HeaderCustom';
import stylesCustom from '../../../res/stylesCustom';
import {colors} from '../../../res/colors';
import RenderItemLog from './RenderItemLog';
import {useGetLogsQuery} from '../../../redux/api/auth.api';
import Loading from '../../../component/loading/Loading';

const NotifiLog = () => {
  const [perpage, setPerPage] = useState(10);
  const handleEndReached = () => {
    setPerPage(perpage + 10);
    refetch();
  };
  const {data, isLoading, refetch, isFetching} = useGetLogsQuery({
    per_page: perpage,
  });

  return (
    <View style={styles.container}>
      <HeaderCustom title="Thông báo log" sharp />
      <View style={stylesCustom.view1}>
        <Text style={styles.txt}>
          Thông báo ({data?.payload?.pagination?.total})
        </Text>
        <FlatList
          data={data?.data}
          renderItem={({item}: {item: Logs}) => <RenderItemLog item={item} />}
          keyExtractor={item => `${item?.id}`}
          contentContainerStyle={{paddingBottom: 50}}
          removeClippedSubviews
          maxToRenderPerBatch={10}
          onRefresh={refetch}
          scrollEventThrottle={16}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.7}
          refreshing={isFetching}
        />
      </View>
      {isLoading && <Loading />}
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
