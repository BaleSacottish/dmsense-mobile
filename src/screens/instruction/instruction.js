import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { StackScreenProps } from '@react-navigation/stack'
import testrecom from '../../constants/testrecom'
import globalStyles2 from '../../constants/globalStyles2'
import colors from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/fonts'
import Botton from '../../components/button'
import Header from '../../components/header'

const instructions = [
  {
    id: 1,
    instruction: 'ใส่หลอดเป่าเข้าไปที่ช่องเสียบหลอดเป่า',
    path: require('../../assets/images/instruction/1.png')
  },
  {
    id: 2,
    instruction: 'เปิดสวิชท์เครื่องด้านข้าง แล้วหน้าจอแสดงผลบนเครื่องเปิดขึ้น',
    path: require('../../assets/images/instruction/2.png')
  },
  {
    id: 3,
    instruction: `เครื่องเมื่อเปิดเครื่องแล้ว ไฟแสดงสถานะ “สีแดง” (หมายถึง เครื่องกำลังเตรียมพร้อมสำหรับการเป่า) เมื่อเครื่องพร้อมทำงานก็จะมีีไฟแสดงสถานะขึ้น “สีเขียว” และมีตัวอักษรแสดงไว้ที่จอ คำว่า Blow และให้ทำการเป่าทันที\n*** ไฟแสดงสถานะ จะใช้หลอดเดียวเป็น RGB แสดงได้สองสีในหลอดเดียว`,
    path: require('../../assets/images/instruction/3.png')
  },
  {
    id: 4,
    instruction: 'การเป่าลม ให้กดปุ่ม start อมที่หลอดเป่า แล้วเป่าด้วยลมแรงเสมอกันต้องไม่ขาดช่วง เครื่องจะนับถอยหลัง 15 วินาที จนมีเสียงเตือนให้หยุดเป่า',
    path: require('../../assets/images/instruction/4.png')
  },
  {
    id: 5,
    instruction: `เมื่อหยุดเป่าแล้ว เครื่องจะทำการประเมินผล และอ่านค่าให้ที่ จอภาพแสดงผล ว่ามีระดับน้ำตาลในเลือดเท่าไหร่\n*** ค่าที่แสดงผลบนจอ จะแสดงผลเป็น BHB, ACE, ระดับน้ำตาล`,
    path: require('../../assets/images/instruction/5.png')
  },
  {
    id: 6,
    instruction: 'เมื่อเครื่องแสดงผลที่หน้าจอแล้ว ทำการปิดสวิชท์เครื่องด้านข้าง',
    path: require('../../assets/images/instruction/6.png')
  },
]

const page = [
  {
    index: 0,
    page: [1]
  },
  {
    index: 1,
    page: [2, 3]
  },
  {
    index: 2,
    page: [4, 5]
  },
  {
    index: 3,
    page: [6]
  },
]

/**
 * @param {StackScreenProps<any, any>} props
 */

const Instruction = ({ navigation, route }) => {

  const index = route.params?.instructionIndex || 0;
  const type = route.params?.type;

  const next = () => {
    if (index + 1 >= page.length) {
      navigation.navigate('BluetoothFindDevice')

      return;
    }

    navigation.push('Instruction', {
      instructionIndex: index + 1
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={'วัด' + type} />
      <View style={{
        ...globalStyles2.welcome_padding,
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {
          index == 0 ? (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontFamily: fontFamily.bold, fontSize: fontSize.font_18, color: colors.blue, alignSelf: 'center', marginTop: '10%' }}>วิธีใช้งาน</Text>
              <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_16, color: colors.blue_transparent_5, marginTop: 32, width: '100%', alignSelf: 'center' }}>{`วิธีใช้เครื่องวัดระดับ${type} ด้วยลมหายใจ`}</Text>
            </View>
          ) : null
        }

        <View>
        {
          page.find(f => f.index == index).page.map((item, ind) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
              <View style={{ width: '50%', marginRight: 15, alignItems: 'center', }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: 30, height: 30, borderColor: colors.blue_transparent_5, borderRadius: 20, borderWidth: 1 }}>
                  <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_14, color: colors.blue_transparent_5, borderRadius: 20, }}>{item}</Text>
                </View>
                <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_12, color: colors.blue_transparent_1, marginTop: 10 }}>{instructions[item - 1].instruction}</Text>
              </View>
              <Image source={instructions[item - 1].path} style={styles.Imageheader} />
            </View>
          ))
        }
        </View>

        <Botton
          text='ถัดไป'
          textStyle={{
            alignSelf: 'center'
          }}
          containerStyle={{
            paddingHorizontal: 16,
            marginTop: 40,
            marginBottom: 48,
            flexDirection: 'column',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: 220
          }}
          activeOpacity={0.75}
          onPress={() => next()}
        >
        </Botton>

      </View>
    </SafeAreaView>

  )
}

export default Instruction;

const styles = StyleSheet.create({
  Imageheader: {
    width: 120,
    height: 200,
    borderRadius: 20
  },

})