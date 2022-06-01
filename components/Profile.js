import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Linking
} from 'react-native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Contacts from 'react-native-contacts'

const Profile = ({navigation, route}) => {
    const [contactinfo, setcontactinfo] = useState(null)
    
    const getColor = (letter)=>{
      const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
      const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
      '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
      '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
      '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
      '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
      '#66664D', '#991AFF']
      let upperLetter = letter.toUpperCase();
      return colors[alphabets.indexOf(upperLetter)];
    }
    let contactid = route.params.contactinfo.id
    useEffect(() => {
      getcontact(contactid)
    }, [contactid])

    const getcontact = (id)=>{
      Contacts.getContactById(id)
        .then((contact)=>setcontactinfo(
          {
              ...contact,
              color:getColor(contact.displayName[0])
          }
        ))
        .catch((error)=>{console.log(error)})
    }
    
    const makecall = (number)=>{
      Linking.openURL(`tel:${number}`)
    }
    
    const deletecontact = (contact)=>{
      Contacts.deleteContact(contact)
        .then(()=>navigation.navigate('Mycontacts'))
        .catch((error)=>console.log(error))
    }
    
    if(!contactinfo){
      return <ActivityIndicator size={32}/>
    }
    
    return (
        <View style={styles.container}>
            <ImageBackground
              source={{uri: contactinfo.hasThumbnail ? contactinfo.thumbnailPath : null}}
              style={{...styles.backgroundImage, backgroundColor:contactinfo.color}}
            >
              {!contactinfo.hasThumbnail ? <FontAwesome5 name='user-alt' size={125} color='white'/> : null}
              <AntDesign 
              name='edit' size={28} color='white'
              style={{position:'absolute', top:StatusBar.currentHeight, right:60}}
              onPress={()=>navigation.navigate('Edit Contact', {id: contactid})}
              />
              <AntDesign 
              name='delete' size={28} color='white'
              style={{position:'absolute', top:StatusBar.currentHeight, right:20}}
              onPress={()=>deletecontact(contactinfo)}
              />
              <Text style={styles.maintext}>{contactinfo.displayName}</Text>
            </ImageBackground>
            <View style={{flex:1, marginTop:20}}>
              <FlatList
                data={contactinfo.phoneNumbers}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                  <View style={styles.phonenumbercontainer}>
                    <Text style={{fontSize:16, marginLeft:10}}>{item.number}</Text>
                    <MaterialIcons name='call' size={28} color='blue' onPress={()=>makecall(item.number)}/>
                  </View>
                )}
              />
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  backgroundImage:{
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height/3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  maintext:{
    position:'absolute',
    bottom:20,
    left:20,
    fontSize:30,
    color:'white',
    fontWeight:'bold'
  },
  phonenumbercontainer:{
    flex:1,
    marginHorizontal:10,
    marginBottom:20,
    paddingHorizontal:10,
    elevation:10,
    paddingVertical:20,
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-between'
  }
})