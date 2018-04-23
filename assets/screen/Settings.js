import React from 'react'
import {StyleSheet, View, Text, Image, Switch, TouchableOpacity} from 'react-native'

import firebase from 'firebase';

export default class Settings extends React.Component{
    static navigationOptions = {
        title: 'Paramètres',
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
          return <Image source={require('../img/icon_settings.png')}  style={{width:22,height:22}}/>
        }
      }

    constructor(props){
        super(props)

        this.state = {
            notif : true,
            silence: false,
            derange: false,
        }
    }
    
    deco(){
        firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.text}>
                        <Text style={styles.title}>Notifications</Text>
                        <Text style={styles.texte}>Activer les notifications</Text>
                    </View>
                    <Switch value= {this.state.notif} />
                </View>
                <View style={styles.row}>
                    <View style={styles.text}>
                        <Text style={styles.title}>Mode silence</Text>
                        <Text style={styles.texte}>Éteindre le carillon mais laisser les notifs actives</Text>
                    </View>
                    <Switch value= {this.state.silence} />
                </View>
                <View style={styles.row}>
                    <View style={styles.text}>
                        <Text style={styles.title}>Mode ne pas déranger</Text>
                        <Text style={styles.texte}>Désactiver la sonnette durant un temps donné</Text>
                    </View>
                    <Switch value= {this.state.derange} />
                </View>
                <View style={styles.row}>
                    <TouchableOpacity  onPress={() => this.deco()}>
                        <Text style={styles.titleLogOut}>Se déconnecter</Text>
                    </TouchableOpacity>
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
      paddingHorizontal: 16
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: '#545750'
    },
    titleLogOut: {
      fontSize: 16,
      fontWeight: "bold",
      color: '#C42C51'
    },
    texte: {
      fontSize: 12,
      color: '#C6CCC2',
    },
    
  
   });