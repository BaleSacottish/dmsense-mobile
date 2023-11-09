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
  
  const SignupSuccessSignup = ({ navigation, props }) => {
  
  
    useEffect(() => {
      setTimeout(() => {
        navigation.navigate('SignupAccount');
      }, 2000)
    }, [])
  
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header2 />
        <View style={{
          ...globalStyles.welcome_padding,
          justifyContent: 'center',
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
                marginBottom: 72
              }}>สำเร็จ!</Text>
          </View >
        </View>
      </SafeAreaView>
    )
  }
  
  export default SignupSuccessSignup;