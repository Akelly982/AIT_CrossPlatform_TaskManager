import React from "react"
import { View, StyleSheet, Text} from "react-native"
import Theme from "./Theme"

export const Title = (props) => (
    <View>
      <Text style={styles.appTitle}>{props.name}</Text>
    </View>
)


const styles = StyleSheet.create({
    appTitle: {
        paddingTop: 30,
        backgroundColor: Theme.bkgColorAppTitle,
        paddingVertical: 15,
        width: '100%',
        textAlign: 'center',
        fontSize: 30,
        color: Theme.textAppTitle,
        fontWeight: 'bold',
    },
})  