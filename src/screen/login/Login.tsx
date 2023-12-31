import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {setProfile} from '../../redux/state/profile.slice';
import {ErrorSubs} from '../../res/ErrorSub';
export default function Login({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) {
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const remember = useAppSelect(data => data?.getLogin?.getdataUser);
  const [userName, setUserName] = useState(remember.username);
  const [passWord, setPassWord] = useState(remember.password);
  const [err, setErr] = useState({
    email: '',
    password: '',
  });
  const [useLogin, {isLoading}] = useLoginMutation();
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
      dispatch(setProfile(veRify));
      dispatch(setAuth(a.apiToken));
      if (
        veRify?.data?.roles[0]?.id === 1 ||
        veRify?.data?.roles[0]?.id === 2
      ) {
        navigation.navigate('ButtomTabAdmin');
      } else {
        navigation.navigate('ButtomTabUser');
      }
      setErr({
        email: '',
        password: '',
      });
    } catch (error: any) {
      let err = error?.data?.payload?.errors;
      setErr({
        email: ErrorSubs(err.email),
        password: ErrorSubs(err.password),
      });
    }
  };
  useEffect(() => {
    if (remember.password) {
      onLogin();
    }
  }, []);
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

      <TextInputLogin
        nameIcon="user"
        state={userName}
        placeholder="Nhập tài khoản"
        setState={setUserName}
      />
      {err?.email && <ErrorText err={err?.email} />}
      <TextInputLogin
        nameIcon="lock"
        state={passWord}
        setState={setPassWord}
        placeholder="Nhập mật khẩu"
        secureTextEntry
      />
      {err?.password && <ErrorText err={err?.password} />}

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

  btn: {marginTop: 35},
});
