import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizes from '../../../res/sizes';
import {colors} from '../../../res/colors';
import fonts from '../../../res/fonts';
import stylesCustom from '../../../res/stylesCustom';
import {Image} from 'react-native';
import images from '../../../res/images';
import LinearGradient from 'react-native-linear-gradient';

export default function HeaderRank() {
  return (
    <View style={styles.view}>
      <View style={styles.view1}>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#F79D81', '#C04566']}
          style={styles.img}>
          <Image source={images.anh} style={styles.img2} />
        </LinearGradient>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#F79D81', '#C04566']}
          style={styles.linerGradien}>
          <Text style={styles.txt4}>2</Text>
        </LinearGradient>
        <View style={styles.view2}>
          <Text style={styles.txt1}>Trần Quang Huy</Text>
          <Text style={styles.txt2}>Team Kiên</Text>
          <Text style={styles.txt3}>Key: 216</Text>
        </View>
      </View>
      <View style={styles.view1}>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#FBB45B', '#E55E24']}
          style={styles.img}>
          <Image source={images.anh} style={styles.img2} />
        </LinearGradient>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#FBB45B', '#E55E24']}
          style={styles.linerGradien}>
          <Text style={styles.txt4}>3</Text>
        </LinearGradient>
        <View style={styles.view2}>
          <Text style={styles.txt1}>Trương Tất Toàn</Text>
          <Text style={styles.txt2}>Team Kiên</Text>
          <Text style={styles.txt3}>Key: 216</Text>
        </View>
      </View>
      <View style={styles.view3}>
        <View style={styles.view4}>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            colors={['#6E69F7', '#E496E7']}
            style={[styles.img, styles.img1]}>
            <Image source={images.anh} style={styles.img3} />
          </LinearGradient>
          <Image source={images.crown} style={styles.crown} />
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            colors={['#6E69F7', '#E496E7']}
            style={styles.linerGradien1}>
            <Text style={styles.txt4}>1</Text>
          </LinearGradient>
          <View style={{top: -15, alignItems: 'center'}}>
            <Text
              style={[
                styles.txt1,
                {
                  color: colors.text,
                },
              ]}>
              Nguyễn Văn Kiên
            </Text>
            <Text style={styles.txt2}>Team Kiên</Text>
            <Text style={styles.txt3}>Key: 300</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: sizes.width * 0.9,
    ...stylesCustom.row,
    backgroundColor: '#646464',
    padding: 8,
    alignSelf: 'center',
    marginTop: 100,
    borderRadius: 15,
    ...stylesCustom.shadowitem,
  },
  view1: {width: sizes.width * 0.26, alignItems: 'center'},
  txt1: {
    color: colors.white,
    fontSize: 17,
    fontFamily: fonts.Medium,
    textAlign: 'center',
  },
  txt2: {
    color: '#BAB7B7',
    fontSize: 16,
    fontFamily: fonts.Regula,
    marginTop: 5,
  },
  txt3: {
    color: '#0BA72D',
    fontSize: 16,
    fontFamily: fonts.Regula,
    marginTop: 5,
  },
  img: {
    height: 70,
    width: 70,
    top: -45,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view2: {alignItems: 'center', marginTop: -35},
  view3: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    width: sizes.width * 0.9,
  },
  view4: {
    backgroundColor: colors.white,
    width: sizes.width * 0.3,
    padding: 8,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 200,
    bottom: 17,
  },
  crown: {position: 'absolute', top: -60, left: -2},
  img1: {height: 80, width: 80},
  linerGradien: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  linerGradien1: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  img2: {height: 65, width: 65, borderRadius: 60},
  img3: {height: 70, width: 70, borderRadius: 60},
  txt4: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 15,
  },
});
