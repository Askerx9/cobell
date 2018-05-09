import React from 'react'
import {AsyncStorage, StyleSheet, Text, View , Image,TouchableOpacity, KeyboardAvoidingView } from 'react-native'

import firebase from 'firebase';
import CheckBox from 'react-native-checkbox';


import {Input} from '../components/Input'
import {Button} from '../components/Button'


export default class Login extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password:'',
      keepConnect: false,
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('History')
      }
    });
  }
  

  static navigationOptions = {
    header: null,
  }

  onLogInPress(){
    const{email, password} = this.state;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => { 
      this.navigateTo('History') 
    })
    .catch(() =>{ console.error('failed') })

  }

  navigateTo(page) {
    this.props.navigation.navigate(page)
  }

  render(){
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Image style={ styles.img} source={require('../img/logo.png')} />
        <Text style={ styles.texte}>Ne manquez plus jamais personne à votre porte!</Text>
        <View style={styles.formContainer}>
          <Input
            image = {require('../img/envelope.png')}
            placeholder = 'E-mail'
            keyboardType = 'email-address'
            returnKeyType = 'next'
            value = {this.state.email}
            onChangeText = {(text) => this.setState({email: text}) }
          />
          <Input
            image = {require('../img/password.png')}
            placeholder = 'Mot de passe'
            keyboardType = 'default'
            returnKeyType = 'next'
            secureTextEntry
            value = {this.state.password}
            onChangeText = {(text) => this.setState({password: text}) }
          />
          <View style={styles.row}>
            <Text style={styles.linkForget}>Mot de passe oublié</Text>
          </View>
          <Button onPress={() => this.onLogInPress()}>CONNECTEZ-VOUS</Button>
        </View>
        <View style={styles.signUpTextContainer}>
          <Text style={styles.signUpText}>Pas de compte? </Text>
          <Text style={styles.signUplink} onPress={() => this.navigateTo('SignUp')}>S'inscrire</Text>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FCFDFE',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    img: {
      width: 180,
      height: 200,
      marginBottom: 35,
    },
    texte: {
      fontSize: 20,
      fontWeight: "bold",
      color: '#545750',
      width: 250,
      textAlign: 'center',
      marginBottom: 30,
    },
    formContainer: {
      width: 290,
      alignItems: 'center',
      justifyContent: 'center',
     },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: "rgba(84,87,80,0.1)",
      borderBottomWidth: 1,
      height: 40,
      paddingBottom: 5,
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
    row: {
      marginVertical: 15,
      marginTop: 5,
      width: 290,
      flexDirection: 'row',
    },
    linkForget: {
      fontSize: 13,
      fontWeight: '100',
      color: '#C6CCC2',
      width: '100%',
      textAlign: 'right',
    },

    linkView: {
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 10,
      marginHorizontal: 55,
      
    },
    linkViewText: {
      color: '#ADB1A4',
      fontSize: 14
    },
    signUpText: {
      color: '#C42C51',
    },
    signUplink: {
      color: '#C42C51',
      fontWeight: 'bold'
    },
    signUpTextContainer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }

   });


