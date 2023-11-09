import { SafeAreaView, View, Text, Image, TouchableOpacity, Platform, KeyboardAvoidingView, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { StackScreenProps } from '@react-navigation/stack'

import Header from '../../components/header'
import globalStyles from '../../constants/globalStyles'
import globalStyles2 from '../../constants/globalStyles2'
import Botton from '../../components/button'
import colors from '../../constants/colors'
import { fontFamily, fontSize } from '../../constants/fonts'


import DateTimePicker from 'react-native-modal-datetime-picker'
import { createQuestion } from '../../services/api/question'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Radio from '../../components/radio'
import Inputtext from '../../components/inputtext'

const { height, width } = Dimensions.get('window')

const initQuestion = [
  {
    id: 1,
    question: 'ระยะเวลาที่เจ็บป่วยเป็นโรคเบาหวาน',
    answers: ['ต่ำกว่า 1 ปี', '1-5 ปี', '5-10 ปี', 'มากกว่า 10 ปี ขึ้นไป']
  },
  {
    id: 2,
    question: 'ท่านมีภาวะแทรกซ้อนของโรคเบาหวานหรือไม่',
    answers: ['ไม่มี'],
    answers_with_input: ['มี โปรดระบุ']
  },
  {
    id: 3,
    question: 'ประวัติการเป็นโรคเบาหวานในครอบครัว',
    answers: ['ไม่มี'],
    answers_with_input: ['มี โปรดระบุ']
  },
  {
    id: 4,
    question: 'โรคประจำตัวอื่นๆ',
    answers: ['ไม่มี'],
    answers_with_input: ['มี โปรดระบุ']
    // input: true
  },
  {
    id: 5,
    question: 'ท่านได้รับคำแนะนำเกี่ยวกับการดูแลตนเองสำหรับผู้ป่วนเบาหวานครั้งนี้จากใครบ้าง',
    answers: ['แพทย์', 'พยาบาล', 'จากกลุ่มผู้ป่วยเบาหวานด้วยกัน', 'ญาติพี่น้องและเพื่อนๆ', 'สื่อวิทยุโทรทัศน์และเอกสารต่างๆ'],
    answers_with_input: ['แหล่งอื่นๆ โปรดระบุ']
  },
  {
    id: 6,
    question: 'ท่านเห็นด้วยกับข้อความต่อไปนี้หรือไม่ “การมีระดับน้ำตาลในเลือดสูง เป็นเวลานานๆ ท่านจะมีโอกาสเกิดภาวะดังต่อไปนี้ เช่น ตาเป็นต้อกระจก ไตวาย ชาตามปลายมือปลายเท้า โรคความดันโลหิตสูง โรคหัวใจได้”',
    answers: ['เห็นด้วยอย่างยิ่ง', 'เห็นด้วยปานกลาง', 'ไม่เห็นด้วย'],
  },
  {
    id: 7,
    question: 'ท่านเห็นด้วยกับข้อความต่อไปนี้หรือไม่ “แผลที่เท้าของผู้ป่วยเบาหวาน จะเกิดการลุกลามได้ง่ายและหายช้ากว่าคนทั่วไป”',
    answers: ['เห็นด้วยอย่างยิ่ง', 'เห็นด้วยปานกลาง', 'ไม่เห็นด้วย'],
  },
  {
    id: 8,
    question: 'ความถี่ในการออกกำลังกาย',
    answers: ['ทุกวัน', '3 ครั้ง/สัปดาห์', '1 ครั้ง/สัปดาห์', 'ไม่ออกกำลังกาย'],
  }
]

/**
 * @param {StackScreenProps<any, any>} props
 */

const SignupQuestion = ({ navigation, route }) => {

  const index = route.params?.questionIndex || 0;
  const [answerIndex, setAnswerIndex] = useState();
  const [answer, setAnswer] = useState();

  const [questions, setQuestions] = useState(initQuestion);


  const checkInput = () => {
    return answer;
  }

  const next = async () => {
    const patient_id = await AsyncStorage.getItem('id');

    const res = await createQuestion({
      patient_id: patient_id,
      question: questions[index].question,
      answer: answer
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
    }

    if (index + 1 >= questions.length) {
      navigation.navigate('SignupSuccessQuestion');
      return;
    }

    navigation.push('SignupQuestion', {
      ...route.params,
      questionIndex: index + 1,
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <Header />
        <View style={{
          ...globalStyles.welcome_padding,
          // justifyContent: 'space-between'
        }}>
          <View style={{ flex: 1, marginTop: -32, width: '100%' }}>
            <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_14, color: colors.ocean, alignSelf: 'center', marginBottom: 24 }}>{`${index + 1}/${questions.length}`}</Text>
            <View style={{ paddingHorizontal: 25 }}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: fontFamily.medium,
                    fontSize: fontSize.font_20,
                    color: colors.blue,
                    borderRadius: 20,
                  }}>มาตอบคำถามสุขภาพกัน</Text>
              </View>
            </View >
            <View style={{ width: '100%' }}>
              <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.font_16, color: colors.ocean, paddingHorizontal: 16, paddingTop: 24 }}>{initQuestion[index].question}</Text>
              {
                initQuestion[index].answers && initQuestion[index].answers.length > 0 ? (
                  <View style={{ paddingTop: 8 }} >
                    {
                      initQuestion[index].answers.map((a, index) => (
                        <View style={{ paddingTop: 8 }}>
                          <Radio text={a} value={answerIndex == index} onPress={(check) => {
                            if (check) {
                              setAnswer(a);
                              setAnswerIndex(index);
                            }
                            else {
                              setAnswer();
                              setAnswerIndex();
                            }
                          }} />
                        </View>
                      ))
                    }
                  </View>
                ) : null
              }
              {
                initQuestion[index].answers_with_input && initQuestion[index].answers_with_input.length > 0 ? (
                  <View style={{ paddingTop: 8 }} >
                    {
                      initQuestion[index].answers_with_input.map((a, index) => (
                        <View style={{ paddingTop: 8 }}>
                          <Radio text={a} value={answerIndex == index + 'in'} onPress={(check) => {
                            if (check) {
                              setAnswer(a);
                              setAnswerIndex(index + 'in');
                            }
                            else {
                              setAnswer();
                              setAnswerIndex();
                            }
                          }}
                          />
                          {
                            answerIndex == index + 'in' ? (
                              <Inputtext
                                color={colors.blue_transparent_1}
                                placeholder={"ระบุ"}
                                placeholderTextColor={colors.grey_50}
                                underlineColor={colors.ocean}
                                onChange={(value) => setAnswer(value)}
                                containerStyle={{
                                  paddingHorizontal: 16,
                                  paddingTop: 16,
                                  paddingLeft: 64,
                                }}
                                inputStyle={{
                                  fontFamily: fontFamily.medium,
                                  // textAlign: 'center',
                                  fontSize: fontSize.font_14
                                }}
                              />
                            ) : null
                          }
                        </View>
                      ))
                    }
                  </View>
                ) : null
              }
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
            onPress={() => next()}
            disabled={!checkInput()}
          >
          </Botton>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>

  )
}

export default SignupQuestion

{/* <Text style={{ fontFamily: fontFamily.medium, fontSize: fontSize.subBody, color: colors.grey, paddingHorizontal: 16, paddingTop: 24 }}>คุณสูบบุหรี่ หรือ ดื่มสุรา หรือไม่</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8 }} >
        <View style={{ width: '33%' }}>
          <Radio text='เคย' value={props.value.smoke_and_drunk == 'เคย'} onPress={(check) => onTextChange({smoke_and_drunk: check? 'เคย' : null})} />
        </View>

        <View style={{ width: '33%' }}>
          <Radio text='เคยบ้าง' value={props.value.smoke_and_drunk == 'เคยบ้าง'} onPress={(check) => onTextChange({smoke_and_drunk: check? 'เคยบ้าง' : null})} />
        </View>

        <View style={{ width: '33%' }}>
          <Radio text='ไม่เคย' value={props.value.smoke_and_drunk == 'ไม่เคย'} onPress={(check) => onTextChange({smoke_and_drunk: check? 'ไม่เคย' : null})} />
        </View>
      </View> */}