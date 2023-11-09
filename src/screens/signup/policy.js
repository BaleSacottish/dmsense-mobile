import {
  SafeAreaView,
  View,
  Text,
  ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import Geolocation from '@react-native-community/geolocation';

import Header2 from '../../components/header2'
import colors from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/fonts'
import globalStyles from '../../constants/globalStyles'
import Botton from '../../components/button'
import Header from '../../components/header'
import WebView from 'react-native-webview'
import { getTerm } from '../../services/api/term'
import { createPatient } from '../../services/api/patients'

/**
 * 
 * @param {StackScreenProps<any, any>} props
 */

const SignupPolicy = ({ navigation, route }) => {
  const [policy, setPolicy] = useState("ADdw");
  const [isScrollEnd, setIsScrollEnd] = useState(false);

  useEffect(() => {
    getPolicy();
  }, [])

  const getPolicy = async () => {
    const res = await getTerm();
    if (!res.status) return;

    setPolicy(res.data.content);
  }

  const submit = async () => {
    Geolocation.getCurrentPosition(
      async (info) => {
        const res = await createPatient({
          citizen_id: route.params?.citizenId,
          password: route.params?.password,
          latitude: info.coords.latitude,
          longitude: info.coords.longitude
        });
    
        if (!res.status) {
          if (res.data == 'expire') {
            navigation.reset({
              index: 0,
              routes: [{
                name: 'Welcome'
              }]
            })
          }
          return;
        };
    
        navigation.reset({
          index: 0,
          routes: [{
            name: 'SignupSuccessSignup'
          }]
        })
      },
      error => {
        console.error('Cannot get location.')
      }
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={'นโยบาย และข้อตกลง'} color={colors.blue} />
      <View style={{
        ...globalStyles.welcome_padding,
        justifyContent: 'space-between',
        paddingTop: 0,
      }}>
        <View style={{ width: '100%', alignItems: 'center', paddingVertical: 2 }}>
          <Text style={{
            fontSize: fontSize.font_20,
            fontFamily: fontFamily.medium,
            color: colors.blue_transparent_1,
            marginBottom: 4,
          }}>
            นโยบาย และข้อตกลง...
          </Text>
          <View style={{ width: '100%', height: 1, backgroundColor: colors.pink }} />
        </View>
        <ScrollView
          style={{ paddingVertical: 16, width: '100%' }}
          contentContainerStyle={{
            height: 500,
            padding: 12,
            borderRadius: 13,
            backgroundColor: 'white',
          }}
        >
          {
            policy ? (
              <WebView
                originWhitelist={['*']}
                source={{ html: policy }}
                onScroll={(event) => {
                  const { contentOffset, contentSize } = event.nativeEvent;
                  if (contentOffset.y + 550 < contentSize.height) return;

                  setIsScrollEnd(true);
                }}
                textZoom={225}
              />
            ) : null
          }

        </ScrollView>

        <Botton
          text='ฉันยอมรับ'
          textStyle={{
            alignSelf: 'center',
            color: colors.pink,
          }}
          containerStyle={{
            backgroundColor: isScrollEnd ? colors.blue : 'white',
            paddingHorizontal: 16,
            marginTop: 10,
            marginBottom: 36,
            flexDirection: 'column',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: 220
          }}
          disabled={!isScrollEnd}
          activeOpacity={0.75}
          onPress={() => submit()}
        >
        </Botton>

      </View>
    </SafeAreaView>

  )
}

export default SignupPolicy