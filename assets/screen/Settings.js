import React from 'react'
import {StyleSheet, View, Text, Image, Switch, TouchableOpacity} from 'react-native'
import DatePicker from 'react-native-datepicker'

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
        const user = firebase.auth().currentUser;
        this.state = {
            notif : state.report.settings.notif,
            silence: state.report.settings.silence,
            derange: state.report.settings.derange,
            derangeStart: state.report.settings.derangeStart,
            derangeEnd: state.report.settings.derangeEnd,
            userId: user.uid,
        }

    }

    changeSwitch(key,state){
        this.setState({[key]:!state})
        firebase.database().ref().child('users/'+ this.state.userId +'/settings/'+ key).set(!state)

        if(key == 'derange'){
            this.customTouchableComponent 
        }
        
    }
    changeDate(key,date){
        this.setState({[key]:date})
        if(key == 'derangeStart'){
            this.datePickerRef.onPressDate()
        }
        firebase.database().ref().child('users/'+ this.state.userId +'/settings/'+ key).set(date)
    }

    

    
    
    deco(){
        firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

    render(){
        let customTouchableComponent = ({ onPress }) => {
            if(this.state.derange){
                return (
                    <TouchableOpacity  onPress={onPress} style={{width:'100%'}}>
                        <Text style={styles.title}>Ne pas déranger</Text> 
                        <Text style={styles.texte}>{this.state.derangeStart} - {this.state.derangeEnd}</Text>
                    </TouchableOpacity>
                    )
            }
            else{
                return (
                    <TouchableOpacity style={{width:'100%', opacity: .5}}>
                        <Text style={styles.title}>Ne pas déranger</Text> 
                        <Text style={styles.texte}>{this.state.derangeStart} - {this.state.derangeEnd}</Text>
                    </TouchableOpacity>
                    )
            }
    
        }
        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.text}>
                        <Text style={styles.title}>Notifications</Text>
                        <Text style={styles.texte}>Activer les notifications</Text>
                    </View>
                    <Switch 
                    onValueChange = {() => this.changeSwitch("notif", this.state.notif)}
                    value= {this.state.notif} />
                </View>
                <View style={styles.row}>
                    <View style={styles.text}>
                        <Text style={styles.title}>Mode silence</Text>
                        <Text style={styles.texte}>Éteindre le carillon mais laisser les notifs actives</Text>
                    </View>
                    <Switch 
                    onValueChange = {() => this.changeSwitch("silence", this.state.silence)}
                    value= {this.state.silence} />
                </View>
                <View style={styles.row}>
                    <View style={styles.text}>
                        <Text style={styles.title}>Mode ne pas déranger</Text>
                        <Text style={styles.texte}>Désactiver la sonnette durant un temps donné</Text>
                    </View>
                    <Switch 
                    onValueChange = {() => this.changeSwitch("derange", this.state.derange)}
                    value= {this.state.derange} />
                </View>
                <View style={styles.row}>
                    <DatePicker
                        style={{width: 200}}
                        // date="2016-05-15"
                        mode="time"
                        confirmBtnText="Suivant"
                        cancelBtnText="Cancel"
                        androidMode = "spinner"
                        onDateChange={(date) => {this.changeDate('derangeStart', date)}}
                        TouchableComponent={customTouchableComponent}
                        
                    />
                    <DatePicker
                        style={{width: 200}}
                        // date="2016-05-15"
                        mode="time"
                        confirmBtnText="Suivant"
                        cancelBtnText="Cancel"
                        androidMode = "spinner"
                        onDateChange={(date) => {this.changeDate('derangeEnd', date)}}
                        
                        ref={(ref)=>this.datePickerRef=ref}
                        customStyles={{
                            dateIcon: {
                                display: 'none'
                            },
                            dateInput: {
                                display: 'none'
                            }
                            // ... You can check the source to find the other keys.
                        }}
                    />
                    
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
    touchPicker: {
        width: "100%"
    },
    touchPickerOpacity:{
        width: "100%",
        opacity: .7
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