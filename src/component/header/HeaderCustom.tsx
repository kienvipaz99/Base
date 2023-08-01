import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import sizes from '../../res/sizes';
import stylesCustom from '../../res/stylesCustom';
import {colors} from '../../res/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function HeaderCustom({
  title,
  sharp,
}: {
  title: string;
  sharp?: boolean;
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
          <View style={{}}>
            <Text style={styles.txt}>{title}</Text>
            {sharp && (
              <Ionicons
                name="funnel-sharp"
                color={colors.white}
                size={29}
                style={{
                  position: 'absolute',
                  right: 10,
                  justifyContent: 'center',
                }}
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
});
