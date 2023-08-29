import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import {colors} from '../../../res/colors';
import sizes from '../../../res/sizes';
import stylesCustom from '../../../res/stylesCustom';
import fonts from '../../../res/fonts';
import {Image} from 'react-native';
import {ExpandingDot} from 'react-native-animated-pagination-dots';

interface Props {
  isShow?: boolean;
  toggleDate?: () => void;
  title?: string;
  image: Images[];
}
const ViewImage = (props: Props) => {
  const scrollX = React.useRef(new Animated.Value(0))?.current;
  const renderContent = () => {
    return (
      <View style={styles.content}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={props.image}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item}: {item: Images}) => (
            <Image
              source={{uri: item?.full_url}}
              resizeMode="cover"
              style={styles.img}
            />
          )}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          pagingEnabled
          horizontal
          decelerationRate={'normal'}
          scrollEventThrottle={16}
        />
      </View>
    );
  };

  return (
    <View>
      <Modal
        visible={props.isShow}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}>
        <View style={styles.container1}>
          <TouchableWithoutFeedback onPress={props.toggleDate}>
            <View style={{zIndex: 0, flex: 1, height: '100%', width: '100%'}} />
          </TouchableWithoutFeedback>
          <View style={styles.content}>{renderContent()}</View>
        </View>
      </Modal>
    </View>
  );
};
export default ViewImage;
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.68)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: sizes.width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',

    padding: 10,
    height: sizes.height * 0.7,
  },
  title: {...stylesCustom.txtTitle1, color: colors.blue},
  view: {
    height: 45,
    width: sizes.width * 0.8,
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 15,
    borderColor: colors.gray2,
    borderWidth: 1,
    ...stylesCustom.row,
    paddingHorizontal: 8,
    fontFamily: fonts.Regula,
    fontSize: sizes.width * 0.04,
    color: colors.text,
  },
  img: {
    height: sizes.height * 0.7,
    width: sizes.width * 0.9,
    borderRadius: 10,
  },
});
