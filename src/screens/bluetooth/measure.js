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
  NativeModules,
  NativeEventEmitter,
} from 'react-native'
import React, { useState, useRef, useEffect, useCallback } from 'react'

import Header3 from '../../components/header3'
import globalStyles from '../../constants/globalStyles'
import Botton from '../../components/button'
import colors from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/fonts'

import { ActivityIndicator } from 'react-native-paper'

import AsyncStorage from '@react-native-async-storage/async-storage'

import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
} from 'react-native-ble-manager';

import { Buffer } from 'buffer';
import { read } from 'fs'
const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);




async function getItems() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
}

const serviceId = "0000FFE0-0000-1000-8000-00805F9B34FB";
const characteristicId = "0000FFE1-0000-1000-8000-00805F9B34FB";

const buffer = Buffer.from([257, 257.5, -255, '1']);

/**
 * @param {StackScreenProps<any, any>} props
 */

const BluetoothMeasure = ({ route, navigation, connect, disconnect, props, }) => {
  const type = route.params?.type;

  const peripherals = new Map();
  let bluetooth = route.params.getBLEID;
  const [bluetooths, setBluetooths] = useState([]);

  const [animate, setAnimate] = useState(true);

  const timerRef = React.useRef(null)

  const [loading, setLoading] = useState(true);

  const [bluetoothR, setBluetoothR] = useState();

  const [getdata, setGetdata] = useState();
  const [time, setTime] = useState()
  const [value, setValue] = useState()

  // const dataArray = [];

  //animation
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      
      // console.log('send Data to next page ' +  (readData[0]))
      // console.log('send Data to next page ' +  value)
      // code for navigation
    }, 5000);

    return () => clearTimeout(timerRef.current);
  }, []);



  useEffect(() => {
    getItems().then((items) => {
      readData([])
      setLoading(false);
    });
  }, []);



  const readData = () => {
    BleManager.read(
      bluetooth,
      "0000FFE0-0000-1000-8000-00805F9B34FB",
      '0000FFE1-0000-1000-8000-00805F9B34FB',
    ).then((readData) => {

      // dataArray.push(readData);
      // setGetdata(readData);
      // Success code
      console.log(readData);
      setValue(readData[2])
      console.log("TypeOf: " + typeof(readData));
      console.log("Read: " + readData[2]);
      navigation.navigate('BluetoothResult', { ...route.params, "value" : readData[2] });
      // console.log((readData[1]))
      

      // console.log((readData[ชม,นาที,ค่าที่วัดได้]))
      // const buffer = Buffer.from(readData);
      // const sensorData = buffer.readUInt8(1, true);


    })
      .catch((error) => {
        // Failure code
        console.log(error);
      });
  }











  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Header3 /> */}
      <View style={{
        ...globalStyles.connectDevice_padding,
        justifyContent: 'space-between'
      }}>
        <View>
          <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_18, color: colors.white, alignSelf: 'center', marginTop: '10%' }}>{`วัดค่า${type}ในเลือด`}</Text>
        </View>
        <View>
          <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_18, color: colors.white, alignSelf: 'center', marginTop: '10%' }}>เชื่อมต่ออุปกรณ์</Text>
          <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_18, color: colors.pink, alignSelf: 'center', marginTop: '10%' }}>สำเร็จ!</Text>
          <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_18, color: colors.pink, alignSelf: 'center', }}>{`กำลังวัดค่า${type}ในเลือด`}</Text>
        </View>

        {/* {loading ? */}
        <ActivityIndicator
          animating={animate}
          size="large"
          style={{ marginTop: 30 }}
          color='white'


        />

        <TouchableOpacity
          onPress={() => navigation.navigate('BluetoothResult')}
        >
          <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_18, color: colors.pink, alignSelf: 'center', marginTop: '10%', marginBottom: 40 }}>โปรดรอสักครู่...</Text>
        </TouchableOpacity>


      </View>
    </SafeAreaView>
  )
}

export default BluetoothMeasure