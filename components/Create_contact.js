import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native'

import Contacts from 'react-native-contacts'

const create_contact = ({ navigation }) => {
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [phonenumbers, setphonenumbers] = useState([''])
  useEffect(() => {
    if (phonenumbers[phonenumbers.length - 1].length > 0) {
      setphonenumbers((prevstate) => [...prevstate, ''])
    }
    try {
      if ((phonenumbers[phonenumbers.length - 2].length === 0) && (phonenumbers.length >= 2)) {
        setphonenumbers((prevstate) => {
          const newstate = prevstate.slice()
          newstate.pop()
          return newstate
        })
      }
    }
    catch{}
  }, [phonenumbers])
  const addcontact = ()=>{
    if((!firstname && !lastname) || phonenumbers.length===1){
      Alert.alert('Something went wrong', 'Please fill all the fields')
      return;
    }
    const myphonenumbers = phonenumbers.map((num)=>{
      return{ label:'mobile', number: num};
    })
    const contactinfo = {
      displayName: firstname + ' ' + lastname,
      givenName: firstname + ' ' + lastname,
      phoneNumbers: myphonenumbers
    }
    Contacts.addContact(contactinfo)
      .then(()=>navigation.navigate('Mycontacts'))
      .catch((error)=>console.log(error))
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder='First Name'
          value={firstname}
          onChangeText={(text) => { setfirstname(text) }}
        />
        <TextInput
          style={styles.input}
          placeholder='Last Name'
          value={lastname}
          onChangeText={(text) => { setlastname(text) }}
        />
      </View>
      {phonenumbers.map((phonenumber, index) => (
        <View style={{ ...styles.inputcontainer, marginVertical: 0 }} key={index}>
          <TextInput
            style={styles.input}
            placeholder='Phone Number'
            keyboardType='number-pad'
            value={phonenumber}
            onChangeText={(text) => {
              setphonenumbers((prevstate) => {
                const newstate = prevstate.slice()
                newstate[index] = text
                return newstate
              })
            }}
          />
        </View>
      ))}
      <Button
        title='Save'
        onPress={() => addcontact()}
      />
    </View>
  )
}

export default create_contact

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  inputcontainer: {
    padding: 10,
    margin: 10
  },
  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    padding: 10
  }
})