import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import fonts from '../res/fonts';

const Screeen1 = ({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        onPress={() => navigation.navigate('Screeen2')}
        style={{fontSize: 40, fontFamily: fonts.boldItalic}}>
        Screeen1
      </Text>
    </View>
  );
};

export default Screeen1;

const styles = StyleSheet.create({});
