import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

const Button = ({onPress, children}) => {
  return(
    <TouchableOpacity style={styles.button} onPress={ onPress }>
      <Text style={styles.buttonText}>{ children }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 26,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: '#C42C51',
    elevation: 2,
    alignItems: 'center',
    width: 250
  },
  buttonText: {
    color:'#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
})

export { Button }
