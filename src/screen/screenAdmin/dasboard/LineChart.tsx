import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import sizes from '../../../res/sizes';
import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
  Tooltip,
} from 'react-native-responsive-linechart';
import fonts from '../../../res/fonts';
import {colors} from '../../../res/colors';
import stylesCustom from '../../../res/stylesCustom';
import {SevenDay, dataChart, dataMonth} from '../../../res/feckData/dataChart';
import {
  DChart,
  DataSelectChart,
  MChart,
  YChart,
} from '../../../res/data/DataSelectChart';

export default function LineChart() {
  const [select, setSelect] = useState(1);

  return (
    <>
      {/*@ts-ignore */}
      <Chart
        style={styles.chart}
        data={
          select === 1
            ? SevenDay
            : select === 3
            ? dataChart
            : select === 2
            ? dataMonth
            : []
        }
        padding={styles.padding}
        xDomain={{
          min: select === 1 ? 2 : select === 2 ? 1 : select === 3 ? 1 : 1,
          max:
            select === 1
              ? SevenDay.length + 1
              : select === 3
              ? dataChart.length
              : select === 2
              ? dataMonth.length
              : 1,
        }}
        yDomain={{min: 0, max: 1000}}>
        <VerticalAxis tickCount={6} />
        <HorizontalAxis
          includeOriginTick={false}
          tickValues={
            select === 1
              ? DChart
              : select === 2
              ? MChart
              : select === 3
              ? YChart
              : undefined
          }
          theme={{
            axis: {
              visible: true,
              stroke: {
                color: '#bbb',
                width: 2,
                opacity: 1,
              },
              dy: 0,
            },

            grid: {
              visible: true,
              stroke: {
                color: '#ccc',
                width: 1,
                opacity: 1,
              },
            },
            labels: {
              visible: true,
              label: {
                color: colors.text,
                fontSize: 14,

                textAnchor: 'middle',
                dx: 0,
                dy: -15,
                fontFamily: fonts.Regula,
              },
              formatter: (v: number) => String(v),
            },
          }}
        />
        <Area
          theme={{
            gradient: {
              from: {color: '#ffa502'},
              to: {color: '#ffa502', opacity: 0.4},
            },
          }}
        />
        <Line
          theme={{
            stroke: {color: '#ffa502', width: 5},
            scatter: {default: {width: 4, height: 4, rx: 2}},
          }}
          smoothing="cubic-spline"
          tooltipComponent={<Tooltip />}
        />
      </Chart>
      <View style={styles.select}>
        {DataSelectChart.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.btn,
              {backgroundColor: select === item.id ? '#00BDB0' : undefined},
            ]}
            onPress={() => setSelect(item.id)}>
            <Text
              style={[
                styles.txt,
                {color: select === item.id ? colors.white : colors.text},
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  chart: {height: 300, width: sizes.width},
  padding: {left: 30, bottom: 20, right: 30, top: 25},
  select: {
    ...stylesCustom.row1,
    justifyContent: 'space-around',
    width: sizes.width * 0.5,
    alignSelf: 'center',
    marginTop: 20,
  },
  btn: {
    height: 30,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  txt: {
    fontFamily: fonts.Regula,
    fontSize: 15,
  },
});
