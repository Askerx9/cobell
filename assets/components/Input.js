import React from 'react'
import {View, TextInput, Image, StyleSheet} from 'react-native'

const Input = ({image, placeholder, keyboardType, onChangeText, secureTextEntry, returnKeyType, value}) => {
  return(
    <View style={styles.inputContainer}>
      <Image source={image} resizeMode="contain" style={styles.ImageStyle}/>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder= {placeholder}
        autoCapitalize = "none"
        autoCorrect = {false}
        keyboardType = {keyboardType}
        returnKeyType= {returnKeyType}
        secureTextEntry= {secureTextEntry}
        style = {styles.inputText}
        onChangeText = {onChangeText}
        value = {value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: "rgba(84,87,80,0.1)",
    borderBottomWidth: 1,
    height: 40,
    paddingBottom: 0,
    marginBottom: 10,
  },
  inputText: {
    fontSize: 14,
    flex: 1,

   },
   ImageStyle: {
    marginTop: 2,
    marginRight: 15,
    width: 15,
    alignItems: 'center',
  },
})

export { Input }
