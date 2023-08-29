import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {ngaythang} from '../../res/convert';

export default function ModaleDate({
  openDate,
  setOpenDate,
  selectDay,
}: {
  openDate: boolean;
  setOpenDate: (val: boolean) => void;
  selectDay: (val: string) => void;
}) {
  return (
    <DateTimePickerModal
      isVisible={openDate}
      mode="date"
      onConfirm={(date: Date) => {
        selectDay(ngaythang(date));

        setOpenDate(false);
      }}
      onCancel={() => setOpenDate(false)}
    />
  );
}

const styles = StyleSheet.create({});
