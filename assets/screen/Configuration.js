import React from 'react'
import { StyleSheet, Text, View , Image, KeyboardAvoidingView, TouchableOpacity, Picker, ActivityIndicator} from 'react-native'

import wifi from 'react-native-android-wifi';
import firebase from 'firebase';

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
      loading: false,
      connected: state.report.connected
    }

    wifi.loadWifiList((wifiStringList) => {
        var wifiArray = JSON.parse(wifiStringList);

        wifiArray.forEach((el) =>{
          this.setState({ssid:[...this.state.ssid, el.SSID]})
        })
      },
      (error) => {
        console.log(error);
      }
    );
  }

  connectToWifi () {
    fetch('http://10.3.141.1/wifiUp.php?userId='+firebase.auth().currentUser.uid+'&ssid='+this.state.selectSsid+'&psk='+this.state.password)
    .then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) })
    this.setState({loading:true})
  }

  render(){
      if(!this.state.connected && !this.state.loading){
        const select = Object.keys(this.state.ssid).map(key => {
          return(
            <Picker.Item key={key} label={this.state.ssid[key]} value={this.state.ssid[key]} style={{ fontSize: 14}}/>
          )
        })
        return(
          <KeyboardAvoidingView behavior='position' style={styles.container}>
            <View style={ {width:'100%', alignSelf: 'center', } }>
              <Image style={ styles.img } source={require('../img/Smartphone.png') } />
            </View>
            <Text style={ styles.texte}>Connecter la sonnette à votre réseau Wi-Fi.</Text>
            <View style={styles.formContainer}>
              <View style={styles.row}>
                <Image style={ styles.ImageStyle} resizeMode="contain" source={require('../img/wifi.png') } />
                <Picker
                  selectedValue={this.state.selectSsid}
                  style={{ height: 40, flex: 1}}
                  onValueChange={(itemValue, itemIndex) => this.setState({selectSsid: itemValue})}>
                  <Picker.Item label="SSID" value='' style={{ fontSize: 12, color:"#C6CCC2"}} />
                  {select}
                </Picker>
              </View>
              <Input
                image = {require('../img/password.png')}
                placeholder = 'Mot de passe'
                keyboardType = 'default'
                returnKeyType = 'next'
                secureTextEntry
                value = {this.state.password}
                onChangeText = {(text) => this.setState({password: text}) }
              />
              <Button onPress={() => this.connectToWifi()}>SE CONNECTER</Button>
            </View>
          </KeyboardAvoidingView>
        )
      }

      else if(!this.state.connected && this.state.loading){
        return(
          <View style={styles.container}>
            <View style={styles.containerLoading}>
              <ActivityIndicator size="large" color="#C42C51" />
              <Text style={styles.texte}>La sonnette redémarre.</Text>
            </View>
          </View>
        )
      }

      else{
        return(
          <View style={styles.container}>
            <View style={ {width:'100%', alignSelf: 'center', } }>
              <Image style={ styles.img } source={require('../img/SmartphoneOk.png') } />
            </View>
            <Text style={ styles.texte}>La sonnette est prête</Text>
            <Text style={ styles.texteLitle}>Maintenant que tout est configuré, 
              vous aurez toujours votre 
              sonnette à portée de main.
            </Text>
            <Button onPress={() => this.props.navigation.navigate('History')}>J'AI COMPRIS</Button>
          </View>
        )
      }
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
  containerLoading: {
    backgroundColor: '#FCFDFE',
    alignItems: 'center',
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
  texteLitle: {
    fontSize: 16,
    fontWeight: "100",
    color: '#C6CCC2',
    width: 250,
    textAlign: 'center',
    marginBottom: 30,
    alignSelf: 'center'
  },
  formContainer: {
    width: 290,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
   },
   ImageStyle: {
    marginTop: 2,
    marginRight: 15,
    width: 15,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: "rgba(84,87,80,0.1)",
    borderBottomWidth: 1,
    height: 40,
    paddingBottom: 0,
    marginBottom: 10,
  },

 });


