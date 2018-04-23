import React from 'react'
import {TouchableOpacity,View, StyleSheet, Image, Text} from 'react-native'


import firebase from 'firebase';

import {Button} from '../components/Button'

export default class Doors extends React.Component{
    static navigationOptions = {
        title: 'Porte',
        headerLeft: null,
        headerStyle:{
          elevation: 0,
        },
        headerTitleStyle:{
          fontSize: 24,
          color: '#C42C51',
          textAlign: 'center',
          width: '100%',
          justifyContent: 'center',
          alignSelf: 'center',
          marginHorizontal: 0,
        },
        tabBarIcon: () => {
          return <Image source={require('../img/icon_porte.png')}  style={{width:28,height:28}}/>
        }
      }

    render() {
        return(
            <View style={ styles.container }>
                <Image style={ styles.img } source={require('../img/Porte.png')}/>
                <Text style={ styles.texte}>Personne n’est à votre porte pour l’instant</Text>
                <View style = {{marginBottom: 15}}>
                 <Button>OUVRIR</Button>
                </View>
                <View style = {{marginBottom: 15}}>
                    <Button>AFFICHER UN MESSAGE</Button>
                </View>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FCFDFE',
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'relative',
    },
    containerLoading: {
      flex: 1,
      backgroundColor: '#FCFDFE',
      alignItems: 'center',
      justifyContent: 'space-around',
      position: 'relative',
    },
    img: {
      width: 250,
      height: 250,
      marginVertical: 5,
  
      marginHorizontal: 'auto'
    },
    texte: {
      fontSize: 20,
      fontWeight: "bold",
      color: '#545750',
      width: 240,
      textAlign: 'center',
      marginBottom: 30,
    },
  
  
   });