import React from 'react'
import { StyleSheet, Text, View , Image, KeyboardAvoidingView, TouchableOpacity, Platform} from 'react-native'

import firebase from 'firebase';
import CheckBox from 'react-native-checkbox';

import {Input} from '../components/Input'
import {Button} from '../components/Button'


export default class SignUp extends React.Component{

  static navigationOptions = {
    title: 'Créer un compte',
    headerStyle:{
      elevation: 0,
    },
    headerTitleStyle:{
      fontSize: 24,
      color: '#C42C51',
      textAlign: 'center',
      width: '75%',
      justifyContent: 'center',
      alignSelf: 'center'
    }
  }



  constructor(props) {
    super(props)

    this.state = {
      firstname: '',
      email: '',
      password:'',
    }
  }
  writeUserData(userId) {

    const name = this.state.firstname;

    const data = {
      name: name,
      history: null,
      settings: {
        notif: true,
        silence: false,
        derange: false,
        derangeStart: '1523877774',
        derangeEnd: '1523877779',
        messages: {
          m1: 'Je ne suis pas là, repasse plus tard',
          m2: "J'arrive attends 5 minutes"
        }
      },
    }

    
      return firebase.database().ref().child('users/' + userId).set(data)
      // firebase.database().ref('users/' + userId).set(data)

    // let updates= {};
    // updates['users/' + userId] = data;

  }

  onLogInPress(){
    const{email, password} = this.state;
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
    .then((user) => {
      
      const userId = user.user.uid
      this.writeUserData(userId)
      console.info(userId)
    })
    .catch((error) =>{
      let errorCode = error.code;
      let errorMessage= error.message;

      console.error(errorCode)
      console.error(errorMessage)
    })
  }

    render(){
        return(
          <KeyboardAvoidingView behavior='position' style={styles.container}>

            <View style={ {width:'100%', alignSelf: 'center', } }>
              <Image style={ styles.img } source={ require('../img/user.png') } />
            </View>

            <View style={styles.formContainer}>
              <Input
                image = {require('../img/firstname.png')}
                placeholder = 'Prénom'
                keyboardType = 'default'
                returnKeyType = 'next'
                value = {this.state.firstname}
                onChangeText = {(text) => this.setState({firstname: text}) }
              />
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
                <CheckBox
                  label='J’accepte les conditions d’utilisation'
                  // checked={true}
                  onChange={(checked) => console.log('I am checked', checked)}
                  checkedImage={require('../img/check.png')}
                  uncheckedImage={require('../img/uncheck.png')}
                  checkboxStyle= {{width: 10, height: 10}}
                  labelStyle= {{fontSize: 13, color: '#C6CCC2' }}
                />
              </View>

              <Button onPress={() => this.onLogInPress()}>CRÉER UN COMPTE</Button>
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
    justifyContent: 'flex-start',
    position: 'relative',
  },
  img: {
    width: 250,
    height: 250,
    marginVertical: 15,

    marginHorizontal: 'auto'
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
    width: 290,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  checkView: {
    marginTop: 15,
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


