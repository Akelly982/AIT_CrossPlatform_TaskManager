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




      {/* Input Content
      {/* Header */}
      <View style={styles.inputFieldRowCenterTitle}>
        <Text>Create Task:</Text>
      </View>
      {/* Inputs */}
      <View style={styles.inputFieldRow}>
        <Text style={styles.inputFieldRowText}>Location/person:</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="ZenBar/Monica"
          onChangeText={(x) => setDestination(x)}
        >
        </TextInput>
      </View>
      <View style={styles.inputFieldRow}>
        <Text style={styles.inputFieldRowText}>Item name:</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="Bottled Water"
          onChangeText={(x) => setName(x)}
        >
        </TextInput>
      </View>
      <View style={styles.inputFieldRow}>
        <Text style={styles.inputFieldRowText}>Quantity:</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="2"
          onChangeText={(x) => setQuantity(x)}
          keyboardType="numeric"
        >
        </TextInput>
      </View>
      {/* Buttons */}
      <View style={styles.inputFieldRowCenterButton}>
        <TouchableOpacity 
          style={styles.inputButton}
          onPress={addItemBtn}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View> */}

