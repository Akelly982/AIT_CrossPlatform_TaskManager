import React from "react"
import { View, StyleSheet, Text} from "react-native"
import Theme from "./Theme"

export const Title = () => (
    <View>
      <Text style={styles.appTitle}> MyTitle </Text>
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