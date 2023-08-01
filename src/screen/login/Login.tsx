import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import stylesCustom from '../../res/stylesCustom';
import sizes from '../../res/sizes';
import images from '../../res/images';
import TextInputLogin from '../../component/txtInput/TextInputLogin';
import BTNLogin from '../../component/btn/BTNLogin';
import {NavigationProp} from '@react-navigation/native';

export default function Login({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');

  return (
    <View style={stylesCustom.container}>
      <Image source={images.logomkt2} style={styles.img} />
      <Text style={stylesCustom.txtLogo}>ĐĂNG NHẬP</Text>
      <View style={styles.view}>
        <TextInputLogin
          nameIcon="user"
          state={userName}
          placeholder="Nhập tài khoản"
          setState={setUserName}
        />
        <TextInputLogin
          nameIcon="lock"
          state={passWord}
          setState={setPassWord}
          placeholder="Nhập mật khẩu"
          secureTextEntry
        />
      </View>
      <View style={styles.btn}>
        <BTNLogin
          onPress={() => navigation.navigate('ButtomTabAdmin')}
          title="Đăng nhập"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 300,
    height: 120,
    alignSelf: 'center',
    marginTop: sizes.height * 0.15,
  },
  view: {marginTop: 30, justifyContent: 'space-between', height: 130},
  btn: {marginTop: 35},
});
