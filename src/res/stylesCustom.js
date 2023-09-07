import {StyleSheet} from 'react-native';
import {colors} from './colors';
import sizes from './sizes';
import fonts from './fonts';

const stylesCustom = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  txtLogo: {
    fontSize: sizes.width * 0.07,
    color: colors.blue,
    fontFamily: fonts.bold,
    alignSelf: 'center',
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  row1: {alignItems: 'center', flexDirection: 'row'},
  txtTitle: {fontSize: sizes.width * 0.05, fontFamily: fonts.Medium},
  txtTitle1: {fontSize: sizes.width * 0.06, fontFamily: fonts.bold},

  txt: {fontSize: sizes.width * 0.04, fontFamily: fonts.Regula},
  view1: {
    flex: 1,
    backgroundColor: 'rgb(242,242,242)',
    marginTop: sizes.height * 0.11,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  shadowitem: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
export default stylesCustom;
