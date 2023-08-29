import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import sizes from '../../res/sizes';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProp} from '@react-navigation/native';
export default function HeaderCustom({
  title,
  sharp,
  back,
  onBackPress,
  OnPressSharp,
}: {
  title: string;
  sharp?: boolean;
  back?: boolean;
  onBackPress?: () => void;
  OnPressSharp?: () => void;
}) {
  const isAdroid = Platform.OS === 'android';
  return (
    <View style={styles.view}>
      <LinearGradient
        style={styles.view}
        colors={['#FE823C', '#D8550B', '#FE823C']}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1.1}}>
        <SafeAreaView>
          <View>
            {back && (
              <Ionicons
                onPress={onBackPress}
                name="caret-back-outline"
                size={30}
                color={colors.white}
                style={styles.back}
              />
            )}
            <Text style={styles.txt}>{title}</Text>
            {sharp && (
              <Ionicons
                onPress={OnPressSharp}
                name="funnel-sharp"
                color={colors.white}
                size={29}
                style={styles.sharp}
              />
            )}
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: sizes.height * 0.15,
    width: sizes.width,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    ...stylesCustom.txtTitle1,
    color: colors.white,
    textTransform: 'uppercase',
    width: sizes.width,
    textAlign: 'center',
  },
  back: {
    position: 'absolute',
    left: 10,
    justifyContent: 'center',
    zIndex: 100,
  },
  sharp: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
  },
});
