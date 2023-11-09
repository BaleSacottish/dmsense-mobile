import { View, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import colors from '../constants/colors'
import { fontFamily, fontSize } from '../constants/fonts';

// /**
//  * @param {Object} props
//  * @param {boolean} props.value
//  * @param {(status: boolean) => void} props.onPress
//  * @param {number} props.size
//  * @param {string} props.text
//  * @param {string} props.color
//  * @param {ViewStyle} props.style
//  * @param {JSX.Element} props.fontContent
//  * @param {JSX.Element} props.radioStyle
//  */

const Radio = ({
  size = 14,
  text,
  style,
  color = colors.ocean,
  radioStyle,
  value = false,
  onPress,
}) => {

  // const [valueState, setValueState] = useState(value);

  return (
    <View style={{ flexDirection: 'row', paddingTop: 8, paddingHorizontal: 16, alignItems: 'center', ...style }}>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          padding: size,
          borderRadius: 32,
          justifyContent: 'center',
          borderColor: color
        }}
        onPress={() => {
          // setValueState(!value);
          onPress ? onPress(!value) : null;
        }}
      >
        {
          value ? (
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                backgroundColor: color,
                borderRadius: 32,
                padding: size - (size / 10),
                ...radioStyle,
              }}
            />
          ) : null
        }
      </TouchableOpacity>
      <Text style={{ paddingHorizontal: 16, fontFamily: fontFamily.medium, fontSize: fontSize.font_14, color: colors.ocean }}>{text}</Text>
    </View>
  )
}

export default Radio