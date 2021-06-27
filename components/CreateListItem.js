import * as React from 'react'
import { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal, Alert, Pressable} from 'react-native'

const ACCENTCOLOR = "grey";
const BKGCOLOR = "lightgrey";
const BKGCOLOR2 = "blue";
const FONTCOLOR = "#e8e8e8";
const FONTCOLORDARK = "#3b3b3b";
const INPUTBUTTON = FONTCOLOR;

const windowWidth = Dimensions.get('window').width;
const widthNeg10 = windowWidth*.90;

// given props item={item} bkgColor={"someColor"} isComplete={false}
export const CreateListItem = (props) => {
    // const [counter, setCounter] = useState(0)
    // const [modalVisible, setModalVisible] = useState(false)


    const onPressShowBtns = () => {
        // do somthing 
        // if(props.isComplete){
        //     setModalCompleteVisable(True)
        // }else{
        //     setModalCompleteVisable(True)
        // }
    }

    return(
        <View style={{width: widthNeg10}}>
            <TouchableOpacity  
            style={styles.listItemButton} 
            onPress={onPressShowBtns}
            >
                <View style={[styles.listItemCont, {backgroundColor: props.bkgColor}]}>
                    {/* <Text>Width:{widthNeg10}</Text> */}
                    <Text style={styles.listItemText}>{props.item.destination}</Text>
                    <View style={styles.listItemInnerCont}>
                        <Text style={styles.listItemText}>{props.item.itemName}</Text>
                        <Text style={styles.listItemText}>  x{props.item.quantity}</Text>
                        {/* <Text style={styles.listItemText}>  c{counter}</Text> */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({

    //------------------------------
    //--------- MODAL DOCS PAPGE ---------------------

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },

    buttonOpen: {
        backgroundColor: "#F194FF",
    },

    buttonClose: {
        backgroundColor: "#2196F3",
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },


    //--------------------------------
    //--------------------------------

    listItemButton:{
        width: "100%",
        // Used padding instead of margin due to it 
        // shifting the whole row left and or right???
        paddingHorizontal:10,
        paddingVertical: 10,
      },
    
      listItemCont:{
        //backgroundColor: BKGCOLOR,
        borderRadius: 5,
        paddingHorizontal: '5%',
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    
      listItemInnerCont:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    
      listItemText:{
        color: FONTCOLORDARK,
      },
})