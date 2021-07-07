import React from 'react';
import {useState , useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import Constants from 'expo-constants'; //used for statusbar.height

//AsynStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

//import {ListItemMain} from './components/ListItemMain';
import {Theme} from './components/Theme';
import {Title} from './components/Title';
import {InputArea} from './components/InputArea'
import { List } from './components/List';
import { TextSpacer } from './components/TextSpacer';


// Current Data Structure / An array with an associate array within it
// const data = [
//   {id: '7564756', destination: 'Eves Bar', itemName: "Tooheys New kegs", quantity: "6", isComplete: true},
//   {id: '132313123', destination: 'James', itemName: "KFC", quantity: "4", isComplete: false},
// ]


const windowHeight = Dimensions.get('window').height;
const STORAGEKEY = "data"


export default function App() {

    const [isfirstRun, setIsFirstRun] = useState(true)
    const [destination, setDestination] = useState()
    const [itemName, setItemName] = useState()
    const [quantity, setQuantity] = useState()

    const [data, setData] = useState([])
    const [itemSelected , setItemSelected] = useState(null)




    // ------------------------------------------------
    // ------------- useEFFECT ----------------------

    useEffect( () => {

        if(isfirstRun){
          setIsFirstRun(false)
          getAsyncStorage() 
        }
    
        if(quantity == 10110){
          setQuantity(0)
          console.log("super secret btn ")
        }
    
    })


    // ------------------------------------------------
    // -------------ASYNC Storage ----------------------

    const setAsyncStorage = () => {
        if(data.length > 0){
          // Update Active Data
          AsyncStorage.setItem( STORAGEKEY ,JSON.stringify(data) )
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
        AsyncStorage.getItem(STORAGEKEY)
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
    


    // ------------------------------------------------
    // -------------INPUT HANDLER ----------------------

    


    const addNewItem = () => {
        let log = false;
        if(log){
            console.log("destination: " + destination)
            console.log("itemName: " + itemName)
            console.log("quantity: " + quantity)
        }else{
            if(isNaN(quantity)){
                console.log("quantity is not a number: " + quantity)
              }else{
                // create a new item in same format of original array
                let newItem = {id: Date.now().toString(), destination: destination, itemName: itemName, quantity: quantity, isComplete: false}
          
                //add new item to data arr
                setData(data.concat(newItem))

                //update Storage
                setAsyncStorage()
          
              }
        }
    }

    const updateDestination = (val) => {
        setDestination(val)
    }

    const updateItemName = (val) => {
        setItemName(val)
    }

    const  updateQuantity = (val) => {
        setQuantity(val)
    }



    // -----------------------------------------------
    //---------- List Handler ---------------- 

    const  itemCompleteBtn = (itemId) => {
        //console.log(itemId + " : Complete btn")

        if (itemSelected == null){
            console.log("ERROR on item change status itemSelected not set")
        }else{
            //Find Item 
            //    - change isComplete to !isComplete
            //    - storage Update
            data.forEach(element => {
                if(element.id == itemSelected){
                    element.isComplete = !element.isComplete
                }
        
            });

            // deselect Item
            setItemSelected(null)
    
            //Once changes have been made update storage
            setAsyncStorage()
    
        }
    }

    const  itemDeleteBtn = (itemId) => {
        //console.log(itemId + " : Delete btn")

        if (itemSelected == null){ 
            console.log("ERROR on item delete itemSelected not set")
        }else{
            //Find Item 
            //    - delete item
            //    - storage Update
            if(data.length > 0){
                //for loop because I want index location
                for (let i = 0; i < data.length; i++){
                    if(data[i].id == itemSelected){  

                        //Delete from this array
                        let tempArr = [...data]
                        tempArr.splice(i,1);
                        setData(tempArr)   
                
                        //remove selection
                        setItemSelected(null)

                        //once deletes made update storage
                        setAsyncStorage()
                    }
                }
            }else{
                console.log("DELETE ERROR: data has length <= 0")
            }
        }
    }

    const itemSelectedBtn = (itemId) => {
        //console.log(itemId + " : Selected btn")
        setItemSelected(itemId)
    }


    // -----------------------------------------------
    //---------- MAIN RETURN FUNCTION ---------------- 

    return (
        <View style={styles.container}>
            <Title name={"Scribbles"}></Title>
            <InputArea destinationHandler={updateDestination} itemNameHandler={updateItemName} quantityHandler={updateQuantity} addItemHandler={addNewItem}  />
            <TextSpacer text="---------- Tasks ----------" />
            <List items={data}  completeHandler={itemCompleteBtn}  deleteHandler={itemDeleteBtn} itemSelectedHandler={itemSelectedBtn} itemSelectedValue={itemSelected}/>
        </View> 
    );

}






const styles = StyleSheet.create({

    container: {
        backgroundColor: Theme.textLight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: Constants.statusBarHeight,
        height: '100%',
    },


});
