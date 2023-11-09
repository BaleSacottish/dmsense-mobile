
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { Dimensions, TouchableOpacity, Text, View } from 'react-native';

import Ionicon from 'react-native-vector-icons/Ionicons';

import { fontFamily, fontSize } from '../constants/fonts';
import colors from '../constants/colors';

const Header2 = ({ color = colors.blue_transparent_1, title }) => {
    const { height, width } = Dimensions.get('window')
    const navigation = useNavigation()

    return (
        <View
            style={{
                height: height * 0.1,
                width: width,
                backgroundColor:colors.pink_2,
                position: 'relative',
                zIndex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '1%', flexDirection: 'row'
            }}
        >
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    padding: '4%'
                }}
            >
                <Ionicon name={'chevron-back-outline'} size={24} color={color} ></Ionicon>
            </TouchableOpacity>
            {/* <Text style={{padding:20}}>Name</Text> */}
            {/* {title && <Text style={{ fontFamily: fontFamily.bold, fontSize: fontSize.subBody, color: color, paddingLeft: width * 0.05 }}>{title}</Text>} */}
        </View>
    )
}

export default Header2