import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import stylesCustom from '../../res/stylesCustom';
import sizes from '../../res/sizes';
import images from '../../res/images';
import TextInputLogin from '../../component/txtInput/TextInputLogin';
import BTNLogin from '../../component/btn/BTNLogin';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import {
  useLoginMutation,
  useVerifyTokenMutation,
} from '../../redux/api/auth.api';
import Loading from '../../component/loading/Loading';
import {setAuth} from '../../redux/state/authe.slice';
import ErrorText from '../../component/err/ErrorCall';
import {axiosAuth} from '../../redux/api/axiosClient';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {setDataUser} from '../../redux/state/login.slice';

export default function Login({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) {
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const remember = useAppSelect(data => data?.getLogin?.getdataUser);
  const [userName, setUserName] = useState(remember.username);
  const [passWord, setPassWord] = useState(remember.password);
  const [useLogin, {isLoading, isError}] = useLoginMutation();
  const [verifyToken, {isLoading: isLoadingVerifi}] = useVerifyTokenMutation();
  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      const a = await useLogin({
        email: userName,
        password: passWord,
      }).unwrap();
      dispatch(
        setDataUser({
          username: userName,
          password: passWord,
        }),
      );
      axiosAuth(a.apiToken);
      const veRify = await verifyToken({
        token: a.apiToken,
      }).unwrap();

      if (
        veRify?.data?.roles[0]?.id === 1 ||
        veRify?.data?.roles[0]?.id === 2
      ) {
        navigation.navigate('ButtomTabAdmin');
      } else {
        navigation.navigate('ButtomTabUser');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setPassWord(remember.password);
      setUserName(remember.username);
    }, [remember]),
  );
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
      {isError && <ErrorText err="Thông tin tài khoản không chính xác" />}
      <View style={styles.btn}>
        <BTNLogin onPress={onLogin} title="Đăng nhập" />
      </View>
      {isLoading || isLoadingVerifi ? <Loading /> : null}
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
