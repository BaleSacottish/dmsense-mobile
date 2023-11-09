import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { StackScreenProps } from '@react-navigation/stack'

import Header2 from '../../components/header2'
import Botton from '../../components/button'
import globalStyles from '../../constants/globalStyles'
import { fontFamily, fontSize } from '../../constants/fonts'
import colors from '../../constants/colors'

/**
 * 
 * @param {StackScreenProps<any, any>} props
 */

const SignupPasswordConfirm = ({ navigation, route }) => {
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (password.length < 6) return;
    if (password != route.params?.password) return;

    navigation.navigate('SignupPolicy', { ...route.params });

  }, [password])

  const onPressPassword = (number) => {
    let pass = password;
    
    if (number < 0) {
      pass = pass.substring(0, pass.length - 1);
    }
    else {
      pass = pass + number;
    }

    if (pass.length > 6) return;
    
    setPassword(pass);
  }

  const displayColor = (index) => {
    if (password.length <= index)
      return 'white';

    return colors.blue
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
            }}>ยืนยันรหัส Pin 6 หลัก</Text>
        </View >
        <View style={styles.passwordContainer}>
          {new Array(6).fill(null).map((inp, index) => {
            return (
              <View key={index.toString()} style={{...styles.inputContainer, backgroundColor: displayColor(index)}} />
            )
          })}
        </View>
        {/* </KeyboardAvoidingView> */}

        <View style={{ marginBottom: 52 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => { onPressPassword(1) }}
              style={styles.button}>
              <Text
                style={styles.numtext}>1</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { onPressPassword(2) }}
              style={styles.button}>
              <Text
                style={styles.numtext}>2</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { onPressPassword(3) }}
              style={styles.button}>
              <Text
                style={styles.numtext}>3</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => { onPressPassword(4) }}
              style={styles.button}>
              <Text
                style={styles.numtext}>4</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { onPressPassword(5) }}
              style={styles.button}>
              <Text
                style={styles.numtext}>5</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { onPressPassword(6) }}
              style={styles.button}>
              <Text
                style={styles.numtext}>6</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => { onPressPassword(7) }}
              style={styles.button}>
              <Text
                style={styles.numtext}>7</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { onPressPassword(8) }}
              style={styles.button}>
              <Text
                style={styles.numtext}>8</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { onPressPassword(9) }}
              style={styles.button}>
              <Text
                style={styles.numtext}>9</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              style={styles.buttonnull}>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { onPressPassword(0) }}
              style={styles.button}>
              <Text
                style={styles.numtext}>0</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { onPressPassword(-1) }}
              style={styles.button}>
              <Text
                style={{...styles.numtext, fontSize: fontSize.font_24}}>ลบ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>

  )
}
const { width } = Dimensions.get('window')
const inputWidth = Math.round(width / 9)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center'

  },
  heading: {
    color: '#8469cf',
    textAlign: 'center',
    marginBottom: 15
  },
  inputContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white'

  },
  input: {
    fontSize: 15,
    textAlign: 'center',
    // backgroundColor: 'red',
    paddingHorizontal: 15
  },
  afterinput: {
    backgroundColor: '#1631C2',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 15,
    borderRadius: 20
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 36,
    // paddingBottom: 50
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 30,
    width: 70,
    height: 70,
    marginHorizontal: 10,
    marginVertical: 10
  },
  buttonnull: {
    padding: 15,
    borderRadius: 30,
    marginBottom: 30,
    width: 70,
    height: 70,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numtext: {
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    fontSize: fontSize.font_28,
    color: colors.blue_transparent_1
  }
})

export default SignupPasswordConfirm