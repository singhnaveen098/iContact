import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Contacts from 'react-native-contacts'
import Contact_card from './Contact_card'
import {useIsFocused} from '@react-navigation/native'

const mycontacts = ({navigation}) => {
    const isfocused = useIsFocused()
    const [Mycontacts, setMycontacts] = useState([])

    useEffect(() => {
        getcontacts()
    }, [isfocused])

    const getcontacts = async ()=>{
        try{
            const permission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS
            )
            if(permission==='granted'){
                const contacts = await Contacts.getAll()
                setMycontacts(contacts)
            }
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <View style={styles.container}>
          <Ionicons
            name = 'add-circle'
            size = {62}
            color = 'blue'
            style = {styles.addicon}
            onPress = {()=>{navigation.navigate('Create Contact')}}
          />
          <FlatList
            data={Mycontacts}
            keyExtractor={(item)=>item.recordID}
            renderItem={({item})=>(
                <TouchableOpacity onPress={()=>{navigation.navigate('Profile', {contactinfo: {id: item.recordID}})}}>
                    <Contact_card contactinfo={item}/>
                </TouchableOpacity>
            )}
          /> 
        </View>
    )
}

export default mycontacts

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    addicon:{
        position:'absolute',
        bottom:20,
        right:20,
        zIndex:1
    }
})