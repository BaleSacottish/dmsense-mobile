import { StyleSheet, Text, View, TextInput, ViewStyle, TextStyle } from 'react-native'
import React from 'react'

import { KeyboardTypeOptions } from 'react-native/Libraries/Components/TextInput/TextInput'

import colors from '../constants/colors'
import Header from './header'

import { fontFamily, fontSize } from '../constants/fonts'

/**
 * @param {Object} props
 * @param {(text: string) => void} props.onChange
 * @param {string} props.title
 * @param {string} props.value
 * @param {string} props.defaultValue
 * @param {number} props.line
 * @param {number} props.maxLength
 * @param {TextStyle} props.titleTextStyle
 * @param {string} props.color
 * @param {string} props.placeholder
 * @param {boolean} props.underline
 * @param {boolean} props.underlineColor
 * @param {string} props.placeholderTextColor
 * @param {TextStyle} props.inputStyle
 * @param {ViewStyle} props.containerStyle
 * @param {boolean} props.secureTextEntry
 * @param {KeyboardTypeOptions} props.keyboardType
 * @param {boolean} props.editable
 * 
 * @param {string} props.leftText
 * @param {string} props.rightText
 * @param {TextStyle} props.leftTextStyle
 * @param {TextStyle} props.rightTextStyle
 */




const Inputtext = ({
    onChange,
    title,
    value,
    defaultValue,
    line,
    titleTextStyle,
    color,
    placeholder,
    underline = true,
    underlineColor,
    placeholderTextColor,
    inputStyle,
    containerStyle,
    secureTextEntry,
    keyboardType = 'default',
    editable = true,
    leftText,
    rightText,
    leftTextStyle,
    rightTextStyle,
    maxLength
}) => {
    return (
        <View
            style={{
                width: '100%',
                ...containerStyle,
            }}
        >
            {
                title ? (
                    <Text style={{ fontFamily: fontFamily.bold, color: colors.black, ...titleTextStyle }}>{title}</Text>
                ) : null
            }
            <View style={{ flexDirection: 'row', justifyContent: rightText ? 'space-between' : 'flex-start' }}>
                {
                    leftText ? (
                        <Text style={{ fontFamily: fontFamily.bold, color: colors.black, paddingRight: 24, ...leftTextStyle }}>{leftText}</Text>
                    ) : null
                }
                <TextInput
                    maxLength={maxLength? 13 : null}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    numberOfLines={line}
                    multiline={line ? true : false}
                    keyboardType={keyboardType}
                    textAlignVertical='top'
                    editable={editable}
                    value={value ? value : null}
                    defaultValue={defaultValue ? defaultValue : null}
                    onChangeText={(text) => onChange ? onChange(text) : null}
                    style={[
                        line ? {
                            height:
                                (Number(inputStyle?.fontSize ? inputStyle.fontSize : fontSize.subBody) * line) + 64
                        } : null,
                        {
                            color: color,
                            width: '100%',
                            fontSize: fontSize.subBody,
                            padding: 0,
                            ...inputStyle,
                        }
                    ]}
                />
                {
                    rightText ? (
                        <Text style={{ fontFamily: fontFamily.bold, color: colors.black, paddingLeft: 24, ...rightTextStyle }}>{leftText}</Text>
                    ) : null
                }
            </View>
            {
                underline ? (<View style={{ width: '100%', height: 1, backgroundColor: underlineColor? underlineColor : placeholderTextColor }} />) : null
            }
        </View>
    )
}

export default Inputtext