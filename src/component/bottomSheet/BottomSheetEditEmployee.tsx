import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import TextInputCustom from '../txtInput/TextInputCustom';
import sizes from '../../res/sizes';
import DoubleButton from '../btn/DoubleButton';
import {
  useChangeUserMutation,
  useGetBranchesQuery,
  useGetRolesQuery,
} from '../../redux/api/auth.api';
import Select from '../select/Select';
import SelectStatusUser from '../select/SelectStatusUser';
export default function BottomSheetEditEmployee({
  refRBSheet,
  data,
}: {
  refRBSheet: any;
  data?: itemManageEmployee;
}) {
  const {data: roles} = useGetRolesQuery('');
  const [team, setTeam] = useState<Team[]>([]);
  const [team_id, setTeamId] = useState<number | undefined>();
  const [branche_id, setBranche_id] = useState<number | undefined>();
  const [role, setRole] = useState(data?.roles[0]?.name);
  const [status, setStatus] = useState<boolean>();
  const [last_name, setLast_name] = useState(data?.last_name);
  const [first_name, setFirst_name] = useState(data?.first_name);
  const [email, setEmail] = useState(data?.email);
  const [phone, setPhone] = useState(data?.phone);
  const [password, setPassword] = useState('');
  const {data: branches} = useGetBranchesQuery({
    option: '?include=teams',
  });
  useEffect(() => {
    setTeamId(data?.team?.id);
    setBranche_id(data?.branch_id);
    setRole(data?.roles[0]?.name);
    setEmail(data?.email);
    setPhone(data?.phone);
    setLast_name(data?.last_name);
    setFirst_name(data?.first_name);
    setStatus(data?.status);
  }, [data]);
  const [ChangeUser, {isLoading}] = useChangeUserMutation();
  const Submit = async () => {
    try {
      const datas = await ChangeUser({
        id: data?.id,
        data: {
          password: password ? password : '',
          password_confirmation: password,
          phone: phone,
          status: status,
          email: email,
          first_name: first_name,
          last_name: last_name,
          branch_id: branche_id,
          roles: role,
          team_id: team_id,
          user_type: 'MEMBER',
        },
      }).unwrap();
    } catch (error: any) {
      console.log(error.data.payload.errors);
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
        container: {
          height: sizes.height * 0.6,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 20,
        },
      }}>
      <Text style={styles.title}>Chỉnh sửa nhân viên</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        // bounces={false}
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
            defaultValueByIndex={branches?.data?.findIndex(
              (item: Team) => item?.id === data?.branch_id,
            )}
          />
          <Select
            data={team}
            setSelect={val => setTeamId(val?.id)}
            defaultButtonText={data?.team?.name}
            disabled={team.length === 0 ? true : false}
            defaultValueByIndex={team.findIndex(
              item => item.id === data?.team_id,
            )}
          />
          <Select
            data={roles?.data}
            setSelect={val => setRole(val?.name)}
            defaultButtonText="Vai trò"
            defaultValueByIndex={roles?.data.findIndex(
              (item: Team) => item.id === data?.roles[0]?.id,
            )}
          />
          <TextInputCustom
            placeholder="Họ và đệm"
            value={last_name}
            setValue={setLast_name}
          />
          <TextInputCustom
            placeholder="Tên"
            value={first_name}
            setValue={setFirst_name}
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
          <SelectStatusUser
            setSelect={val => {
              setStatus(val?.status);
            }}
            select={status}
          />
          <TextInputCustom
            placeholder="Mật khẩu mới"
            value={password}
            setValue={setPassword}
          />

          <DoubleButton
            loading={isLoading}
            conFirm={Submit}
            cancel={async () => await refRBSheet.current.close()}
          />
        </View>
      </ScrollView>
    </RBSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    ...stylesCustom.txtTitle1,
    color: colors.text,
    alignSelf: 'center',
  },
});
