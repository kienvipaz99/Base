import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import HeaderCustom from '../../../component/header/HeaderCustom';
import stylesCustom from '../../../res/stylesCustom';
import {colors} from '../../../res/colors';
import sizes from '../../../res/sizes';
import {DataManage} from '../../../res/data/DataManage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import fonts from '../../../res/fonts';
import {NavigationProp} from '@react-navigation/native';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import {authApi, useLogoutMutation} from '../../../redux/api/auth.api';
import {setDataUser} from '../../../redux/state/login.slice';
import Loading from '../../../component/loading/Loading';

const Home = ({
  navigation,
}: {
  navigation: NavigationProp<Record<string, any>>;
}) => {
  const [select, setSlect] = useState<number>();
  const dispatch = useDispatch();
  const useAppSelect: TypedUseSelectorHook<RootState> = useSelector;
  const remember = useAppSelect(data => data?.getLogin?.getdataUser);
  const [logoutMutation, {isLoading}] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      const result = await logoutMutation('');
      if (result) {
        dispatch(
          setDataUser({
            username: remember?.username,
            password: '',
          }),
        );
        navigation.navigate('Login');
      }
    } catch (error) {}
  };
  const RenderItem = ({item}: {item: itemHome}) => {
    return (
      <Pressable
        style={[
          styles.view,
          {borderColor: select === item.id ? colors.red : 'transparent'},
        ]}
        onPress={() => {
          setSlect(item.id);
          if (item?.navigation === 'Login') {
            handleLogout();
          } else {
            navigation.navigate(item.navigation);
          }
        }}>
        <Icon
          name={item.icon}
          size={25}
          color={select === item.id ? colors.red : colors.gray3}
        />
        <Text
          style={[
            styles.txt1,
            {
              color: select === item.id ? colors.text : colors.gray3,
              fontFamily: select === item.id ? fonts.bold : fonts.Regula,
            },
          ]}>
          {item.name}
        </Text>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderCustom title="Trang chủ" />
      <View style={stylesCustom.view1}>
        <Text style={styles.txt}>Quản lý thông tin</Text>
        <FlatList
          data={DataManage}
          renderItem={RenderItem}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          columnWrapperStyle={styles.view1}
        />
      </View>
      {isLoading && <Loading />}
    </View>
  );
};
export default Home;
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
  view: {
    width: sizes.width * 0.4,
    height: 60,
    backgroundColor: colors.white,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: colors.gray2,
    borderWidth: 1,
    flexDirection: 'row',
  },
  view1: {
    width: sizes.width * 0.9,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  txt1: {
    color: '#909090',
    fontFamily: fonts.Regula,
    fontSize: 15,
    width: sizes.width * 0.23,
    marginLeft: 10,
  },
});
