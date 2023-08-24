import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import TextInputCustom from '../txtInput/TextInputCustom';
import sizes from '../../res/sizes';
import DoubleButton from '../btn/DoubleButton';
import SelectCustom from '../select/SelectCustom';
import {
  useCreatUserMutation,
  useGetBranchesQuery,
  useGetRolesQuery,
} from '../../redux/api/auth.api';
import Select from '../select/Select';
import ToastCustom from '../toastCustom/ToastCustom';
import ModalAddBarnches from '../modal/ModalAddBarnches';
export default function BottomSheetCreatEmployee({
  refRBSheet,
}: {
  refRBSheet: any;
}) {
  const {data: branches, refetch} = useGetBranchesQuery({
    option: '?include=teams',
  });
  const {data: roles} = useGetRolesQuery('');
  const [team, setTeam] = useState<Team[]>([]);
  const [team_id, setTeamId] = useState<number>();
  const [branche_id, setBranche_id] = useState<number>();
  const [role, setRole] = useState('');
  const [last_name, setLast_name] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [createUser, {isLoading}] = useCreatUserMutation();
  const [err, setErr] = useState('');
  const ToastRef = useRef<any>(null);
  const [showBarnch, setShowBarnch] = useState(false);

  const Summit = async () => {
    try {
      const dataUser = await createUser({
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: password,
        password_confirmation: password,
        branch_id: branche_id,
        roles: role,
        team_id: team_id,
        user_type: 'MEMBER',
      }).unwrap();
      if (dataUser) {
        console.log(dataUser);

        setErr('Thêm thành công ');
        await ToastRef.current.toast();
      }
    } catch (error: any) {
      let err = error?.data?.payload?.errors;
      console.log(error);

      setErr('Thêm thất bại');
      await ToastRef.current.toast();
    }
  };
  return (
    //@ts-ignore
    <RBSheet
      ref={refRBSheet}
      animationType="fade"
      keyboardAvoidingViewEnabled={false}
      closeOnDragDown={true}
      closeOnPressMask={false}
      dragFromTopOnly={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.3)',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
        container: styles.container,
      }}>
      <Text style={styles.title}>Thêm mới nhân viên</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets>
        <View style={{paddingBottom: 30}}>
          <Select
            data={branches?.data}
            setSelect={val => {
              setTeam(val?.teams);
              setBranche_id(val?.id);
            }}
            defaultButtonText="Chi nhánh"
            icons="add-circle"
            onPressIcon={() => setShowBarnch(true)}
          />
          <Select
            data={team}
            setSelect={val => setTeamId(val?.id)}
            defaultButtonText="Đội nhóm"
            disabled={team.length === 0 ? true : false}
            icons="add-circle"
          />
          <Select
            data={roles?.data}
            setSelect={val => setRole(val?.name)}
            defaultButtonText="Vai trò"
          />
          <TextInputCustom
            placeholder="Họ và đệm"
            value={first_name}
            setValue={setFirst_name}
          />
          <TextInputCustom
            placeholder="Tên"
            value={last_name}
            setValue={setLast_name}
          />
          <TextInputCustom
            placeholder="Email"
            value={email}
            setValue={setEmail}
          />
          <TextInputCustom
            placeholder="Số điện thoại"
            value={phone}
            setValue={setPhone}
          />
          <TextInputCustom
            placeholder="Mật khẩu mới"
            value={password}
            setValue={setPassword}
          />

          <DoubleButton
            loading={isLoading}
            conFirm={Summit}
            cancel={() => refRBSheet.current.close()}
          />
        </View>
      </ScrollView>
      <ToastCustom ref={ToastRef} val={err} />
      <ModalAddBarnches
        refetch={refetch}
        isShow={showBarnch}
        toggleDate={() => setShowBarnch(false)}
      />
    </RBSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    ...stylesCustom.txtTitle1,
    color: colors.text,
    alignSelf: 'center',
  },
  container: {
    height: sizes.height * 0.6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
});
