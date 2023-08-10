import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {VictoryAxis, VictoryBar, VictoryChart} from 'victory-native';
import fonts from '../../../res/fonts';
import {colors} from '../../../res/colors';

export default function StatisticalChart() {
  return (
    <>
      <VictoryChart
        animate={{
          duration: 2000,
          onLoad: {duration: 500},
        }}
        domainPadding={{x: 0}}>
        <VictoryAxis />
        <VictoryBar
          barRatio={1}
          cornerRadius={{topLeft: 7, topRight: 7}}
          style={{
            data: {
              fill: colors.blue,
            },

            labels: {
              fontFamily: fonts.Regula,
              fontSize: 15,
              fill: colors.text,
            },
          }}
          alignment="middle"
          labels={({datum}) => `${datum.y}`} // <-- important
          data={[
            {x: '1', y: 150},
            {x: '2', y: 250},
            {x: '3', y: 100},
            {x: '4', y: 750},
            {x: '5', y: 100},
            {x: '6', y: 150},
            {x: '7', y: 250},
            {x: '8', y: 100},
            {x: '9', y: 750},
            {x: '10', y: 100},
            {x: '11', y: 100},
            {x: '12', y: 100},
          ]}
        />
      </VictoryChart>
    </>
  );
}

const styles = StyleSheet.create({});
