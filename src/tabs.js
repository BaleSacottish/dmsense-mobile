import { View, TouchableOpacity, Text, Animated, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicon from 'react-native-vector-icons/Ionicons';
import colors from './constants/colors';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { fontFamily, fontSize } from './constants/fonts';

import Home from './screens/tab/home';
import Proflie from './screens/tab/proflie';

import Instruction from './screens/instruction/instruction';
import BluetoothFindDevice from './screens/bluetooth/find_device';
import BluetoothMeasure from './screens/bluetooth/measure';
import BluetoothResult from './screens/bluetooth/result';
import Ketone from './screens/tab/ketone';
import Sugar from './screens/tab/sugar';


const Tab = createBottomTabNavigator();
const Sugartab = createStackNavigator();
const Ketonetab = createStackNavigator();
const Profiletab = createStackNavigator();
const Homepage = createStackNavigator();

const colours = ['#fff', 'red']
const getColour = () => [Math.floor(Math.random() * colors.length)];



/**
 * 
 * @param {StackScreenProps<any, any>} props
 */

const Tabs = ({ navigation, route }) => {
  

  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} /> }
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true
      }}
      labelStyle={{ fontSize: 12 }}
      initialRouteName={route.params?.tab? route.params?.tab : 'Home'}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Sugar" component={Sugar} />
      <Tab.Screen name="Ketone" component={Ketone} />
      <Tab.Screen name="Account" component={Proflie} />

      <Tab.Screen name="SugarMeasure" component={SugarTabbar} />
      <Tab.Screen name="KetoneMeasure" component={KetoneTabbar} />

    </Tab.Navigator>
  )
}

/**
 * 
 * @param {BottomTabBarProps} props2
 */

const TabBar = ({ state, descriptors, navigation, focused }) => {

  const [color, setColour] = useState(getColour());
  const handleClick = () => { setColour(getColour()); }
  
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 8, backgroundColor: '#1631C2', alignItems: 'center' }}>

      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => navigation.navigate('Home')}
        style={{ width: 48, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: state.index == 0 ? 'white' : colors.blue }}
      >

        <Ionicon
          name={"home"}
          size={24}
          color={state.index == 0? colors.blue : 'white'}
        />
        <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_8, color: state.index == 0 ? colors.blue : 'white' }}>หน้าหลัก</Text>
      </TouchableOpacity>



      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => navigation.navigate('Sugar')}
        style={{ width: 48, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: [1, 4].includes(state.index)? 'white' : colors.blue }}
      >
        <Ionicon
          name={"water"}
          size={24}
          color={[1, 4].includes(state.index)? colors.blue : 'white'}
        />
        <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_8, color: [1, 4].includes(state.index)? colors.blue : 'white' }}>วัดน้ำตาล</Text>
      </TouchableOpacity>


      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => navigation.navigate('Ketone')}
        style={{ width: 48, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: [2, 5].includes(state.index)? 'white' : colors.blue }}
      >
        <Ionicon
          name={"reader"}
          size={24}
          color={[2, 5].includes(state.index)? colors.blue : 'white'}
        />
        <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_8, color: [2, 5].includes(state.index)? colors.blue : 'white' }}>วัดคีโตน</Text>
      </TouchableOpacity>


      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => navigation.navigate('Account')}
        style={{ width: 48, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: state.index == 3 ? 'white' : colors.blue }}
      >
        <Ionicon
          name={"person"}
          size={24}
          color={state.index == 3? colors.blue : 'white'}
        />
        <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_8, color: state.index == 3 ? colors.blue : 'white' }}>โปรไฟล์</Text>
      </TouchableOpacity>

    </View>
  );
}

const SugarTabbar = ({ navigation, route }) => {

  const [instruction, setInstruction] = useState();

  const checkInstruction = async () => {
    const res = await AsyncStorage.getItem('instruction');
    if (!res) return;

    setInstruction(1);
  }
  useEffect(() => {
    checkInstruction();
  }, [])

  return (
    <Sugartab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1631C2',
        },
        
      }}
      initialRouteName={!instruction ? 'Instruction' : 'BluetoothFindDevice'}
      
    >
      <Sugartab.Screen name='Instruction' component={Instruction} initialParams={{ type: 'น้ำตาล' }} />
      <Sugartab.Screen name='BluetoothFindDevice' component={BluetoothFindDevice} initialParams={{ type: 'น้ำตาล' }} />
      <Sugartab.Screen name='BluetoothMeasure' component={BluetoothMeasure} initialParams={{ type: 'น้ำตาล' }} />
      <Sugartab.Screen name='BluetoothResult' component={BluetoothResult} initialParams={{ type: 'น้ำตาล' }} />
    </Sugartab.Navigator>
  )
}

const KetoneTabbar = ({ navigation, route }) => {

  const [instruction, setInstruction] = useState();

  const checkInstruction = async () => {
    const res = await AsyncStorage.getItem('instruction');
    if (!res) return;

    setInstruction(1);
  }
  useEffect(() => {
    checkInstruction();
  }, [])

  return (
    <Ketonetab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1631C2',
        },
        
      }}
      initialRouteName={!instruction ? 'Instruction' : 'BluetoothFindDevice'}
      
    >
      <Ketonetab.Screen name='Instruction' component={Instruction} initialParams={{ type: 'คีโตน' }} />
      <Ketonetab.Screen name='BluetoothFindDevice' component={BluetoothFindDevice} initialParams={{ type: 'คีโตน' }} />
      <Ketonetab.Screen name='BluetoothMeasure' component={BluetoothMeasure} initialParams={{ type: 'คีโตน' }} />
      <Ketonetab.Screen name='BluetoothResult' component={BluetoothResult} initialParams={{ type: 'คีโตน' }} />
    </Ketonetab.Navigator>
  )
}




const styles = StyleSheet.create({
  appbuttonbackground: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff'

  }
})



export default Tabs;