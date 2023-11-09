import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  FlatList,
  BackHandler,
  ScrollView,
  Dimensions,
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'

import Header from '../../components/header'
import colors from '../../constants/colors'
import globalStyles from '../../constants/globalStyles'
import Botton from '../../components/button'
import { fontFamily, fontSize } from '../../constants/fonts'

import sugaService from '../../services/linechartdatatest'
import chartConfig from '../../components/chartconfig'
import { getKetoneLastRecord } from '../../services/api/ketone_value'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns'

import {
  LineChart,
} from "react-native-chart-kit";

const { width, height } = Dimensions.get('screen');

const Sugar = ({ navigation, route }) => {

  const [data, setData] = useState([])

  const getData = async () => {
    let userId = await AsyncStorage.getItem('id');
    let res = await getKetoneLastRecord({
      patient_id: userId,
      day: 30,
    })
    setData(res.data)
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header hideButton={true} title={'กราฟวัดน้ำตาล'} />
      <ScrollView>
        <View style={{
          ...globalStyles.screen_padding,
          // justifyContent: 'space-between'
        }}>
          <View style={{ paddingHorizontal: 10, marginTop: -32 }}>
            <View style={styles.underline}>
              <Text style={styles.textinput}>ระดับ</Text>
              <Text style={styles.textinput}>ค่าระดับ</Text>
            </View>
            <LineChart
              style={{ alignSelf: 'center' }}
              data={sugaService}
              width={width * 90 / 100}
              height={220}
              chartConfig={chartConfig}
              bezier
            />
            <View style={styles.underline}>
              <Text style={styles.textinput}  >ดูย้อนหลัง</Text>
              <Text style={styles.textinput}  >ตัวเลือก</Text>
            </View>
            <ScrollView
              contentContainerStyle={{
                width: '100%',
                height: 240,
                backgroundColor: 'white'
              }}
            >
              <View style={{ backgroundColor: colors.blue, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...styles.column_header, width: '55%' }}>วันที่</Text>
                <Text style={{ ...styles.column_header, width: '45%' }}>ค่าน้ำตาล</Text>
              </View>


              {data.map((item, index) =>
                <View key={index.toString()} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ ...styles.column_inside, width: "55%" }}>{format(new Date(item.created_at), 'dd-MM-yyyy HH:mm') }</Text>
                  <Text style={{ ...styles.column_inside, width: "45%" }}>{item.value}</Text>
                </View>
              )}

            </ScrollView>

            <Botton
              text='วัดค่า'
              textStyle={{
                alignSelf: 'center'
              }}
              containerStyle={{
                paddingHorizontal: 16,
                marginTop: 16,
                marginBottom: 32,
                flexDirection: 'column',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: 220
              }}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('SugarMeasure')}
            >
            </Botton>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Sugar

const styles = StyleSheet.create({
  underline: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // borderBottomColor: '#FFD3E9',
    // borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 5
  },
  textinput: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.titleboty,
    color: colors.blue_transparent_1,
    marginTop: 15,

  },
  column_header: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.font_10,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  column_inside: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.font_10,
    color: colors.blue_transparent_1,
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6
  },
})