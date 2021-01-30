import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import Colors from '../constants/colors'
const NumberContainer = (props) => {
    return (
        <View style={styles.numberBox}>
            {props.children}
        </View>
    )
}
const styles = StyleSheet.create({
    numberBox: {
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    }
})

export default NumberContainer
