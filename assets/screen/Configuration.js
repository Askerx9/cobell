import React from 'react'
import { StyleSheet, Text, View , Image, KeyboardAvoidingView, TouchableOpacity, Picker} from 'react-native'

import wifi from 'react-native-android-wifi';

import {Input} from '../components/Input'
import {Button} from '../components/Button'


export default class Configuration extends React.Component{

  static navigationOptions = {
    title: 'Configuration',
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
      ssid: [],
      selectSsid:'',
      password:'',
    }

    wifi.loadWifiList((wifiStringList) => {
      var wifiArray = JSON.parse(wifiStringList);

      wifiArray.forEach((el) =>{
        this.setState({ssid:[...this.state.ssid, el.SSID]})
      })
      console.info(this.state.ssid)
      },
      (error) => {
        console.log(error);
      }
    );
  }

    render(){
        const select = Object.keys(this.state.ssid).map(key => {
          return(
            <Picker.Item key={key} label={this.state.ssid[key]} value={this.state.ssid[key]} />
          )
        })
        return(
          <KeyboardAvoidingView behavior='position' style={styles.container}>
            <View style={ {width:'100%', alignSelf: 'center', } }>
              <Image style={ styles.img } source={require('../img/Smartphone.png') } />
            </View>
            <Text style={ styles.texte}>Connecter la sonnette à votre réseau Wi-Fi.</Text>
            <View style={styles.formContainer}>
              <Picker
                selectedValue={this.state.selectSsid}
                style={{ height: 50, width: 300}}
                onValueChange={(itemValue, itemIndex) => this.setState({selectSsid: itemValue})}>
                <Picker.Item label="SSID" value='' />
                {select}
              </Picker>
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
                <Button onPress={() => console.log('ok')}>SE CONNECTER</Button>
              </View>
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
    width: 250,
    height: 250,
    marginBottom: 15,

    marginHorizontal: 'auto'
  },
  texte: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#545750',
    width: 250,
    textAlign: 'center',
    marginBottom: 30,
    alignSelf: 'center'
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


