import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import stylesCustom from '../../../res/stylesCustom';
import {colors} from '../../../res/colors';
import sizes from '../../../res/sizes';
import {Circle, VictoryLabel, VictoryPie} from 'victory-native';
import fonts from '../../../res/fonts';
import {Svg} from 'react-native-svg';
import {
  useGetBranchesQuery,
  useGetDashboardRevenueQuery,
  useGetTeamRevenueQuery,
} from '../../../redux/api/auth.api';
import {formatCurrency, nam, thang} from '../../../res/convert';
export default function CuttomTab() {
  const [activeTab, setActiveTab] = useState(0);

  const {data, isLoading} = useGetTeamRevenueQuery({
    option: `?append=revenue,revenue_approve,ranges&month=${thang()}&years=${nam()}`,
  });
  const {data: total} = useGetDashboardRevenueQuery('') as any;

  const colorList = [
    '#FF5733',
    '#2ECC71',
    '#3498DB',
    '#E74C3C',
    '#9B59B6',
    '#FF9900',
    '#CC9999',
    '#00DD00',
    '#001100',
    'black',
    'yellow',
  ];
  const totalRevenue: any = data?.data.reduce(
    (sum, item: RevenueTeam) => sum + item?.revenue_approve,
    0,
  );
  const {data: dataBranches} = useGetBranchesQuery({
    option: `?append=revenue,revenue_approve,revenue_today,ranges`,
  });
  const dataBran = dataBranches?.data.map((item: RevenueTeam, index) => {
    return {
      ...item,
      x: item?.id,
      y: item?.revenue_approve !== null ? item?.revenue_approve : 0,
      label:
        item?.revenue_approve !== null
          ? formatCurrency(item?.revenue_approve)
          : 0,
      color: colorList[index % colorList.length],
    };
  });
  const modifiedData = data?.data.map((item: Branches, index) => {
    return {
      ...item,
      x: item?.id,
      y: item?.revenue_approve !== null ? item?.revenue_approve : 0,
      label:
        item?.revenue_approve !== null
          ? formatCurrency(item?.revenue_approve)
          : 0,
      color: colorList[index % colorList.length],
    };
  });
  const allZero = modifiedData?.every(item => item.y === 0);
  const dataFilter = modifiedData?.filter(item => item?.y !== 0);
  const dataFilterBrans = dataBran?.filter(item => item?.y !== 0);

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
          {item.name}
        </Text>
      </View>
    );
  };
  const [click, setClick] = useState(false);
  return (
    <View style={{zIndex: 999}}>
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
        {isLoading ? (
          <View
            style={{
              height: 350,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <>
            <Svg height={260}>
              <Circle
                // @ts-ignore
                cx={(sizes.width * 0.8) / 2}
                cy={260 / 2}
                r={35}
                fill="#ECEFF1"
              />
              <VictoryPie
                animate={{
                  duration: 0,
                  onLoad: {duration: 0},
                }}
                standalone={false}
                cornerRadius={10}
                innerRadius={40}
                height={260}
                width={sizes.width * 0.8}
                labelPosition={'centroid'}
                colorScale={allZero ? ['#ccc'] : colorList}
                data={
                  activeTab === 0
                    ? allZero
                      ? [{x: 0, y: 1}]
                      : dataFilter
                    : dataFilterBrans
                }
                padAngle={2}
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onPress: () => {
                        return [
                          {
                            target: 'labels',

                            mutation: (data: any, {text}: {text: string}) => {
                              setClick(!click);
                              return !click
                                ? {
                                    text:
                                      data?.slice?.data?.label !== 0
                                        ? data?.slice?.data?.label
                                        : '',
                                  }
                                : {
                                    text:
                                      (
                                        (data?.slice?.data?.revenue /
                                          totalRevenue) *
                                        100
                                      ).toFixed(1) + '%',
                                  };
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
                    fontSize: 14,
                    fill: colors.text,
                  },
                }}
              />

              <VictoryLabel
                textAnchor="middle"
                style={{
                  fontSize: 17,
                  fontFamily: fonts.Regula,
                  fill: '#2FB77A',
                }}
                text={`${
                  totalRevenue !== 0 ? formatCurrency(totalRevenue) : 0
                }\n Triệu`}
                verticalAnchor={'middle'}
                x={(sizes.width * 0.8) / 2}
                y={264 / 2}
              />
            </Svg>
            <FlatList
              scrollEnabled={true}
              //@ts-ignore
              data={activeTab === 0 ? modifiedData : dataBran}
              renderItem={RenderItem}
              numColumns={2}
              columnWrapperStyle={styles.columWrap}
            />
            <View style={{marginTop: 15}}>
              <Text style={styles.txt}>
                Hoàn thành:{' '}
                {((totalRevenue / total?.data?.totalKpiMonth) * 100).toFixed(2)}
                %
              </Text>
              <Text style={styles.txt}>
                Thực hiện: {totalRevenue ? formatCurrency(totalRevenue) : 0} /{' '}
                {total?.data?.totalKpiMonth
                  ? formatCurrency(total?.data?.totalKpiMonth)
                  : 0}{' '}
                (Tr){' '}
              </Text>
              <Text style={styles.txt}>
                Thiếu:{' '}
                <Text style={{color: 'orange'}}>
                  {total?.data?.totalKpiMonth <= totalRevenue
                    ? 0
                    : totalRevenue - total?.data?.totalKpiMonth}
                </Text>{' '}
                (Tr)
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
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
  columWrap: {
    justifyContent: 'space-between',
    width: sizes.width * 0.8,
    alignSelf: 'center',
  },
});
