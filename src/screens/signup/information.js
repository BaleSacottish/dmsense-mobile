import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Dimensions,
    TextInput,
    Platform,
    Button,
    Picker
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { SelectList } from 'react-native-dropdown-select-list'
import SelectDropdown from 'react-native-select-dropdown'
import DropDownPicker from 'react-native-dropdown-picker'
import { Dropdown } from 'react-native-element-dropdown';


import Botton from '../../components/button'
import colors from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/fonts'
import Header2 from '../../components/header2'
import globalStyles from '../../constants/globalStyles'

const Information = ({ navigation, props }) => {
    const [dropdown, setDropdown] = useState(null);

    const [isOpen, setIsOpen] = useState(false)
    const [currentValue, setCurrentVale] = useState([])

    const items = [
        { label: 'เพศชาย', value: 'ชาย' },
        { label: 'เพศหญิง', value: 'หญิง' }
    ]
    const [selected, setSelected] = useState("")
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [selectedDate, setSelectedDate] = useState('ตัวเลือก')

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
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <Header2 />
            <View style={{
                ...globalStyles.welcome_padding,
                justifyContent: 'space-between',
            }}>

                <View style={{  marginBottom: 50 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{
                            textAlign: 'center',
                            fontWeight: '700',
                            fontSize: 24,
                            color: '#1631C2',
                            marginBottom: 100,
                        }}>
                            กรุณากรอกข้อมูลส่วนตัว
                        </Text>

                    </View>

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

                    <View style={styles.underline}>
                        <Text style={styles.textStyle} >กรอกน้ำหนัก (กก)</Text>
                        <TextInput style={styles.textinputStyle} placeholder='กรอก' placeholderTextColor="#809BD0" ></TextInput>
                    </View>

                    <View style={styles.underline}>
                        <Text style={styles.textStyle} >ส่วนสูง (ซม)</Text>
                        <TextInput style={styles.textinputStyle} placeholder='กรอก' placeholderTextColor="#809BD0" ></TextInput>
                    </View>

                    <View style={styles.underline}>
                        <Text style={styles.textStyle} >เพศ</Text>
                        <View style={{ paddingRight: 100 }} />
                        <View style={{ paddingLeft: 40, width: 140 }}>
                            <Dropdown
                                data={items}
                                selectedTextProps={{
                                    style: {
                                        textAlign: 'left',
                                        fontWeight: '700',
                                        fontSize: 16,
                                        width: 150,
                                        color: '#809BD0'
                                    },
                                }}
                                labelField="label"
                                valueField="value"
                                label="Dropdown"
                                placeholder="ตัวเลือก"
                                itemTextStyle={styles.itemStyle}
                                placeholderStyle={styles.textStyle}
                                value={dropdown}
                                onChange={item => {
                                    setDropdown(item.value);
                                    console.log('selected', item);
                                }}
                            />
                        </View>
                    </View>
                </View>


                <Botton
                    text='ถัดไป'
                    textStyle={{
                        alignSelf: 'center',
                        color: colors.pink,
                    }}
                    containerStyle={{
                        backgroundColor: colors.pink_2,
                        paddingHorizontal: 16,
                        marginBottom: 20,
                        flexDirection: 'column',
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 220
                    }}
                    activeOpacity={0.75}
                    onPress={() => navigation.navigate('Question')}
                >
                </Botton>


            </View>
        </SafeAreaView>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
    textinputStyle: {
        textAlign: 'right',
        fontWeight: '700',
        fontSize: 16,
        width: 100,
        color: '#809BD0',
        marginHorizontal: 100,
        marginTop: -10

    },
    textStyle: {
        textAlign: 'left',
        fontWeight: '700',
        fontSize: 17,
        width: 150,
        color: '#809BD0'
    },
    itemStyle: {
        textAlign: 'left',
        fontWeight: '700',
        fontSize: 15,
        width: 150,
        color: '#809BD0'
    }
    ,
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
        placeholderTextColor: '#809BD0'
    },
    item: {
        paddingVertical: 17,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#809BD0'
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
})

export default Information

