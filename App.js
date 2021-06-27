import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState , useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput  } from 'react-native';

import { ListItem } from './components/ListItem';
import { CreateListItem } from './components/CreateListItem';

// import {Const} from "./const";
//<Const />
const ACCENTCOLOR = "orange";
const BKGCOLOR = "lightgrey";
const BKGCOLOR2 = "darkgrey";
const FONTCOLOR = "#e8e8e8";
const FONTCOLORDARK = "#3b3b3b";
const INPUTBUTTON = FONTCOLOR;


let tempData = [
  {id: '321312', destination: 'Germa', itemName: "big mac", quantity: "1", completed: false},
  {id: '43134', destination: 'Liv', itemName: "quater pounder", quantity: "1", completed: false},
  {id: '412341', destination: 'Oliver', itemName: "cheeseburger", quantity: "1", completed: false},
  {id: '143241', destination: 'Michael', itemName: "Fish n Chips", quantity: "3", completed: false},
  {id: '132432', destination: 'New Port Arms hotel', itemName: "Cesar salad", quantity: "5", completed: false},
  {id: '4341132', destination: 'Eves Bar', itemName: "KFC Family bucket", quantity: "1", completed: false},
];

let tempDataCompleted = [
  {id: '67465', destination: 'Eves Bar', itemName: "Tap Water Bottles", quantity: "6", completed: true},
  {id: '344523', destination: 'Eves Bar', itemName: "Ice Water Bottles", quantity: "10", completed: true},
  {id: '52342435', destination: 'Camren', itemName: "Spicy Chiken Soup", quantity: "5", completed: true},
  {id: '253462', destination: 'Louise', itemName: "Pesto Pasta", quantity: "1", completed: true},
  {id: '7564756', destination: 'Eves Bar', itemName: "Tooheys New kegs", quantity: "6", completed: true},
];



export default function App() {
  const [id , setId] = useState()
  const [destination, setDestination] = useState()
  const [itemName, setName] = useState()
  const [quantity, setQuantity] = useState()
  const [completed, setCompleted] = useState(false)

  const [selected , setSelected] = useState(null)


  // functions return JSX 
  const myRenderItem = ({item}) => {
    if(!item.completed){
      //Active items
      return(
        <CreateListItem item={item} bkgColor={BKGCOLOR} isComplete={false}/> 
      );
      
    }else{
      //Completed Items
      return(
        <CreateListItem item={item} bkgColor={BKGCOLOR2} isComplete={true}/> 
      );
    }
  }
    
  // components are straight JSX
  const plzRender = ({item}) => (   
    <Text>IEXIST</Text>
  )

  
  const onPressInputBtn = () => {
      let newItem = {id: id, destination: destination, itemName: itemName, quantity: quantity, completed: false}
      tempData.push(newItem)
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}> Scribbles </Text>

     {/* Input Content */}
      {/* Header */}
      <View style={styles.inputFieldRowCenterTitle}>
        <Text>Create Task:</Text>
      </View>

      {/* Temp id row untill it is generated */}
      <View style={styles.inputFieldRow}>
        <Text style={styles.inputFieldRowText}>Id:</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="2"
          onChange={(x) => setId(x)}
          keyboardType="numeric"
        >
        </TextInput>
      </View>


      {/* Inputs */}
      <View style={styles.inputFieldRow}>
        <Text style={styles.inputFieldRowText}>Location/person:</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="ZenBar/Monica"
          onChange={(x) => setDestination(x)}
        >
        </TextInput>
      </View>
      <View style={styles.inputFieldRow}>
        <Text style={styles.inputFieldRowText}>Item name:</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="Bottled Water"
          onChange={(x) => setName(x)}
        >
        </TextInput>
      </View>
      <View style={styles.inputFieldRow}>
        <Text style={styles.inputFieldRowText}>Quantity:</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="2"
          onChange={(x) => setQuantity(x)}
          keyboardType="numeric"
        >
        </TextInput>
      </View>

      <View style={styles.inputFieldRowCenterButton}>
        <TouchableOpacity 
          style={styles.inputButton}
          onPress={onPressInputBtn}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      {/* End inputs section */}




       {/* Flat Lists */}
      <Text>-----Active-----</Text>
      <FlatList 
        data = {tempData}
        renderItem={myRenderItem}  // use our listItem component from import instead of renderer
        keyExtractor={item => item.id}
      />

      <Text>-----Completed-----</Text>
      <FlatList
        data={tempDataCompleted}
        renderItem={myRenderItem}
        keyExtractor={x => x.id}
      />
    </View>


  );
}

const styles = StyleSheet.create({

  spacer:{
    backgroundColor: "#3b3b3b"
  },

  container: {
    display: 'flex',
    // backgroundColor: 'red',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //marginHorizontal: 10,
  },

  header: {
    backgroundColor: ACCENTCOLOR,
    paddingVertical: 15,
    width: '100%',
    textAlign: 'center',
    fontSize: 30,
    color: FONTCOLOR,
    fontWeight: 'bold',
  },

// ----------------------------------
// -------- INPUT FIELD -------------

  inputFieldRow:{
    paddingVertical: 10,
    paddingHorizontal: '20%',
    backgroundColor: BKGCOLOR,
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
  },

  inputFieldRowCenterTitle:{
    paddingTop: 10,
    paddingBottom: 2,
    backgroundColor: BKGCOLOR,
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
  },

  inputFieldRowCenterButton:{
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: BKGCOLOR,
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
  },

  inputFieldRowText:{
    paddingRight: 10,
  },

  textInput: {
    backgroundColor: FONTCOLOR,
    color: FONTCOLORDARK,
    padding: 5,
    borderRadius: 5,
    width: 120,

  },

  inputButton:{
    paddingVertical: 10,
    backgroundColor: INPUTBUTTON,
    width: 100,
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
    borderRadius: 8,
  },

  

  //---------------------------------------------



});
