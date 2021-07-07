import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Theme from "./Theme"

export const TextSpacer = (props) => (  //dont forger to rename this function / component
    <View style={textSpacerStyles.spacer}>
        <Text style={textSpacerStyles.spacerText}>{props.text}</Text>
    </View>
)


const textSpacerStyles = StyleSheet.create({
    spacer:{
        backgroundColor: Theme.bkgColorSpacer,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      spacerText:{
        fontSize: 15,
        color: Theme.textSpacer,
        paddingVertical: 10
      },
    
})