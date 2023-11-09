import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { Dropdown } from 'react-native-element-dropdown';

import DateTimePicker from 'react-native-modal-datetime-picker'
import { styles } from './styles';




const Datepicker = ({ navigation, props }) => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [selectedDate, setSelectedDate] = useState('      ตัวเลือก')


  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  return (
    <View style={{ flex: 1 }}>

      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancle={hideDatePicker}
      />
      <View style={styles.underline}>
        <Text style={styles.textStyle} >วัน เดือน ปี เกิด</Text>
        <TouchableOpacity style={styles.dateStyle} onPress={() => { showDatePicker() }}>
          <Text style={styles.textStyle}>{selectedDate}</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Datepicker

const styles = StyleSheet.create({
  underline: {
    flexDirection: 'row',
    borderBottomColor: '#FFD3E9',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25
  },
  dateStyle: {
    textAlign: 'right',
    fontWeight: '700',
    fontSize: 16,
    width: 150,
    color: '#809BD0',
    marginHorizontal: 110
  },
  textStyle: {
    textAlign: 'left',
    fontWeight: '700',
    fontSize: 17,
    width: 150,
    color: '#809BD0'
  },
})