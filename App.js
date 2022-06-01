import 'react-native-gesture-handler';
import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Mycontacts from './components/Mycontacts';
import Create_contact from './components/Create_contact';
import Profile from './components/Profile';
import Edit_contact from './components/Edit_contact';

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Mycontacts'>
        <Stack.Screen name='Mycontacts' component={Mycontacts} />
        <Stack.Screen name='Create Contact' component={Create_contact} />
        <Stack.Screen name='Edit Contact' component={Edit_contact} />
        <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
