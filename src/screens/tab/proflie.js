import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, Platform, KeyboardAvoidingView, Dimensions, TextInput, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import Header from '../../components/header'
import globalStyles from '../../constants/globalStyles'
import Botton from '../../components/button'
import colors from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/fonts'

import DateTimePicker from 'react-native-modal-datetime-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { updatePatient, IPatient, getPatient } from '../../services/api/patients'

const { height, width } = Dimensions.get('window')

/**
 * @typedef {object} IAccount
 * @property {string} citizen_id
 * @property {string} birthday
 * @property {number} weight
 * @property {number} height
 * @property {number} gender
 */


const Proflie = ({ navigation, route }) => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  /** @type {[IAccount, React.Dispatch<IAccount>]} */
  const [data, setData] = useState();

  useEffect(() => {
    getUser();
  }, [])

  const getUser = async () => {
    /** @type {IPatient} */
    const res = JSON.parse(await AsyncStorage.getItem('user'));
    setData({
      citizen_id: res.citizen_id,
      birthday: new Date(res.birthday),
      gender: res.gender,
      height: res.height,
      weight: res.weight
    });
  }


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

    setIsEdit(false);

    console.log(data.citizen_id);

    const res_get = await getPatient({ citizen_id: data.citizen_id });
    if (!res_get.status) {
      if (res_get.data == 'expire') {
        navigation.reset({
          index: 0,
          routes: [{
            name: 'Welcome'
          }]
        })
      }
      return;
    };

    console.log(res_get.data)

    AsyncStorage.setItem('user', JSON.stringify(res_get.data));
  }

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <Header title={isEdit? 'แก้ไขโปรไฟล์' : 'โปรไฟล์'} />
      <ScrollView style={{ flex: 1 }}>
        <View style={{
          ...globalStyles.welcome_padding,
          justifyContent: 'space-between'
        }}>
          <View style={{ paddingHorizontal: 25, width: '100%', justifyContent: 'center', marginTop: -16 }}>
            <View style={{ alignItems: 'center' }}>
              <Image
                resizeMethod='resize'
                resizeMode='contain'
                style={{
                  width: 160,
                  aspectRatio: 1,
                  backgroundColor: 'white',
                  borderRadius: 42
                }}
              // source={require('../../assets/images/bgimage.png')}
              />

              <Text style={{
                textAlign: 'center',
                fontFamily: fontFamily.medium,
                fontSize: fontSize.font_16,
                color: colors.blue,
                marginTop: 10
              }}>
                ผู้ใช้งาน
              </Text>

              <Text style={{
                textAlign: 'center',
                fontFamily: fontFamily.light,
                fontSize: fontSize.font_14,
                color: colors.pink,
                marginTop: 4
              }}>
                {data?.citizen_id}
              </Text>

            </View>
          </View >
          <View style={{ width: '100%', marginTop: 32 }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, justifyContent: 'space-between', borderBottomColor: colors.pink }}>
              <Text style={{ fontFamily: fontFamily.bold, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, }}>วัน เดือน ปีเกิด</Text>
              <TouchableOpacity 
                disabled={!isEdit}
                style={{ width: '35%', flexDirection: 'row', justifyContent: 'flex-end', }}
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
                editable={isEdit}
                placeholder='ระบุน้ำหนัก'
                textAlign='right'
                placeholderTextColor={colors.grey_10}
                defaultValue={String(data?.weight)}
                onChangeText={(val) => setData({ ...data, weight: val })}
                style={{ width: '35%', fontFamily: fontFamily.medium, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, alignSelf: 'flex-end', paddingHorizontal: 0 }} />
            </View>

            <View style={{ borderBottomWidth: 1, marginTop: 20, justifyContent: 'space-between', borderBottomColor: colors.pink, flexDirection: 'row' }} >
              <Text style={{ width: '65%', fontFamily: fontFamily.bold, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, marginTop: 10 }}>ส่วนสูง (ซม.)</Text>
              <TextInput keyboardType='number-pad'
                editable={isEdit}
                placeholder='กรอก'
                placeholderTextColor={colors.grey_10}
                textAlign='right'
                defaultValue={String(data?.height)}
                onChangeText={(val) => setData({ ...data, height: val })}
                style={{ width: '35%', fontFamily: fontFamily.medium, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, paddingHorizontal: 0 }} />
            </View>


            <View style={{ marginTop: 20, flexDirection: 'row', borderBottomWidth: 1, justifyContent: 'space-between', borderBottomColor: colors.pink }}>
              <Text style={{ width: '65%', fontFamily: fontFamily.bold, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, }}>เพศ</Text>
              <TouchableOpacity 
                style={{ width: '35%', alignItems: 'flex-end', }}
                disabled={!isEdit}
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
            text={isEdit? 'ตกลง' : 'แก้ไขโปรไฟล์'}
            textStyle={{
              alignSelf: 'center',
              color: colors.pink,
            }}
            containerStyle={{
              backgroundColor: colors.blue,
              paddingHorizontal: 16,
              marginTop: 32,
              marginBottom: 4,
              flexDirection: 'column',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: 220
            }}
            activeOpacity={0.75}
            onPress={() => {
              if (isEdit)
                submit();
              else
                setIsEdit(true);
            }}
          >
          </Botton>

          <Botton
            text='เปลี่ยนรหัส'
            textStyle={{
              alignSelf: 'center',
              color: colors.blue,
            }}
            containerStyle={{
              backgroundColor: colors.pink_2,
              paddingHorizontal: 16,
              marginTop: 10,
              marginBottom: 32,
              flexDirection: 'column',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: 220,
              borderColor: colors.blue,
              borderWidth: 1.5
            }}
            activeOpacity={0.75}
            onPress={() => 
              navigation.navigate('PasswordChangePasswordVerify', {
                citizenId: data.citizen_id
              })
            }
          >
          </Botton>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default Proflie