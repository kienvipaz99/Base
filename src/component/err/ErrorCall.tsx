import {StyleSheet, Text} from 'react-native';
import React from 'react';

import sizes from '../../res/sizes';
import fonts from '../../res/fonts';
import {colors} from '../../res/colors';
interface Props {
  err: string | undefined;
}
export default function ErrorText(props: Props) {
  return <>{props.err && <Text style={styles.txt}>{props.err}</Text>}</>;
}

const styles = StyleSheet.create({
  txt: {
    color: colors.red,
    fontFamily: fonts.Regula,
    fontSize: sizes.width * 0.03,
    marginTop: 5,
    alignSelf: 'center',

    width: sizes.width * 0.8,
    textAlign: 'right',
  },
});
