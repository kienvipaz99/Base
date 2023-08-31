import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import RenderItemSale from '../RenderItem';
import {useGetUserQuery} from '../../../../redux/api/auth.api';
export default function Empolyee() {
  const {data, isLoading} = useGetUserQuery({
    option: ``,
  });

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView
          key={'Empolyee'}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          style={{marginTop: 20}}>
          {data?.data?.map((item, index) => (
            <RenderItemSale item={item} index={index} key={index.toString()} />
          ))}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
