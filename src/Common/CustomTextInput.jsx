import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomTextInput = ({ handleChange, handleBlur, value, name, placeholder, secure }) => {
    return (
        <View>
            <TextInput
                style={styles.textinput}
                onChangeText={handleChange(name)}
                onBlur={handleBlur(name)}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={'#000'}
                secureTextEntry={secure}
            />
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    textinput: {
        height: 40,
        borderRadius: 8,
        borderColor: '#000',
        borderWidth: 1,
        paddingHorizontal:10,
        color:'#000'
        
    }
})