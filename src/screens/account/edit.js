import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { StackScreenProps } from '@react-navigation/stack'

import Header from '../../components/header'
import globalStyles2 from '../../constants/globalStyles2'
import Botton from '../../components/button'
import colors from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/fonts'


import DateTimePicker from 'react-native-modal-datetime-picker'

/**
 * @typedef {object} IAccountEdit
 * @property {string} birthday
 * @property {number} weight
 * @property {number} height
 * @property {number} gender
 */


/**
 * @param {StackScreenProps<any, any>} props
 */

const AccountEdit = ({ navigation, route }) => {

  const [selectGender, setSelectGender] = useState('ตัวเลือก')
  const [isClickedgender, setIsclickedgender] = useState(false);


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [selectedDate, setSelectedDate] = useState('ตัวเลือก')

  /** @type {[IAccountEdit, React.Dispatch<IAccountEdit>]} */
  const [data, setData] = useState();


  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleDateConfirm = date => {
    console.warn("A date has been picked: ", date)
    const dt = new Date(date)
    const x = dt.toISOString().split('T')
    const x1 = x[0].split('-')
    console.log(x1[2] + '/' + x1[1] + '/' + x1[0])
    setSelectedDate(x1[2] + '/' + x1[1] + '/' + x1[0])
    hideDatePicker()
  }

  const onPress = (id, value, type) => {
    switch (type) {
      case 'varietie': {
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




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{
        ...globalStyles2.welcome_padding,
      }}>
        <View style={{ paddingHorizontal: 25, marginBottom: 20, padding: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../../assets/images/bgimage.png')}
              style={styles.Imageheader} />

            <Text style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 20,
              color: '#809BD0',
              marginBottom: 10,
            }}>
              คุณ username
            </Text>

            <Text style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 14,
              color: '#FFD3E9',
              marginBottom: 10,
            }}>
              1 2345 6 789x xx x
            </Text>

          </View>
          <View style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, justifyContent: 'space-between', borderBottomColor: colors.pink }}>
              <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, }}>วัน เดือน ปีเกิด</Text>
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', }}
                onPress={() => { showDatePicker() }} >
                <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, marginBottom: 10 }}>{selectedDate}</Text>
              </TouchableOpacity>
            </View>


            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancle={hideDatePicker}
            />
            <View style={{ borderBottomWidth: 1, marginTop: 20, justifyContent: 'space-between', borderBottomColor: colors.pink, flexDirection: 'row' }} >
              <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, marginTop: 10 }}>กรอกน้ำหนัก(กก)</Text>
              <TextInput keyboardType='number-pad'
                placeholder='กรอก' placeholderTextColor={colors.blue_transparent_1} style={{ fontFamily: fontFamily.medium, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, }} />
            </View>

            <View style={{ borderBottomWidth: 1, marginTop: 20, justifyContent: 'space-between', borderBottomColor: colors.pink, flexDirection: 'row' }} >
              <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, marginTop: 10 }}>ส่วนสูง(ซม)</Text>
              <TextInput keyboardType='number-pad'
                placeholder='กรอก' placeholderTextColor={colors.blue_transparent_1} style={{ fontFamily: fontFamily.medium, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, }} />
            </View>


            <View style={{ marginTop: 20, flexDirection: 'row', borderBottomWidth: 1, justifyContent: 'space-between', borderBottomColor: colors.pink }}>
              <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, }}>เพศ</Text>
              <TouchableOpacity style={{ justifyContent: 'space-between', }}
                onPress={() => {
                  openSelects('gender')
                }}
              >
                <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.titleboty, color: colors.blue_transparent_1, marginBottom: 10 }}>{data?.gender ? data.gender : 'ตัวเลือก'}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

        <View style={{ alignItems: 'center' }}>


          <Botton
            text='ตกลง'
            textStyle={{
              alignSelf: 'center',
              color: '#fff'
            }}
            containerStyle={{
              paddingHorizontal: 16,
              marginTop: 40,
              flexDirection: 'column',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: 220,
            }}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('Account')}
          >
          </Botton>

          <Botton
            text='ยกเลิก'
            textStyle={{
              alignSelf: 'center',
              borderColor: '#1631C2',
              color: '#1631C2'
            }}
            containerStyle={{
              paddingHorizontal: 16,
              marginTop: 10,
              flexDirection: 'column',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: 220,
              backgroundColor: '#F6F5FA',
              borderColor: '#1631C2',
              borderWidth: 2,
              borderColor: '#1631C2'
            }}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('Account')}
          >
          </Botton>
          {/* <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            backgroundColor: '#1631C2',
                            padding: 20,
                            borderRadius: 25,
                            marginBottom: 10,
                            width: 250,
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: '700',
                                fontSize: 16,
                                color: '#FFD3E9'
                            }}>ตกลง</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#1631C2',
                            padding: 20,
                            borderRadius: 25,
                            marginBottom: 10,
                            width: 250,
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: '700',
                                fontSize: 16,
                                color: '#1631C2'
                            }}>ยกเลิก</Text>
                    </TouchableOpacity> */}

        </View>
      </View>
    </SafeAreaView>

  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center'

  },

  button: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 30,
    marginBottom: 15,
    width: 70,
    height: 70,
    marginHorizontal: 10
  },
  underline: {
    flexDirection: 'row',
    borderBottomColor: '#FFD3E9',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 10
  },
  textinput: {
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 17,
    width: 150
  },
  Imageheader: {
    width: 80,
    height: 80,
    borderRadius: 40,

  }
})

export default AccountEdit