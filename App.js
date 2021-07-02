import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {useState , useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Dimensions, Modal, ImageBackground, Pressable, ScrollView, VirtualizedList } from 'react-native';

//AsynStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ListItemMain} from './components/ListItemMain';
import Theme from './components/Theme';

// An array with an associate array within it
// const tempData = [
//   {id: '321312', destination: 'Germa', itemName: "big mac", quantity: "1", completed: false},
//   {id: '43134', destination: 'Liv', itemName: "quater pounder", quantity: "1", completed: false},
//   {id: '412341', destination: 'Oliver', itemName: "cheeseburger", quantity: "1", completed: false},
//   {id: '143241', destination: 'Michael', itemName: "Fish n Chips", quantity: "3", completed: false},
//   {id: '132432', destination: 'New Port Arms hotel', itemName: "Cesar salad", quantity: "5", completed: false},
//   {id: '4341132', destination: 'Eves Bar', itemName: "KFC Family bucket", quantity: "1", completed: false},
// ];

// const tempDataCompleted = [
//   {id: '67465', destination: 'Eves Bar', itemName: "Tap Water Bottles", quantity: "6", completed: true},
//   {id: '344523', destination: 'Eves Bar', itemName: "Ice Water Bottles", quantity: "10", completed: true},
//   {id: '52342435', destination: 'Camren', itemName: "Spicy Chiken Soup", quantity: "5", completed: true},
//   {id: '253462', destination: 'Louise', itemName: "Pesto Pasta", quantity: "1", completed: true},
//   {id: '7564756', destination: 'Eves Bar', itemName: "Tooheys New kegs", quantity: "6", completed: true},
// ];

const windowWidth = Dimensions.get('window').width;
const widthNeg10 = windowWidth*.90;


export default function App() {
  const [isfirstRun, setIsFirstRun] = useState(true)
  const [destination, setDestination] = useState()
  const [itemName, setName] = useState()
  const [quantity, setQuantity] = useState()

  const [dataCombined, setDataCombined] = useState([])
  const [dataActive, setDataActive] = useState([])
  const [dataCompleted, setDataCompleted] = useState([])
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

      //wait 1 sec
      // do somthing
      setTimeout(tryCombine, 1000)
      //setDataCombined(dataActive.concat(dataCompleted))
    }

    if(quantity == 99){
      setQuantity(0)
      console.log("super secret btn")
      //let tempArr = dataActive.concat(dataCompleted)
      setDataCombined(dataActive.concat(dataCompleted))
      console.log(dataCombined.lenght)
    }

    if(dataCombined.lenght == 0){
      setDataCombined(dataActive.concat(dataCompleted))
    }


  })

  const tryCombine = () => {
    // console.log("hello")
    // let tempArr = dataActive.concat(dataCompleted)
    // setDataCombined((dataActive.concat(dataCompleted)))
    // setUpdater(!updater)
    // console.log(dataCombined)
  }

  // STORAGE / DB control ---------------------------------
  //-------------------------------------------------------

  const setAsyncStorage = () => {
    if(dataActive.length > 0 || dataCompleted.length > 0){

      // Update Active Data
      AsyncStorage.setItem( 'dataActive' ,JSON.stringify(dataActive) )
      .then( () => { 
        console.log('dataActive stored')
      })
      .catch( (error) => {
        console.log("dataActive Store Error: " + error)
      })

      //Update Completed Data
      AsyncStorage.setItem( 'dataCompleted' ,JSON.stringify(dataCompleted) )
      .then( () => { 
        console.log('dataCompleted stored')
      })
      .catch( (error) => {
        console.log("dataCompleted Store Error: " + error)
      })

    }
  }


  // Only get from storage once when the app loads
  // OnFirstRun component handels this...
  const getAsyncStorage = (props) => {

    //get active data
    AsyncStorage.getItem('dataActive')
    .then( (value) => {
      if( value ) {
      const items = JSON.parse(value)
      setDataActive( items )
      
    }
    else {
      console.log('dataActive has no data')
    }
    })
    .catch( (error) => {
      console.log(error)
    })


    //get completed data
    AsyncStorage.getItem('dataCompleted')
    .then( (value) => {
      if( value ) {
      const items = JSON.parse(value)
      setDataCompleted( items )
      console.log("dataCompleted data found")
    }
    else {
      console.log('dataCompleted has no data')
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
      // create a new item in same format of original array  ("Associate array")
      let newItem = {id: Date.now().toString(), destination: destination, itemName: itemName, quantity: quantity, completed: false}
      
      let tempArr = dataActive
      tempArr.unshift(newItem)
      setDataActive(tempArr)
      //console.log(dataActive)

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
    }else if(!item.completed){
      color = Theme.BKGCOLOR
    }

    return(
      //Create items
      <CreateListItem item={item} bkgColor={color} isComplete={item.completed} isSelected={isSelected}/>
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
        let isWithinDataActive = false
        let tempItem = null
        let tempArr = null

        //Find Item 
        //    - identify origin Arr
        //    - create tempItem 
        //    - delete original item
        //    - setTempItem
        //    - update opposing array 

        if(dataActive.length > 0){  // if lenght == 0 dataActive[i].id == undefined
          for (let i = 0; i < dataActive.length; i++){
            if(dataActive[i].id == itemSelected){
              isWithinDataActive = true
              
              //Update This array
              tempItem = dataActive[i]
              tempArr = dataActive
              tempArr.splice(i,1); //deletes starting from index i by ammount 1
              setDataActive(tempArr)   

              //add tempItem to opposing list
              tempItem.completed = true
              tempArr = dataCompleted
              tempArr.unshift(tempItem)
              setDataCompleted(tempArr)

              //remove selection
              setItemSelected(null)

            }
          }
        }

        // not found in dataActive (Inverse of above essentially)
        if(!isWithinDataActive){ //dont run if item found already

          if(dataCompleted.length > 0){
            for (let i = 0; i < dataCompleted.length; i++){
              if(dataCompleted[i].id == itemSelected){
                
                //Update This array
                tempItem = dataCompleted[i]
                tempArr = dataCompleted
                tempArr.splice(i,1);
                setDataCompleted(tempArr)   
      
                //add tempItem to opposing list
                tempItem.completed = false
                tempArr = dataActive
                tempArr.unshift(tempItem)
                setDataActive(tempArr)

                //remove selection
                setItemSelected(null)
      
              }
            }
          }

        }else{
          console.log("not found in either array")
        }
        
        //Once changes have been made update storage
        setAsyncStorage()

      }
    }



    const onPressItemDelete  = () => {

      let isWithinDataActive = false
      let tempArr = null

      //Find Item 
      //    - identify origin Arr
      //    - delete original item
      if(dataActive.length > 0){
        for (let i = 0; i < dataActive.length; i++){
          if(dataActive[i].id == itemSelected){
            isWithinDataActive = true
            
            //Delete from this array
            tempArr = dataActive
            tempArr.splice(i,1);
            setDataActive(tempArr)   
  
            //remove selection
            setItemSelected(null)
  
          }
        }
      }
      

      // not found in dataActive
      if(!isWithinDataActive){ 

        if(dataCompleted.length > 0){
          for (let i = 0; i < dataCompleted.length; i++){
            if(dataCompleted[i].id == itemSelected){
              
              //Delete from this array
              tempArr = dataCompleted
              tempArr.splice(i,1);
              setDataCompleted(tempArr)   

              //remove selection
              setItemSelected(null)
    
            }
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
          data={dataActive}
          renderItem={myRenderItem}  // use our listItem component from import instead of renderer
          keyExtractor={item => item.id}
          extraData={[itemSelected, updater]}
      />

      <Text>-----Completed-----</Text>
      <FlatList
            data={dataCompleted}
            renderItem={myRenderItem}
            keyExtractor={x => x.id}
            extraData={[itemSelected, updater]}
      />

      {/* <Text>-----Combined-----</Text>
      <FlatList
            data={dataCombined}
            renderItem={myRenderItem}
            keyExtractor={x => x.id}
            extraData={[itemSelected, updater]}
      /> */}


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
