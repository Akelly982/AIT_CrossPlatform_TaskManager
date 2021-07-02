import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {useState , useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Dimensions, Modal, ImageBackground, Pressable, ScrollView, VirtualizedList } from 'react-native';

//AsynStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ListItemMain} from './components/ListItemMain';
import Theme from './components/Theme';


// Current Data Structure / An array with an associate array within it
// const data = [
//   {id: '7564756', destination: 'Eves Bar', itemName: "Tooheys New kegs", quantity: "6", isComplete: true},
//   {id: '132313123', destination: 'James', itemName: "KFC", quantity: "4", isComplete: false},
// ]


const windowWidth = Dimensions.get('window').width;
const widthNeg10 = windowWidth*.90;


export default function App() {
  const [isfirstRun, setIsFirstRun] = useState(true)
  const [destination, setDestination] = useState()
  const [itemName, setName] = useState()
  const [quantity, setQuantity] = useState()

  const [data, setData] = useState([])
  const [itemSelected , setItemSelected] = useState(null)

  //updater this is just gonna flip back and forth between on an off 
  //what matters is that the value changes
  const [updater, setUpdater] = useState(false);




  //STATE UPDATE --------------------------------
  // useEffect is called whenever a state is changed
  useEffect( () => {

    if(isfirstRun){
      setIsFirstRun(false)
      getAsyncStorage() 
    }

    if(quantity == 1011011010){
      setQuantity(0)
      console.log("super secret btn")
      
    }

  })





  // STORAGE / DB control ---------------------------------
  //-------------------------------------------------------

  const setAsyncStorage = () => {
    if(data.length > 0){
      // Update Active Data
      AsyncStorage.setItem( 'data' ,JSON.stringify(data) )
      .then( () => { 
        console.log('data stored')
      })
      .catch( (error) => {
        console.log("data Store Error: " + error)
      })

    }
  }


  // Only get from storage once when the app loads
  // OnFirstRun component handels this...
  const getAsyncStorage = (props) => {
    //get data
    AsyncStorage.getItem('data')
    .then( (value) => {
      if( value ) {
      const items = JSON.parse(value)
      setData( items )
    }
    else {
      console.log('no data found')
    }
    })
    .catch( (error) => {
      console.log(error)
    })
  }


  
  //ADD ITEM ------------------------------------------
  const addItemBtn = () => {

    if(isNaN(quantity)){
      console.log("quantity is not a number: " + quantity)
    }else{
      // create a new item in same format of original array
      let newItem = {id: Date.now().toString(), destination: destination, itemName: itemName, quantity: quantity, isComplete: false}
      
      let tempArr = data
      tempArr.unshift(newItem)
      setData(tempArr)

      setUpdater(!updater)  
      // I include updater due to setDataActive(newArray) 
      // dosent update like setDataActive(DataActice.concat(newITem))

      //update Storage
      setAsyncStorage()

    }
  }


  //RENDERING ITEMS ------------------------------------------
  const myRenderItem = ({item}) => {

    //setup data for each item before creating item
    let color =  Theme.BKGCOLOR2  // least likely option's
    let isSelected = false;   

    if(itemSelected === item.id){
      color = Theme.ACCENTCOLOR;
      isSelected = true;
    }else if(!item.isComplete){
      color = Theme.BKGCOLOR
    }

    return(
      //Create items
      <CreateListItem item={item} bkgColor={color} isComplete={item.isComplete} isSelected={isSelected}/>
    )
  }


  //Item we Are Rendering and its onPress Event
  //Is here due to connection to useState's
  const CreateListItem = (props) => {


    const onPressItem = () => {
        // console.log('Thy pressed me : ' + props.item.id )
        setItemSelected(props.item.id)
    }

    const onPressItemStatusChange = () => {
      if (itemSelected == null){
        console.log("ERROR item change status itemSelected not set")
      }else{
        //Find Item 
        //    - change isComplete to !isComplete
        //    - storage Update
        data.forEach(element => {
          if(element.id == itemSelected){
            element.isComplete = !element.isComplete
          }
        });
        //Once changes have been made update storage
        setAsyncStorage()
      }
    }

    const onPressItemDelete  = () => {
      //Find Item 
      //    - delete item
      //    - storage Update
      if(data.length > 0){
        for (let i = 0; i < data.length; i++){
          if(data[i].id == itemSelected){
            //Delete from this array
            let tempArr = data
            tempArr.splice(i,1);
            setData(tempArr)   
  
            //remove selection
            setItemSelected(null)
  
          }
        }
      }

      //once deletes made update storage
      setAsyncStorage()

    }

    const ListItemMain = () => (
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

    if(props.isSelected == false){
      return(
        <View style={[styles.listItemOuterCont,{width: widthNeg10}]}>
            {/* <ListItemMain item={props.item} bkgColor={color} btn={onPressItem}/>  */}
            <ListItemMain />
        </View>
      )
    }else{
      return(
        <View style={[styles.listItemOuterCont,{width: widthNeg10}]}>
            <ListItemMain />
            <View style={styles.selectButtonContainer}>
              <TouchableOpacity
                style={[styles.selectItemButton,{backgroundColor: Theme.ACCENTCOLOR}]}
                onPress={onPressItemStatusChange}
              >
                <Text>Change Status</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.selectItemButton,{backgroundColor: Theme.WARNINGCOLOR}]}
                onPress={onPressItemDelete}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
        </View>
    )
    }
    
  }




  
  // MAIN RETURN 
  return (

    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.header}> Scribbles </Text>


      {/* Input Content */}
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
      </View>



      {/* Flat Lists */}
      <Text>-----Active-----</Text>
      <FlatList 
          data={data}
          renderItem={myRenderItem}  // use our listItem component from import instead of renderer
          keyExtractor={item => item.id}
          extraData={[itemSelected, updater]}
      />



    </View>
  );
}






const styles = StyleSheet.create({

  spacer:{
    backgroundColor: "#3b3b3b",
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
    backgroundColor: Theme.ACCENTCOLOR,
    paddingVertical: 15,
    width: '100%',
    textAlign: 'center',
    fontSize: 30,
    color: Theme.FONTCOLOR,
    fontWeight: 'bold',
  },




// ----------------------------------
// -------- INPUT FIELD -------------


  inputFieldRow:{
    paddingVertical: 10,
    paddingHorizontal: '20%',
    backgroundColor: Theme.BKGCOLOR,
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
  },

  inputFieldRowCenterTitle:{
    paddingTop: 10,
    paddingBottom: 2,
    backgroundColor: Theme.BKGCOLOR,
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
  },

  inputFieldRowCenterButton:{
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: Theme.BKGCOLOR,
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
  },

  inputFieldRowText:{
    paddingRight: 10,
  },

  textInput: {
    backgroundColor: Theme.FONTCOLOR,
    color: Theme.FONTCOLORDARK,
    padding: 5,
    borderRadius: 5,
    width: 120,

  },

  inputButton:{
    paddingVertical: 10,
    backgroundColor: Theme.INPUTBUTTON,
    width: 100,
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
    borderRadius: 8,
  },

  
  //---------------------------------------------
  //---------------------------------------------

  listItemOuterCont:{
    display: 'flex',
    flexDirection: 'column',
  },

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

  selectButtonContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  selectItemButton:{
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal:10,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    width: '30%',
  },
  
  listItemText:{
    color: Theme.FONTCOLORDARK,
  },

});
