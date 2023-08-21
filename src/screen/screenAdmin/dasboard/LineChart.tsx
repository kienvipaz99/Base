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
import {dataChart} from '../../../res/feckData/dataChart';
import {
  DataSelectChart,
  MChart,
  YChart,
} from '../../../res/data/DataSelectChart';
import {useGetDashboardChartQuery} from '../../../redux/api/auth.api';
import {getCurrentDate, getCurrentMonthDays} from '../../../res/convert';

export default function LineChart() {
  const [select, setSelect] = useState(1);
  const {data} = useGetDashboardChartQuery({
    month: `${getCurrentDate().month}`,
    year: `${getCurrentDate().year}`,
  }) as any;
  const today = new Date();
  let numberdayMonth = getCurrentMonthDays();
  const sevenDaysArray = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    sevenDaysArray.push(Number(day.getDate()));
  }
  let numberDay = sevenDaysArray.reverse();
  const currentData = data?.data?.current || YChart;
  const modifiedData = currentData?.map((item: number, index: number) => {
    const cutValue = item / 1000000;
    return {
      x: index + 1,
      y: cutValue,
    };
  });
  const result = [];

  for (let i = 0; i < numberDay?.length; i++) {
    const day = numberDay[i];

    result?.push(modifiedData[day - 1]);
  }

  return (
    <>
      {data && (
        <>
          {/* @ts-ignore */}
          <Chart
            key={'1111'}
            disableGestures
            style={styles.chart}
            data={
              select === 1
                ? result
                : select === 3
                ? dataChart
                : select === 2
                ? modifiedData
                : undefined
            }
            padding={styles.padding}
            xDomain={{
              min:
                select === 1
                  ? Math?.min(...numberDay)
                  : select === 2
                  ? 1
                  : select === 3
                  ? 1
                  : 1,
              max:
                select === 1
                  ? Math?.max(...numberDay)
                  : select === 3
                  ? dataChart.length
                  : select === 2
                  ? numberdayMonth
                  : 1,
            }}
            yDomain={{
              min: 0,
              max:
                select === 1
                  ? 200
                  : select === 3
                  ? 1200
                  : select === 2
                  ? 500
                  : 1,
            }}>
            <VerticalAxis tickCount={6} />
            <HorizontalAxis
              includeOriginTick={true}
              tickValues={
                select === 1
                  ? numberDay
                  : select === 2
                  ? MChart
                  : select === 3
                  ? YChart
                  : undefined
              }
              theme={{
                axis: {
                  visible: false,
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
        </>
      )}
      <View style={styles.select}>
        {DataSelectChart.map(item => (
          <TouchableOpacity
            key={'dataselect' + item.id}
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
