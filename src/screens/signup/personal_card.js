import {
  SafeAreaView,
  View,
  Text,
} from 'react-native'
import React, { useState, useEffect } from 'react'

import Header2 from '../../components/header2';
import globalStyles from '../../constants/globalStyles';
import Botton from '../../components/button';
import colors from '../../constants/colors';

import Inputtext from '../../components/inputtext';

import { fontFamily, fontSize } from '../../constants/fonts'
import { checkPatient } from '../../services/api/patients';

const SignupPersonalCard = ({ navigation, props }) => {

  const [citizenId, setCitizenId] = useState('');

  useEffect(() => {}, [citizenId])

  const checkInput = () => {
    return citizenId.length == 13
  }

  const nextPage = async () => {
    if (citizenId.length != 13) return;

    const res = await checkPatient({ citizen_id: citizenId });
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
    }

    navigation.navigate('SignupPassword', { citizenId: citizenId });
  }




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header2 />
      <View style={{
        ...globalStyles.welcome_padding,
        justifyContent: 'space-between',
      }}>
        <View style={{ paddingHorizontal: 25, width: '100%', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: fontFamily.medium,
                fontSize: fontSize.font_20,
                color: colors.blue,
                borderRadius: 20,
              }}>ลงทะเบียนใหม่</Text>
          </View>

          <Text
            style={{
              alignSelf: 'center',
              fontFamily: fontFamily.medium,
              fontSize: fontSize.font_20,
              color: colors.blue_transparent_1,
              borderRadius: 20,
              marginTop: 12,
            }}>กรุณากรอกเลขบัตรประชาชน</Text>
        </View >

        <Inputtext
          color={colors.blue_transparent_1}
          placeholder={"เลขบัตรประชาชน 13 หลัก"}
          placeholderTextColor={colors.grey_50}
          underlineColor={colors.pink}
          onChange={(value) => setCitizenId(value)}
          keyboardType='number-pad'
          containerStyle={{
            paddingHorizontal: 16,
            paddingTop: 10,
          }}
          inputStyle={{
            fontFamily: fontFamily.medium,
            textAlign: 'center',
            fontSize: fontSize.font_18
          }}
          maxLength={13}
        />

        <Botton
          text='ถัดไป'
          textStyle={{
            alignSelf: 'center',
            color: colors.pink,
          }}
          containerStyle={{
            backgroundColor: checkInput()? colors.blue : 'white',
            paddingHorizontal: 16,
            marginTop: 10,
            marginBottom: 64,
            flexDirection: 'column',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: 220
          }}
          activeOpacity={0.75}
          disabled={!checkInput()}
          onPress={() => nextPage()}
        >
        </Botton>
      </View>
    </SafeAreaView>
  )
}

export default SignupPersonalCard;