import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import Theme from "./Theme"

export const ListItemMain = (props) => (
        <TouchableOpacity  
            style={[styles.listItemContButton, {backgroundColor: props.bkgColor}]}
            onPress={onPressItem}  
            >
                    {/* <Text>Width:{widthNeg10}</Text> */}
                    <Text style={styles.listItemText}>{props.item.destination}</Text>
                    <View style={styles.listItemInnerButtonCont}>
                        <Text style={styles.listItemText}>{props.item.itemName}</Text>
                        <Text style={styles.listItemText}>  x{props.item.quantity}</Text>
                  </View>
        </TouchableOpacity>
)

const styles = StyleSheet.create({
      listItemContButton:{
        minWidth:"70%",
        borderRadius: 5,
        paddingHorizontal: '5%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
      },
    
      listItemInnerButtonCont:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      
      listItemText:{
        color: Theme.FONTCOLORDARK,
      },
})