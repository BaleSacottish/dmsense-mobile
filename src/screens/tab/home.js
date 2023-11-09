import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import globalStyles from '../../constants/globalStyles'
import colors from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/fonts'
import Botton from '../../components/button'

import sugaService from '../../services/linechartdatatest'
import chartConfig from '../../components/chartconfig'

import {
  LineChart,
} from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IPatient } from '../../services/api/patients'

/**
 * 
 * @param {StackScreenProps<any, any>} props
 */

const { width, height } = Dimensions.get('screen');


const Home = ({ navigation, route }) => {

  /** @type {[IPatient, React.Dispatch<IPatient>]} */
  const [user, setUser] = useState();

  useEffect(() => {
    getUser();
  }, [])

  const getUser = async () => {
    const res = JSON.parse(await AsyncStorage.getItem('user'));
    setUser(res);
  }


  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel'
        },
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
      ])
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();

  }, [])





  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{
          ...globalStyles.screen_padding,
          justifyContent: 'flex-start',
        }}>
          <View style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
            {/* Header and Images */}
            <Image source={require('../../assets/images/bgimage.png')} style={styles.Imageheader} />
            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
              <Text style={{ fontFamily: fontFamily.bold, fontSize: fontSize.font_14, color: colors.blue, }}>สวัสดี</Text>
              <Text style={{ fontFamily: fontFamily.light, fontSize: fontSize.font_14, color: colors.blue_transparent_1 }}>{`ผู้ใช้งาน`}</Text>
              <Text style={{ fontFamily: fontFamily.light, fontSize: fontSize.font_14, color: colors.pink, }}>{user?.citizen_id}</Text>
            </View>
          </View>
          {/* Linechart suga */}
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 20, padding: 10 }}>
            <Text style={{ fontFamily: fontFamily.bold, fontSize: fontSize.subTitle, color: colors.blue }}>กราฟวัดน้ำตาลในเลือด</Text>
            <LineChart
              data={sugaService}
              width={width * 90 / 100}
              height={220}
              chartConfig={chartConfig}
              bezier
            />

            <Botton
              text='วัดค่า'
              textStyle={{
                alignSelf: 'center'
              }}
              containerStyle={{
                paddingHorizontal: 16,
                marginTop: 20,
                flexDirection: 'column',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: 220
              }}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('Sugar')}
            >
            </Botton>

          </View>

          {/* Linechart Ketone */}
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 5, padding: 10 }}>
            <Text style={{ fontFamily: fontFamily.bold, fontSize: fontSize.subTitle, color: colors.blue }}>กราฟวัดคีโตน</Text>
            <LineChart
              data={sugaService}
              width={width * 90 / 100}
              height={220}
              chartConfig={chartConfig}
              bezier
            />

            <Botton
              text='วัดค่า'
              textStyle={{
                alignSelf: 'center'
              }}
              containerStyle={{
                paddingHorizontal: 16,
                marginTop: 20,
                flexDirection: 'column',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: 220,
                marginBottom: 36
              }}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('KetoneMeasure')}
            >
            </Botton>

          </View>





        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default Home;

const styles = StyleSheet.create({
  Imageheader: {
    width: 80,
    height: 80,
    borderRadius: 40,

  }
})