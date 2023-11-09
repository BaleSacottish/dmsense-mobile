import {
  SafeAreaView,
  View,
  Image,
} from 'react-native'
import React, { useEffect } from 'react'
import Botton from './components/button'
import colors from './constants/colors'
import { fontFamily } from './constants/fonts'
import globalStyles from './constants/globalStyles'
import { signout } from './services/api/auth'

const Welcome = ({ navigation, props }) => {

  useEffect(() => {
    signout()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ ...globalStyles.welcome_padding, justifyContent: 'flex-end' }}>
        <View style={{ paddingHorizontal: 25, marginBottom: 200 }}>
          <View style={{ alignItems: 'center', width: 220, aspectRatio: 1 }}>
            <Image 
              source={require('../src/assets/images/logox2.png')}
              resizeMethod='resize'
              resizeMode='contain'
              style={{
                width: '100%',
                height: '100%'
              }}/>
          </View>
        </View>
        <Botton
          text='ลงทะเบียนใหม่'
          textStyle={{
            alignSelf: 'center'
          }}
          containerStyle={{
            marginTop: 30,
            marginBottom: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          activeOpacity={0.75}
          onPress={() => navigation.navigate('SignupPersonalCard')}
        >
        </Botton>

        <Botton
          text='มีบัญชีอยู่แล้ว'
          textStyle={{
            alignSelf: 'center',
            color: colors.blue,
          }}
          containerStyle={{
            backgroundColor: colors.pink,
            marginTop: 10,
            marginBottom: 64,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          activeOpacity={0.75}
          onPress={() => navigation.navigate('SigninPersonalCard')}
        >
        </Botton>
      </View>
    </SafeAreaView>
  )
}

export default Welcome 