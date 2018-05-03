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

    constructor(props){
      super(props)

      this.state = {
        empty: true,
        data:'',
      }

      
    }

    componentWillMount(){
      const user = firebase.auth().currentUser;
      const getDoors = firebase.database().ref('users/' + user.uid + "/doors");
      this.setState({
        userId: user.uid
      })

      getDoors.on('value', snapshot => {
        console.info(snapshot.val())
        if(snapshot.val()){
          this.setState({
            empty: false,
            data: snapshot.val()
          })
          console.info(this.state.data)
        }
        else{
          this.setState({
            empty: true,
          })
        }
      });
    }

    render() {
        if(!this.state.empty){
          return(
            <View style={ styles.container }>
                <Image style = {{borderRadius: 230,height: 230, width: 230, resizeMode : 'cover', marginVertical: 10,marginBottom: 20, marginHorizontal: 'auto'}} source={{uri: this.state.data.image}}/>
                <Text style={ styles.texte}>Il y a quelqu’un qui sonne à la porte!</Text>
                <View style = {{marginBottom: 15}}>
                  <Button>OUVRIR</Button>
                </View>
                <View style = {{marginBottom: 15}}>
                  <Button>AFFICHER UN MESSAGE</Button>
                </View>
                <Text style={{color: '#C6CCC2', marginTop: 10}} onPress={() => console.info('tu l\'as ignoré wesh')}>Ignorer</Text>
            </View>
          )

        }
        else{
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