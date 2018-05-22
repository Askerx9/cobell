import React from 'react'
import {Modal,View, StyleSheet, Image, Text, TextInput, TouchableOpacity} from 'react-native'
import PushNotification from 'react-native-push-notification'

import firebase from 'firebase';

import {Button} from '../components/Button'

export default class Doors extends React.Component{
    static navigationOptions ={
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
        },
        tabBarOnPress: (scene, jumpToIndex) =>{
          scene.jumpToIndex(scene.scene.index)
          scene.scene.route.params = false
          firebase.database().ref().child('users/'+ userId +'/fromHistory').set(false)
        }
      }

    constructor(props){
      super(props)
      const user = firebase.auth().currentUser;
      this.state = {
        data: "",
        userId: user.uid, 
        modalVisible: false,
        message: "",
        fromHistory: this.props.navigation.state.params || false,
      }
      global.userId = user.uid
      
    }

    componentDidMount() {
      PushNotification.configure({
        onNotification: function(notification) {
            console.log( 'NOTIFICATION:', notification );
        },
      })
      
    }
    componentWillMount() {
      firebase.database().ref('users/' + this.state.userId).on('value', snapshot => {
        global.state = {report: snapshot.val()};
        this.setState({
          data: snapshot.val().doors,
          message: snapshot.val().message,
          fromHistory: snapshot.val().fromHistory
        })
        setTimeout(() => {
          if(snapshot.val().doors && snapshot.val().settings.notif){

            if (snapshot.val().settings.derange){
              
              const startTime = snapshot.val().settings.derangeStart
              const endTime = snapshot.val().settings.derangeEnd
  
              const date = new Date()
  
              let day = date.getDate()
              let month = date.getMonth()+1
              let year = date.getFullYear()
  
              if(day < 10){
                day = "0" + date.getDate()
              }
  
              if(month < 10){
                month = "0" + (date.getMonth()+1)
              }
  
              const now = Date.now()
                          
              const start = new Date(year+'-'+month+'-'+day+'T'+startTime+':00')
              let end = new Date(year+'-'+month+'-'+day+'T'+endTime+':00')
  
              if(end.getTime() < start.getTime()){
                let newDay = Number(day)+1
                if(newDay < 10){
                  newDay = "0" + newDay
                }
                end = new Date(year+'-'+month+'-'+newDay+'T'+endTime+':00')

              }
              if(now < start.getTime() || now > end.getTime()){
                PushNotification.localNotification({
                  message: snapshot.val().name + " une personne est à votre porte!", // (required)
                });
              }
            }else{
              PushNotification.localNotification({
                message: snapshot.val().name + " une personne est à votre porte!", // (required)
              });
            }
          }
        }, 500)
      })
    }
    
    changeState(mess, enter) {
      firebase.database().ref().child('users/'+ this.state.userId +'/history/'+ enter +'/state').set(mess)
      firebase.database().ref().child('users/'+ this.state.userId +'/doors').set(false)
      state.report.doors = false
      if(this.props.navigation.state.params){
        this.props.navigation.state.params = false,
        this.setState({fromHistory:false})
      }
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    sendMessage( message ) {

      if(message.length == 0){
        this.setState({message: false})
        message = false
      }

      firebase.database().ref().child('users/'+ this.state.userId +'/message').set(message)
      this.setModalVisible(!this.state.modalVisible)
    }

    render() {


        if(this.state.data){
          return(
            <View style={ styles.container }>
              <Modal 
                animationType="slide"
                transparent = {true}
                visible={this.state.modalVisible}
                // presentationStyle= "formSheet"
                onRequestClose = {() => this.setModalVisible(!this.state.modalVisible)}  
                onShow={() => { this.textInput.focus() }}
              >
                <View style={{margin: 22, paddingHorizontal: 22, paddingVertical: 15, width: 300,height: 150, backgroundColor: "#ffffff", borderBottomColor: "rgba(84,87,80,0.1)",
      borderBottomWidth: 1, elevation: 2, justifyContent: 'space-between'}}> 
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder= "Écrivez votre message..."
                    autoCapitalize = "none"
                    autoCorrect = {true}
                    keyboardType = 'default'
                    returnKeyType= "send"
                    returnKeyType= "send"
                    autofocus= {true}
                    multiline = {true}
                    onChangeText = {(value)=> this.setState({message: value})}
                    value = {this.state.message == false ? "" : this.state.message}
                    ref = {(input) => this.textInput = input}
                  />
                  <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                    <TouchableOpacity style={{paddingVertical: 5, paddingHorizontal: 15}} onPress= {() => this.setModalVisible(!this.state.modalVisible)}>
                      <Text style={{color: "#C6CCC2", fontSize: 13}}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#C42C51', paddingVertical: 5, paddingHorizontal: 15}} onPress={() => this.sendMessage(this.state.message)}>
                      <Text style={{color: "#ffffff"}}>ENVOYER</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Image style = {{borderRadius: 230,height: 230, width: 230, resizeMode : 'cover', marginVertical: 10,marginBottom: 20, marginHorizontal: 'auto'}} source={{uri: this.state.data.image}}/>
              <Text style={ styles.texte}>Il y a quelqu’un qui sonne à la porte!</Text>
              <View style = {{marginBottom: 15}}>
                <Button onPress={() => this.changeState('Vous avez ouvert à la personne.', this.state.data.timestamp)}>OUVRIR</Button>
              </View>
              <View style = {{marginBottom: 15}}>
                <Button onPress={() => this.setModalVisible(!this.state.modalVisible)}>AFFICHER UN MESSAGE</Button>
              </View>
              <Text style={{color: '#C6CCC2', marginTop: 10}} onPress={() => this.changeState('Vous avez ingoré la personne.', this.state.data.timestamp )}>Ignorer</Text>
            </View>
          )

        }
        else if(this.props.navigation.state.params){
          return(
            <View style={ styles.container }>
              <Modal 
                animationType="slide"
                transparent = {true}
                visible={this.state.modalVisible}
                // presentationStyle= "formSheet"
                onRequestClose = {() => this.setModalVisible(!this.state.modalVisible)}  
                onShow={() => { this.textInput.focus() }}
              >
                <View style={{margin: 22, paddingHorizontal: 22, paddingVertical: 15, width: 300,height: 150, backgroundColor: "#ffffff", borderBottomColor: "rgba(84,87,80,0.1)",
      borderBottomWidth: 1, elevation: 2, justifyContent: 'space-between'}}> 
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder= "Écrivez votre message..."
                    autoCapitalize = "none"
                    autoCorrect = {true}
                    keyboardType = 'default'
                    returnKeyType= "send"
                    returnKeyType= "send"
                    autofocus= {true}
                    multiline = {true}
                    onChangeText = {(value)=> this.setState({message: value})}
                    value = {this.state.message == false ? "" : this.state.message}
                    ref = {(input) => this.textInput = input}
                  />
                  <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                    <TouchableOpacity style={{paddingVertical: 5, paddingHorizontal: 15}} onPress= {() => this.setModalVisible(!this.state.modalVisible)}>
                      <Text style={{color: "#C6CCC2", fontSize: 13}}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#C42C51', paddingVertical: 5, paddingHorizontal: 15}} onPress={() => this.sendMessage(this.state.message)}>
                      <Text style={{color: "#ffffff"}}>ENVOYER</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Image style = {{borderRadius: 230,height: 230, width: 230, resizeMode : 'cover', marginVertical: 10,marginBottom: 20, marginHorizontal: 'auto'}} source={this.props.navigation.state.params.imagefromHistory}/>
              <Text style={ styles.texte}>Quelqu’un a sonné à la porte à {this.props.navigation.state.params.timeFromHistory}!</Text>
              <View style = {{marginBottom: 15}}>
                <Button onPress={() => this.changeState('Vous avez ouvert à la personne.', this.props.navigation.state.params.id)}>OUVRIR</Button>
              </View>
              <View style = {{marginBottom: 15}}>
                <Button onPress={() => this.setModalVisible(!this.state.modalVisible)}>AFFICHER UN MESSAGE</Button>
              </View>
              <Text style={{color: '#C6CCC2', marginTop: 10}} onPress={() => this.changeState('Vous avez ingoré la personne.', this.props.navigation.state.params.id )}>Ignorer</Text>
            </View>
          )
        }
        else{
          return(
            <View style={ styles.container }>
              <Modal 
                animationType="slide"
                transparent = {true}
                visible={this.state.modalVisible}
                // presentationStyle= "formSheet"
                onRequestClose = {() => this.setModalVisible(!this.state.modalVisible)}  
                onShow={() => { this.textInput.focus() }}
              >
                <View style={{margin: 22, paddingHorizontal: 22, paddingVertical: 15, width: 300,height: 150, backgroundColor: "#ffffff", borderBottomColor: "rgba(84,87,80,0.1)",
      borderBottomWidth: 1, elevation: 2, justifyContent: 'space-between'}}> 
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder= "Écrivez votre message..."
                    autoCapitalize = "none"
                    autoCorrect = {true}
                    keyboardType = 'default'
                    returnKeyType= "send"
                    returnKeyType= "send"
                    autofocus= {true}
                    multiline = {true}
                    onChangeText = {(value)=> this.setState({message: value})}
                    value = {this.state.message == false ? "" : this.state.message}
                    ref = {(input) => this.textInput = input}
                  />
                  <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                    <TouchableOpacity style={{paddingVertical: 5, paddingHorizontal: 15}} onPress= {() => this.setModalVisible(!this.state.modalVisible)}>
                      <Text style={{color: "#C6CCC2", fontSize: 13}}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#C42C51', paddingVertical: 5, paddingHorizontal: 15}} onPress={() => this.sendMessage(this.state.message)}>
                      <Text style={{color: "#ffffff"}}>ENVOYER</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Image style={ styles.img } source={require('../img/Porte.png')}/>
              <Text style={ styles.texte}>Personne n’est à votre porte pour l’instant</Text>
              <View style = {{marginBottom: 15}}>
                <Button>OUVRIR</Button>
              </View>
              <View style = {{marginBottom: 15}}>
                  <Button onPress={() => this.setModalVisible(!this.state.modalVisible)}>AFFICHER UN MESSAGE</Button>
              </View>
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