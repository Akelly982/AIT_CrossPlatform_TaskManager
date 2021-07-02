import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState , useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Dimensions, Modal, ImageBackground, Pressable  } from 'react-native';

import { ListItem } from './components/ListItem';
import Theme from "./components/Theme";

// {} brackets on import is optional kinda at current development version






// basic component
export const ListItem = (props) => (
  <View style={{width: widthNeg10}}>
      <TouchableOpacity>
        <Text>Hello I am Component</Text>
      </TouchableOpacity>
  </View>
)


//Basic function
export const ListItem = () => {

  if(true){
    console.log("fun for function!")
  }

  return(
    <View style={{width: widthNeg10}}>
      <TouchableOpacity>
        <Text>Hello I am Function</Text>
      </TouchableOpacity>
    </View>
  )


  //starting a styleSheet
  const styles = StyleSheet.create({
    
  })
}




// --------------------------------------------
// ----------------------------------------------
//BackUp Data / CODE HOLDER






