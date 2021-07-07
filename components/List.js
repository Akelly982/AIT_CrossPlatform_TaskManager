import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import Theme from "./Theme"



//  <List items={data}  completeHandler={itemCompleteBtn}  deleteHandler={itemDeleteBtn} itemSelectedHandler={itemSelectedBtn} itemSelectedValue={itemSelected}/>

export const List = (props) => {  //dont forger to rename this function / component

    const myRenderItemBasic = ({item}) => (
        <View style={listStyles.itemBasic}>
            <Text>{item.destination}</Text>
            <Text>{item.itemName}</Text>
            <Text>x{item.quantity}</Text>
        </View>
    ) 


    //RENDERING ITEMS ------------------------------------------
    const myRenderItem = ({item}) => {

        //setup data for each item before creating item
        let bkgColor =  Theme.bkgColorItemActive  // most likely option's 
        let isSelected = false;   

        if(props.itemSelectedValue === item.id){
            bkgColor = Theme.bkgColorSelectedBtn
            isSelected = true;
        }else if(item.isComplete){
            bkgColor = Theme.bkgColorItemCompleted
        }


        // create reusable Main Component
        const ListItemMain = () => (
            <TouchableOpacity  
                  style={[listStyles.listItemContButton, {backgroundColor: bkgColor}]}
                  onPress={() => props.itemSelectedHandler(item.id)}
                  >
                    <Text style={listStyles.listItemText}>{item.destination}</Text>
                    <View style={listStyles.listItemInnerButtonCont}>
                        <Text style={listStyles.listItemText}>{item.itemName}</Text>
                        <Text style={listStyles.listItemText}>  x{item.quantity}</Text>
                    </View>
              </TouchableOpacity>
        )
      

        //create item based on result
        if(isSelected == false){
            return(
                <View style={listStyles.listItemOuterCont}>
                    <ListItemMain />
                </View>
            )
        }else{
            return(
                <View style={listStyles.listItemOuterCont}>
                    <ListItemMain />
                    <View style={listStyles.selectButtonContainer}>
                        <TouchableOpacity
                            style={listStyles.selectItemButtonComplete}
                            onPress={() =>  props.completeHandler(item.id)}
                        >
                            <Text style={{color: Theme.textItemBtn1}}>Change Status</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={listStyles.selectItemButtonDelete}
                            onPress={() =>  props.deleteHandler(item.id)}
                        >
                            <Text style={{color: Theme.textWarningBtn}}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }


    //Item we Are Rendering and its onPress Event
  //Is here due to connection to useState's
  const CreateListItem = (props) => {

    
    
  }






    //-----------------------------------------------
    //-------- MAIN RETURN --------------------------

    return (
        <View style={listStyles.listContainer}>
            <FlatList
                data={props.items}
                renderItem={myRenderItem} 
                keyExtractor={item => item.id}
                extraData={props.itemSelectedValue}
            />
        </View>
    )
    
}








const listStyles = StyleSheet.create({

    listContainer:{
        backgroundColor: Theme.bkgColorBottom,
        height: 420, //determins the max size of the list dose not auto decide for phone for some reason
    },

    listItemOuterCont:{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width: '70%',
        // backgroundColor: "yellow",
    },

    listItemContButton:{
        width: '100%',
        borderRadius: 5,
        paddingHorizontal: '5%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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

    selectItemButtonComplete:{
        backgroundColor: Theme.bkgColorItemBtn1,
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

    selectItemButtonDelete:{
        backgroundColor: Theme.bkgColorWarningBtn,
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
        color: Theme.textLight,
    },

    listItemTextLight:{
        color: Theme.textDark,
    },


    //-----------------------------------------------
    //--------RENDER ITEM BASIC ---------------------

    itemBasic:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        height: 100,
    }

})

