import { SafeAreaView, View, Text, Image, TouchableOpacity, Platform, KeyboardAvoidingView, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import Header from '../../components/header'
import globalStyles from '../../constants/globalStyles'
import Botton from '../../components/button'
import colors from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/fonts'

import DateTimePicker from 'react-native-modal-datetime-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { updatePatient } from '../../services/api/patients'

const { height, width } = Dimensions.get('window')

/**
 * @typedef {object} IAccountEdit
 * @property {Date} birthday
 * @property {number} weight
 * @property {number} height
 * @property {number} gender
 */


/**
 * @param {StackScreenProps<any, any>} props
 */

const SignupAccount = ({ navigation, route }) => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  /** @type {[IAccountEdit, React.Dispatch<IAccountEdit>]} */
  const [data, setData] = useState();


  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleDateConfirm = date => {
    const dt = new Date(date)
    setData({ ...data, birthday: dt })
    hideDatePicker()
  }

  const parseDate = (date) => {
    if (date == null) return '';
    const dt = new Date(date)
    const x = dt.toISOString().split('T')
    const x1 = x[0].split('-')
    return x1[2] + '/' + x1[1] + '/' + x1[0]
  }

  const onPress = (id, value, type) => {
    switch (type) {
      case 'gender': {
        setData({
          ...data,
          gender: value
        })
        break;
      }
    }
  }

  const openSelects = (type) => {
    navigation.navigate('UtilSelects', {
      type: type,
      onPress: onPress,
    });
  }

  const checkInput = () => {
    const valid = {
      birthday: data?.birthday != null,
      weight: data?.weight ?? '',
      height: data?.height ?? '',
      gender: data?.gender ?? ''
    }

    return Object.keys(valid).every((k) => valid[k]);
  }

  const submit = async () => {
    const id = await AsyncStorage.getItem('id');

    const res = await updatePatient({
      patient_id: id,
      userData: {
        birthday: new Date(data.birthday).toISOString(),
        gender: data.gender,
        weight: data.weight,
        height: data.height,
      }
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

    navigation.navigate('SignupQuestion', {
      questionIndex: 0,
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        {/* <Header /> */}
        <View style={{
          ...globalStyles.welcome_padding,
          justifyContent: 'space-between'
        }}>
          <View style={{ paddingHorizontal: 25, width: '100%', justifyContent: 'center', marginTop: height * 0.1 }}>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: fontFamily.medium,
                  fontSize: fontSize.font_20,
                  color: colors.blue,
                  borderRadius: 20,
                }}>กรุณากรอกข้อมูลส่วนตัว</Text>
            </View>
          </View >
          <View style={{ width: '100%', marginTop: -72 }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, justifyContent: 'space-between', borderBottomColor: colors.pink }}>
              <Text style={{ fontFamily: fontFamily.bold, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, }}>วัน เดือน ปีเกิด</Text>
              <TouchableOpacity style={{ width: '35%', flexDirection: 'row', justifyContent: 'flex-end', }}
                onPress={() => { showDatePicker() }} >
                <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.titleboty, color: data?.birthday ? colors.blue_transparent_1 : colors.grey_10, marginBottom: 10 }}>{data?.birthday ? parseDate(data.birthday) : 'ระบุวันเกิด'}</Text>
              </TouchableOpacity>
            </View>


            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              date={data?.birthday ? data.birthday : new Date()}
              onConfirm={handleDateConfirm}
              onCancle={hideDatePicker}
            />
            <View style={{ borderBottomWidth: 1, marginTop: 20, justifyContent: 'space-between', borderBottomColor: colors.pink, flexDirection: 'row' }} >
              <Text style={{ width: '65%', fontFamily: fontFamily.bold, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, marginTop: 10 }}>น้ำหนัก (กก.)</Text>
              <TextInput keyboardType='number-pad'
                placeholder='ระบุน้ำหนัก'
                textAlign='right'
                placeholderTextColor={colors.grey_10}
                onChangeText={(val) => setData({ ...data, weight: val })}
                style={{ width: '35%', fontFamily: fontFamily.medium, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, alignSelf: 'flex-end', paddingHorizontal: 0 }} />
            </View>

            <View style={{ borderBottomWidth: 1, marginTop: 20, justifyContent: 'space-between', borderBottomColor: colors.pink, flexDirection: 'row' }} >
              <Text style={{ width: '65%', fontFamily: fontFamily.bold, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, marginTop: 10 }}>ส่วนสูง (ซม.)</Text>
              <TextInput keyboardType='number-pad'
                placeholder='กรอก'
                placeholderTextColor={colors.grey_10}
                textAlign='right'
                onChangeText={(val) => setData({ ...data, height: val })}
                style={{ width: '35%', fontFamily: fontFamily.medium, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, paddingHorizontal: 0 }} />
            </View>


            <View style={{ marginTop: 20, flexDirection: 'row', borderBottomWidth: 1, justifyContent: 'space-between', borderBottomColor: colors.pink }}>
              <Text style={{ width: '65%', fontFamily: fontFamily.bold, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, }}>เพศ</Text>
              <TouchableOpacity style={{ width: '35%', alignItems: 'flex-end', }}
                onPress={() => {
                  openSelects('gender');
                }}
              >
                <Text
                  style={{
                    fontFamily: fontFamily.medium,
                    fontSize: fontSize.titleboty,
                    color: data?.gender ? colors.blue_transparent_1 : colors.grey_10,
                    marginBottom: 10
                  }}>
                  {data?.gender ? data.gender : 'ตัวเลือก'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Botton
            text='ถัดไป'
            textStyle={{
              alignSelf: 'center',
              color: colors.pink,
            }}
            containerStyle={{
              backgroundColor: checkInput() ? colors.blue : 'white',
              paddingHorizontal: 16,
              marginTop: 10,
              marginBottom: 32,
              flexDirection: 'column',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: 220
            }}
            activeOpacity={0.75}
            disabled={!checkInput()}
            onPress={() => submit()}
          >
          </Botton>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>

  )
}

export default SignupAccount