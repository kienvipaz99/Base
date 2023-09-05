import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import sizes from '../../res/sizes';
import DoubleButton from '../btn/DoubleButton';
import {useGetEmployeeQuery} from '../../redux/api/auth.api';
import Select from '../select/Select';
import fonts from '../../res/fonts';
import ModaleDate from '../modal/ModaleDate';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function BottomSheetFillter({
  refRBSheet,
  params,
  isLoading,
}: {
  refRBSheet: any;
  params: (val: string) => void;
  isLoading: boolean;
}) {
  const {data: Employee} = useGetEmployeeQuery({
    option: ``,
    per_page: -1,
  });

  const Invoid = [
    {
      id: 2,
      name: 'Quản lý User',
      params: 'App\\Models\\User',
    },
    {
      id: 3,
      name: 'Quản lý hoá đơn',
      params: 'App\\Models\\Invoice',
    },
    {
      id: 4,
      name: 'Quản lý key bản quyền',
      params: 'App\\Models\\PlanSubscription',
    },
  ];
  const [openDate, setOpenDate] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [openDate1, setOpenDate1] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [idEmployee, setIDEmployee] = useState<number | string>();
  const [typeInvoid, setTypeInvoid] = useState<string>();

  const Confirm = () => {
    const type = typeInvoid ? `&filter[subject_type]=${typeInvoid}` : '';
    const ids = idEmployee ? `&filter[causer.id]=${idEmployee}` : '';
    const time =
      startDate && endDate ? `&filter[created_at]=${startDate};${endDate}` : '';
    params(type + ids + time);
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
      <Text style={styles.title}>Áp dụng bộ lọc</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets>
        <View style={{paddingBottom: 30}}>
          <Select
            setSelect={val => {
              const serverData = val?.params;
              const clientData = serverData.replace(/\\/g, '\\\\');
              setTypeInvoid(clientData);
            }}
            data={Invoid}
            defaultButtonText="Chọn chức năng"
            icons={typeInvoid ? 'close-circle' : ''}
            onPressIcon={() => setTypeInvoid('')}
            holder="Chọn chức năng"
            select={typeInvoid}
          />
          <Select
            holder="Chọn nhân viên"
            setSelect={val => setIDEmployee(val?.id)}
            data={Employee?.data}
            defaultButtonText="Chọn nhân viên"
            icons={idEmployee ? 'close-circle' : ''}
            onPressIcon={() => setIDEmployee('')}
            select={idEmployee}
          />
          <Text style={styles.txt}>Ngày áp dụng</Text>
          <Pressable style={styles.calenda} onPress={() => setOpenDate(true)}>
            <Text style={styles.txt1}>
              {startDate ? startDate : 'Chọn ngày bắt đầu'}
            </Text>
            {startDate && (
              <MaterialIcons
                name="cancel"
                color={colors.text}
                size={25}
                onPress={() => setStartDate('')}
              />
            )}
          </Pressable>
          <Pressable style={styles.calenda} onPress={() => setOpenDate1(true)}>
            <Text style={styles.txt1}>
              {endDate ? endDate : 'Chọn ngày kết thúc'}
            </Text>

            {endDate && (
              <MaterialIcons
                name="cancel"
                color={colors.text}
                size={25}
                onPress={() => setEndDate('')}
              />
            )}
          </Pressable>
          <DoubleButton
            loading={isLoading}
            conFirm={Confirm}
            cancel={async () => await refRBSheet.current.close()}
          />
        </View>
      </ScrollView>
      <ModaleDate
        openDate={openDate}
        setOpenDate={setOpenDate}
        selectDay={setStartDate}
      />
      <ModaleDate
        openDate={openDate1}
        setOpenDate={setOpenDate1}
        selectDay={setEndDate}
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
  txt: {
    width: sizes.width * 0.9,
    alignSelf: 'center',
    marginTop: 15,
    color: colors.text,
    fontFamily: fonts.Regula,
    fontSize: sizes.width * 0.04,
  },
  calenda: {
    width: sizes.width * 0.9,
    height: 50,
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.gray2,
    paddingHorizontal: 10,
    marginTop: 15,
    ...stylesCustom.row,
  },
  txt1: {
    color: colors.text,
    fontFamily: fonts.Regula,
    fontSize: sizes.width * 0.04,
  },
});
