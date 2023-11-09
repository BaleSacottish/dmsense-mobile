import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
} from 'react-native'
import React, { useState } from 'react'

import Header from '../../components/header'
import colors from '../../constants/colors'
import globalStyles from '../../constants/globalStyles'
import Botton from '../../components/button'
import { fontFamily, fontSize } from '../../constants/fonts'
import sugaService from '../../services/linechartdatatest'
import chartConfig from '../../components/chartconfig'
import { createKetoneLastRecord } from '../../services/api/ketone_value'
import { LineChart, } from "react-native-chart-kit";
const { width } = Dimensions.get('screen');
import AsyncStorage from '@react-native-async-storage/async-storage';

const BluetoothResult = ({ navigation, route, params }) => {

    const type = route.params?.type;
    const [shown, getshow] = useState(route.params.value)

    const submit = async () => {
        let userId = await AsyncStorage.getItem('id');
        let res = await createKetoneLastRecord({
            patient_id: userId,
            ketone_level_id: 5,
            value: shown,
            bloothoth_id: ''
        });
        navigation.reset({
            index: 0,
            routes: [{
                name: 'Tabs',
                params: { tab: type == 'น้ำตาล' ? 'Sugar' : 'Ketone' }
            },
            ]
        })

    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={'วัด' + type + 'ในเลือด'} hideButton={true} />
            <View style={{
                ...globalStyles.welcome_padding,
                justifyContent: 'space-between'
            }}>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontFamily: fontFamily.bold, fontSize: fontSize.maesure, color: colors.blue, alignSelf: 'center', marginTop: 20 }}>ค่าที่วัดได้</Text>
                    <Text style={{ fontFamily: fontFamily.bold, fontSize: fontSize.maesure2, color: colors.green_1, alignSelf: 'center', marginTop: 10 }}>{shown}</Text>

                    <View style={styles.underline}>
                        <Text style={styles.textinput}  >ระดับ</Text>
                        <Text style={styles.textinput}  >ค่าระดับ</Text>
                    </View>

                    <View style={styles.underline}>
                        <Text style={styles.textinput}  >สรุปผล</Text>
                        <Text style={styles.textinput}  >ผลสรุป</Text>
                    </View>

                    <LineChart
                        style={{ alignSelf: 'center' }}
                        data={sugaService}
                        width={width * 90 / 100}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                    />

                    <Botton
                        text='ถัดไป'
                        textStyle={{
                            alignSelf: 'center'
                        }}
                        containerStyle={{
                            paddingHorizontal: 16,
                            marginTop: 40,
                            flexDirection: 'column',
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 220
                        }}
                        activeOpacity={0.75}
                        onPress={() => submit()}
                    >
                    </Botton>

                </View>

            </View>
        </SafeAreaView>
    )
}

export default BluetoothResult

const styles = StyleSheet.create({
    underline: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: '#FFD3E9',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 5
    },
    textinput: {
        fontFamily: fontFamily.medium,
        fontSize: fontSize.titleboty,
        color: colors.blue_transparent_1,
        marginTop: 15,

    },
})