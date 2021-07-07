import React from "react"
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from "react-native"
import Theme from "./Theme"

export const InputArea = (props) => (
    <View>
        {/* Header */}
        <View style={inputStyles.inputFieldRowCenterTitle}>
            <Text>Create Task:</Text>
        </View>

        {/* Inputs */}
        <View style={inputStyles.inputFieldRow}>
            <Text style={inputStyles.inputFieldRowText}>Location/person:</Text>
            <TextInput 
                style={inputStyles.textInput}
                placeholder="ZenBar/Monica"
                onChangeText={(x) => props.destinationHandler(x)}
            >
            </TextInput>
        </View>
        <View style={inputStyles.inputFieldRow}>
            <Text style={inputStyles.inputFieldRowText}>Item name:</Text>
            <TextInput 
                style={inputStyles.textInput}
                placeholder="Bottled Water"
                onChangeText={(x) => props.itemNameHandler(x)}
            >
            </TextInput>
        </View>
        <View style={inputStyles.inputFieldRow}>
            <Text style={inputStyles.inputFieldRowText}>Quantity:</Text>
            <TextInput 
                style={inputStyles.textInput}
                placeholder="2"
                onChangeText={(x) => props.quantityHandler(x)}
                keyboardType="numeric"
            >
            </TextInput>
        </View>
        
        {/* Button */}
        <View style={inputStyles.inputFieldRowCenterButton}>
            <TouchableOpacity 
                style={inputStyles.inputButton}
                onPress={ () => props.addItemHandler()}
            >
                <Text style={{ color: Theme.textInputBtn}}>Add</Text>
            </TouchableOpacity>
        </View>
    </View>
)


const inputStyles = StyleSheet.create({
// ----------------------------------
// -------- INPUT FIELD -------------

  inputFieldRow:{
    backgroundColor: Theme.bkgColorTop,
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    paddingVertical: 10,
    width: "100%",
  },

  inputFieldRowCenterTitle:{
    paddingTop: 10,
    paddingBottom: 2,
    backgroundColor: Theme.bkgColorTop,
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
  },

  inputFieldRowCenterButton:{
    paddingTop: 5,
    paddingBottom: 20,
    backgroundColor: Theme.bkgColorTop,
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
  },

  inputFieldRowText:{
    paddingRight: 10,
    color: Theme.textInputFieldLabel,
  },

  textInput: {
    backgroundColor: Theme.bkgColorInputField,
    color: Theme.textInputField,
    padding: 5,
    borderRadius: 5,
    width: 120,

  },

  inputButton:{
    paddingVertical: 10,
    backgroundColor: Theme.bkgColorInputBtn,
    width: 100,
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
    borderRadius: 8,
  },

})