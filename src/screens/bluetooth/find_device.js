import { View, Text, SafeAreaView, StyleSheet, NativeModules, NativeEventEmitter, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import Loadedbuletooth from '../../components/loadedbuletooth'

import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
} from 'react-native-ble-manager';
import { StackScreenProps } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons'
import globalStyles from '../../constants/globalStyles'
import Header from '../../components/header'
import colors from '../../constants/colors'
import Botton from '../../components/button'


import { fontFamily, fontSize } from '../../constants/fonts'
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

import { Buffer } from 'buffer';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);


const serviceId = "0000FFE0-0000-1000-8000-00805F9B34FB";
const characteristicId = "0000FFE1-0000-1000-8000-00805F9B34FB";
                          


// const buffer = Buffer.from([1, 2, 3]);
// const buffer = Buffer.from([257, 257.5, -255, ]);
// const buffer = Buffer.from('tést');

/**
 * @param {StackScreenProps<any, any>} props
 */

const BluetoothFindDevice = ({ navigation, route, peripheral,props }) => {
  const type = route.params?.type;


  const [bluetooths, setBluetooths] = useState([]);
  const [isScan, setIsScan] = useState(false);
  const [bluetooth, setBluetooth] = useState();

  const peripherals = new Map();
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [discoveredDevices, setDiscoveredDevices] = useState([]);


  useEffect(() => {
    BleManager.enableBluetooth().then(() => {
      console.log("Enable")
    })
      .catch(err => {
        console.warn(err)
      })
  }, [])

  useEffect(() => {
    BleManager.start({ showAlert: true, forceLegacy: true }).then(() => {
      handleGetConnectedDevices();
    })
  }, [])

  useEffect(() => {
    let stopListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScan(false);
        console.log('Scan is stopped');
        handleGetConnectedDevices();
      },
    );
    return () => stopListener.remove();
  }, []);

  const handleGetConnectedDevices = () => {
    BleManager.getDiscoveredPeripherals([]).then(results => {
      for (let i = 0; i == results.length;) {
        let bluetooth = results[i];
        bluetooth.connected = true;
        peripherals.set(bluetooth.id, bluetooth);
        setConnectedDevices(Array.from(peripherals.values()));
        console.log('No device found');
        return;
      }

      setBluetooths(results);
      results.map((item) => {
        console.log(item.name + " " + item.id)
      })



    });
  };

  const findDevice = async () => {
    setIsScan(true);
    BleManager.scan([], 5, true, {
      matchMode: BleScanMatchMode.Sticky,
      callbackType: BleScanCallbackType.AllMatches,
      scanMode: BleScanMode.LowLatency
    });
    // console.log("Scan started");
  }

  const selected = (item) => {
    if (bluetooth?.id == item.id) {
      setBluetooth();
      return;
    }

    setBluetooth(item);
  }



  const connect = (item, results, peripheral,) => {

    

    BleManager.connect(bluetooth.id)
      .then(() => {
        // Success code
        bluetooth.connected = true;
        peripherals.set(bluetooth.id, bluetooth);
        // setConnectedDevices(Array.from(peripherals.values()));
        // setDiscoveredDevices(Array.from(peripherals.values()));
        console.log("Connected");
        navigation.navigate('BluetoothMeasure', { ...route.params,  "getBLEID": bluetooth.id})
        console.log("Connect to ID " + bluetooth.id)
        // readData()
        // writedata()
      })
      .catch((error) => {
        // Failure code
        console.log(error);
      });



    // Insert connect bluetooth function here.
  }

  const readData = () => {
    BleManager.read(
      bluetooth.id,
      "0000FFE0-0000-1000-8000-00805F9B34FB",
      '0000FFE1-0000-1000-8000-00805F9B34FB',
      ).then((readData) => {
        // Success code
        console.log("Id" + bluetooth.id);
        console.log("Read: " + readData);
        // console.log("Read: " + peripheral.id);
        const buffer = Buffer.from(readData);
        // const sensorData = buffer.readUInt8(1, true);
        navigation.navigate('BluetoothMeasure', { ...route.params,  "ReadData": buffer})

      })
      .catch((error) => {
        // Failure code
        console.log(error);
      });
  }


 

  const writedata = () => {


    BleManager.write(bluetooth.id,serviceId,characteristicId,[1],
      // encode & extract raw `number[]`.
      // Each number should be in the 0-255 range as it is converted from a valid byte.
      buffer.toJSON().writedata
    )
      .then((writedata) => {
        // Success code
        console.log("Write: " + writedata);
      })
      .catch((error) => {
        // Failure code
        console.log(error);
      });
  }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"วัด" + type} />
      <View style={{
        ...globalStyles.welcome_padding,
        justifyContent: 'space-between'
      }}>
        <Text style={{
          fontFamily: fontFamily.medium,
          fontSize: fontSize.font_21,
          color: colors.blue,
          alignSelf: 'center',
        }}>เชื่อมต่ออุปกรณ์</Text>
        {/* Animetion Loading Device */}

        {
          isScan ? (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
              <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_20, color: colors.pink, }}>โปรดรอสักครู่.....</Text>
            </View>
          ) : (
            <ScrollView
              style={{ width: '100%' }}
              contentContainerStyle={{
                alignItems: 'flex-start',
                marginTop: 8
              }}
            >
              {
                bluetooths.map((item, index) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: bluetooth?.id == item.id ? colors.ocean : null,
                      borderRadius: 16,
                      // backgroundColor: backgroundColor,
                      // height: 60,
                      marginVertical: 8,
                      paddingHorizontal: 12,
                      width: '100%',
                      paddingVertical: 20,
                      borderRadius: 10,
                      justifyContent: 'flex-start',
                    }}
                    onPress={() => selected(item)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon
                        name="bluetooth" color={bluetooth?.id == item.id ? colors.pink : colors.ocean} size={fontSize.font_28} style={{ marginRight: 8 }}
                      />
                      <View style={{ width: '85%' }}>
                        <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_14, color: bluetooth?.id == item.id ? colors.pink : colors.ocean }}>{item.name ? item.name + "  " : "" + item.id}</Text>
                        {/* <View style={{ width: '100%', height: 1, marginVertical: 8, backgroundColor: colors.pink_2 }} /> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          )
        }

        <Botton
          text={bluetooth?.id ? 'เชื่อมต่อ' : 'ค้นหา'}
          textStyle={{
            alignSelf: 'center'
          }}
          containerStyle={{
            backgroundColor: isScan ? 'white' : colors.blue,
            paddingHorizontal: 16,
            marginTop: 30,
            marginBottom: 40,
            flexDirection: 'column',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: 220
          }}
          activeOpacity={0.75}
          disabled={isScan}
          onPress={() => {
            bluetooth?.id ? connect() : findDevice()
          }}
        >
        </Botton>

      </View>
    </SafeAreaView>

  )
}

export default BluetoothFindDevice