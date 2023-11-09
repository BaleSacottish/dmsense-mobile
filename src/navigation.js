import { View, Text, Platform, SafeAreaView } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation, DefaultTheme } from '@react-navigation/native';
import { TransitionSpecs } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
// import 'react-native-gesture-handler';


import Question from './screens/signup/question';
import Welcome from './welcome';

import Information from './screens/signup/information';


import EditProflie from './screens/account/edit';

import Tabs from './tabs';
import colors from './constants/colors';
import SignupPersonalCard from './screens/signup/personal_card';
import SignupPassword from './screens/signup/password';
import SignupPasswordConfirm from './screens/signup/password_confirm';
import SignupPolicy from './screens/signup/policy';
import SignupSuccessSignup from './screens/signup/success_signup';
import UtilSelects from './screens/util/selects';
import AccountEdit from './screens/account/edit';
import SignupAccount from './screens/signup/account';
import SigninPersonalCard from './screens/signin/personal_card';
import SigninPassword from './screens/signin/password';
import SignupQuestion from './screens/signup/question';
import SignupSuccessQuestion from './screens/signup/success_question';
import PasswordChangePasswordVerify from './screens/password_change/password_verify';
import PasswordChangePassword from './screens/password_change/password';
import PasswordChangePasswordConfirm from './screens/password_change/password_confirm';
import PasswordChangeSuccess from './screens/password_change/success';


const Stack = createStackNavigator()

const Theme = {
  ...DefaultTheme,
  colors: {
    background: colors.blue_transparent_7,
  },
};

const Navigation = () => {
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'modal',
          transitionSpec: {
            open: TransitionSpecs.BottomSheetSlideInSpec,
            close: TransitionSpecs.BottomSheetSlideOutSpec,
          }
        }}>
        <Stack.Screen name='Welcome' component={Welcome} />

        <Stack.Screen name='SigninPersonalCard' component={SigninPersonalCard} />
        <Stack.Screen name='SigninPassword' component={SigninPassword} />

        <Stack.Screen name='Question' component={Question} />

        <Stack.Screen name='SignupPersonalCard' component={SignupPersonalCard} />
        <Stack.Screen name='SignupPassword' component={SignupPassword} />
        <Stack.Screen name='SignupPasswordConfirm' component={SignupPasswordConfirm} />
        <Stack.Screen name='SignupPolicy' component={SignupPolicy} />
        <Stack.Screen name='SignupSuccessSignup' component={SignupSuccessSignup} />
        <Stack.Screen name='SignupAccount' component={SignupAccount} />
        <Stack.Screen name='SignupQuestion' component={SignupQuestion} />
        <Stack.Screen name='SignupSuccessQuestion' component={SignupSuccessQuestion} />

        <Stack.Screen name='Information' component={Information} />
        <Stack.Screen name='EditProflie' component={EditProflie} />

        <Stack.Screen name='AccountEdit' component={AccountEdit} />

        <Stack.Screen name='PasswordChangePasswordVerify' component={PasswordChangePasswordVerify} />
        <Stack.Screen name='PasswordChangePassword' component={PasswordChangePassword} />
        <Stack.Screen name='PasswordChangePasswordConfirm' component={PasswordChangePasswordConfirm} />
        <Stack.Screen name='PasswordChangeSuccess' component={PasswordChangeSuccess} />


        <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
          <Stack.Screen name='UtilSelects' component={UtilSelects} />
        </Stack.Group>
        
        <Stack.Screen name='Tabs' component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;