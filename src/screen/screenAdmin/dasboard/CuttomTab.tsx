import {Pressable, StyleSheet, Text, View, FlatList, Alert} from 'react-native';
import React, {useState} from 'react';
import stylesCustom from '../../../res/stylesCustom';
import {colors} from '../../../res/colors';
import sizes from '../../../res/sizes';
import {
  Circle,
  VictoryContainer,
  VictoryLabel,
  VictoryPie,
} from 'victory-native';
import fonts from '../../../res/fonts';
import {Svg} from 'react-native-svg';
export default function CuttomTab() {
  const [activeTab, setActiveTab] = useState(0);
  const data = [
    {
      x: 1,
      y: 20,
      label: '20%',
      thunhap: '500 Tr',
      team: 'Team Hưng',
      color: 'blue',
    },
    {
      x: 2,

      y: 40,
      label: '30%',
      thunhap: '700 Tr',
      team: 'Team Khánh',
      color: 'green',
    },
    {
      x: 3,

      y: 55,
      label: '40%',
      thunhap: '800 Tr',
      team: 'Team Tuân',
      color: 'red',
    },
  ];
  const data1 = [
    {
      x: 1,
      y: 30,
      label: '30%',
      thunhap: '500 Tr',
      team: 'Hà Nội',
      color: 'blue',
    },
    {
      x: 2,

      y: 20,
      label: '40%',
      thunhap: '700 Tr',
      team: 'Sài Gòn',
      color: 'green',
    },
    {
      x: 3,

      y: 100,
      label: '30%',
      thunhap: '800 Tr',
      team: 'Đà Nẵng',
      color: 'red',
    },
  ];
  const RenderItem = ({item}: any) => {
    return (
      <View style={[stylesCustom.row1, {marginTop: 10}]}>
        <View
          style={{
            backgroundColor: item.color,
            height: 15,
            width: 15,
            borderRadius: 20,
          }}></View>
        <Text style={{marginLeft: 10, color: colors.text, ...stylesCustom.txt}}>
          {item.team}
        </Text>
      </View>
    );
  };
  const [click, setClick] = useState(false);
  return (
    <>
      <View style={[stylesCustom.row1, styles.view]}>
        <Pressable
          style={[
            styles.tab,
            {backgroundColor: activeTab === 0 ? '#00BDB0' : colors.white},
          ]}
          onPress={() => setActiveTab(0)}>
          <Text
            style={[
              styles.txt,
              {color: activeTab === 0 ? colors.white : colors.text},
            ]}>
            Team
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tab,
            {backgroundColor: activeTab === 1 ? '#00BDB0' : colors.white},
          ]}
          onPress={() => setActiveTab(1)}>
          <Text
            style={[
              styles.txt,
              {color: activeTab === 1 ? colors.white : colors.text},
            ]}>
            Khu vực
          </Text>
        </Pressable>
      </View>
      <View style={styles.view1}>
        <Svg height={300}>
          <Circle
            //@ts-ignore
            cx={(sizes.width * 0.8) / 2}
            cy={300 / 2}
            r={50}
            fill="#ECEFF1"
          />
          <VictoryPie
            animate={{
              duration: 2000,
              onLoad: {duration: 1000},
            }}
            standalone={false}
            cornerRadius={10}
            innerRadius={60}
            height={300}
            width={sizes.width * 0.8}
            labelPosition={'centroid'}
            colorScale={['blue', 'green', 'red']}
            data={activeTab === 0 ? data : data1}
            padAngle={2}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: 'labels',
                        //@ts-ignore
                        mutation: (data, {text}) => {
                          setClick(!click);
                          return !click
                            ? {text: data.slice.data.thunhap}
                            : {text: data.slice.data.label};
                        },
                      },
                    ];
                  },
                },
              },
            ]}
            style={{
              labels: {
                fontFamily: fonts.Medium,
                fontSize: 15,
                fill: colors.text,
              },
            }}
          />

          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 20,
              fontFamily: fonts.Regula,
              fill: '#2FB77A',
            }}
            text={`20\n Triệu`}
            verticalAnchor={'middle'}
            x={(sizes.width * 0.8) / 2}
            y={300 / 2}
          />
        </Svg>
        <FlatList
          scrollEnabled={true}
          data={activeTab === 0 ? data : data1}
          renderItem={RenderItem}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            width: sizes.width * 0.8,
            alignSelf: 'center',
          }}
        />
        <Text style={styles.txt}>Hoàn thành: 20%</Text>
        <Text style={styles.txt}>Thực hiện: 20/100 (Tr) </Text>
        <Text style={styles.txt}>
          Thiếu: <Text style={{color: 'orange'}}>80</Text> (Tr)
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tab: {
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colors.white,
    ...stylesCustom.shadowitem,
    marginLeft: 10,
  },
  view: {
    marginTop: 15,
    width: sizes.width * 0.9,
    alignSelf: 'center',
    marginLeft: 30,
  },
  view1: {
    width: sizes.width * 0.9,
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    ...stylesCustom.shadowitem,
    padding: 10,
  },
  txt: {
    fontFamily: fonts.Medium,
    fontSize: 17,
    color: colors.text,
  },
});