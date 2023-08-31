import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {useGetProductsQuery} from '../../../../redux/api/auth.api';
import RenderTopProduct from '../RenderTopProduct';
import Loading from '../../../../component/loading/Loading';
export default function Product() {
  const {data, isLoading} = useGetProductsQuery({
    per_page: 1000,
  });

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView
          key={'Product'}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          style={{marginTop: 20}}>
          {data?.data?.map((item, index) => (
            <RenderTopProduct
              item={item}
              index={index}
              key={index.toString()}
            />
          ))}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
