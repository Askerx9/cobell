import React from 'react'
import {AsyncStorage, StyleSheet, View} from 'react-native'
import { StackNavigator } from 'react-navigation';

import firebase from 'firebase';

import Login from './assets/screen/Login'
import SignUp from './assets/screen/SignUp'
import History from './assets/screen/History'
import Configuration from './assets/screen/Configuration'



const RootStack = StackNavigator({
  Login: { screen: Login },
  SignUp: { screen: SignUp },
  History: { screen: History },
  Config: { screen: Configuration},
})

const config = {
  apiKey: "AIzaSyBdM98fI2l3hv1IqRIOroIgskvTZ3x0xlA",
  authDomain: "cobell-446f6.firebaseapp.com",
  databaseURL: "https://cobell-446f6.firebaseio.com",
  projectId: "cobell-446f6",
  storageBucket: "cobell-446f6.appspot.com",
  messagingSenderId: "566014638201",
};



export default class App extends React.Component {
  
  constructor(props){
    super(props)
    firebase.initializeApp(config);
    // firebase.auth().signOut()

    
  }



  render() {
    return (
      <RootStack/>
    );
  }
}
