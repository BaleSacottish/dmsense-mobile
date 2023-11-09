import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fontFamily, fontSize } from '../../constants/fonts';
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native';

/**
 * @typedef {object} IData
 * @property {number} id
 * @property {string} name_eng
 */

/**
 * @param {object} props
 * @param {StackNavigationProp<any, any, any>} props.navigation
 * @param {RouteProp<any, any>} props.route
 */

const UtilSelects = ({ navigation, route }) => {

  const onPress = route.params?.onPress;
  const type = route.params?.type;

  const query = route.params?.query


  /** @type {[IData[], React.Dispatch<IData[]>]} */
  const [data, setData] = useState();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!type) return;
    switch (type) {
      case 'gender': {
        getGender();
        break;
      }
    }
  }, [])

  const getGender = async () => {
    const res = [{
      id: 1,
      name_th: 'ชาย',
    },
    {
      id: 2,
      name_th: 'หญิง',
    },
    {
      id: 3,
      name_th: 'ไม่ระบุ',
    }];

    setTitle('เลือกเพศของท่าน')
    setData(
      res.map(item => {
        return {
          id: item.id,
          name_th: item.name_th
        }
      }));
  }


  const onSelect = (id, value) => {
    if (!onPress) return;
    onPress(id, value, type);

    navigation.goBack();
  }

  return (
    <View style={styles.linearGradient}>
      <View style={styles.component}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.line} />
        <ScrollView
          contentContainerStyle={styles.scroll}
        >
          {
            data?.map(item => (
              <TouchableOpacity
                style={styles.select}
                onPress={() => {
                  onSelect(item.id, item.name_th)
                }}
              >
                <Text style={styles.select_text}>{item.name_th}</Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>

    </View>
  )
}

export default UtilSelects;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: '#000000CC'
  },
  scroll: {
    alignItems: 'center',
  },

  scroll_linearGradient: {
    zIndex: 1,
    position: 'absolute',
    width: '100%',
    height: '40%',
  },

  title: {
    fontSize: fontSize.font_18,
    color: 'white',
    fontFamily: fontFamily.medium,
    alignSelf: 'center'
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: 'white',
    marginVertical: 8,
    alignSelf: 'center'
  },

  component: {
    width: '100%',
    height: '55%',
    paddingVertical: 32,
  },

  select: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  select_text: {
    fontSize: fontSize.font_18,
    color: 'white',
    fontFamily: fontFamily.medium
  }
})