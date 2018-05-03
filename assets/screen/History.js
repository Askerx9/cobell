import React from 'react'
import {ActivityIndicator,TouchableOpacity,ImageBackground, View, StyleSheet, Image, Text, ScrollView} from 'react-native'
import _ from 'lodash'

import { TabNavigator } from 'react-navigation';
import firebase from 'firebase';
import wifi from 'react-native-android-wifi';

import Doors from '../screen/Doors'
import Settings from '../screen/Settings'


console.ignoredYellowBox = [
  'Setting a timer',
  'Remote debugger'
]

class History extends React.Component{
  static navigationOptions = {
    title: 'Historique',
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
      return <Image source={require('../img/icon_historique.png')}  style={{width:26,height:26}}/>
    }
  }

  constructor(props){
    super(props)

    this.state = {
      loading: true,
      empty: true,
      cobellDetect: false,
      data:'',
      ssid: [], 
    }

    
  }

  componentWillMount(){
    
    const user = firebase.auth().currentUser;
    const getHistory = firebase.database().ref('users/' + user.uid + "/history");
    this.setState({
      userId: user.uid
    })
    
    getHistory.on('value', snapshot => {
      if(snapshot.val() != null){
        this.setState({
          empty: false,
          loading: false,
          data: snapshot.val()
        })
      }
      else{
        this.setState({
          loading: false,
        })
      }
    });
    
    wifi.loadWifiList((wifiStringList) => {
      var wifiArray = JSON.parse(wifiStringList);
      
      wifiArray.forEach((el) =>{
        this.setState({ssid:[...this.state.ssid, el.SSID]})
      })
      
      if(this.state.ssid.indexOf('Cobell') != '-1'){
        console.log(this.state.ssid);
        
        this.setState({
          cobellDetect: true,
          loading: false,
          empty: false,
        })
        
      }
    },
    (error) => {
      console.log(error);
    }
  );
  }

  toConfig(){

    firebase.database().ref().child('users/' + this.state.userId  + '/connected').set(false)
    .then(() => {
      wifi.findAndConnect('Cobell', 'MyCobell', (found) => {
        if (found) {
          console.log("wifi is in range");
          this.props.navigation.navigate('Config')
        } else {
          console.log("wifi is not in range");
        }
      });
    })

  }

  deleteEntry(key){
    firebase.database().ref().child('users/' + this.state.userId + '/history/' + key).remove()
    if(_.size(this.state.data) == 1){
      this.setState({
        empty: true
      })
    }
  }

  dict_reverse(obj) {
    new_obj= {}
    rev_obj = Object.keys(obj).reverse();
    rev_obj.forEach(function(i) { 
      new_obj[i] = obj[i];
    })
    return new_obj;
  }


  render(){

    //si la data base est vide et qu'aucune sonnette est à cofig.
    if(this.state.loading){
      return(
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" color="#C42C51" />
        </View>
      )
    }else{
      if(this.state.empty && !this.state.cobellDetect && !this.state.loading){
        return(
          <View style={styles.container}>
            <Image style={ styles.img } source={ require('../img/ringabell.png') } />
            <Text style={styles.texte}>Personne n’a sonné à votre porte récemment.</Text>
          </View>
        )
      }
      else if(!this.state.empty && this.state.cobellDetect && !this.props.loading){

        const date = new Date()

        let minutes = date.getMinutes()
        let day = date.getDate()
        let month = date.getMonth()+1
        if(date.getMinutes() < 10){
          minutes = "0" + date.getMinutes()
        }

        if(day < 10){
          day = "0" + date.getDate()
        }
        
        if(month < 10){
          month = "0" + (date.getMonth()+1)
        }

        let fullDate = day+"-"+month+"-"+date.getFullYear()
        let time = date.getHours()+"h"+minutes

        return(
          <View style={styles.container}>
          <View style={{position:'relative'}}>
            <ImageBackground style={styles.infoContainer} source={require('../img/bg.png')}>
              <Image source={require('../img/logo.png')} style = {{height: 60, width: 55, resizeMode : 'cover'}}/>
              <View style = {{height: 45, width: 1, backgroundColor:"#C6CCC2"}}></View>
              <View style= {{justifyContent: 'flex-start'}}>
                <View style={styles.row}>
                  <Text style={styles.date}>{fullDate}</Text>
                  <Text style={styles.date}>{time}</Text>
                </View>
                <Text style={{color: '#C6CCC2', fontSize: 12}}>Configurez votre sonnette</Text>
              </View>
            </ImageBackground>
            <TouchableOpacity style={{position:'absolute', right: 48, bottom: 6, width: 29, height: 29}} onPress={() => this.toConfig()}>
              <Image style={{width: '100%', height: '100%', resizeMode : 'cover'}} source={require('../img/config.png')} />
            </TouchableOpacity>
          </View>
          </View>
        )
      } else {
        const rev = this.dict_reverse(this.state.data)
        
        const data = Object.keys(rev).map(key => {
          const infos = rev[key]
          const img = {uri: infos.image}
          const date = new Date(Number(infos.timestamp))

          let minutes = date.getMinutes()
          let day = date.getDate()
          let month = date.getMonth()+1
          if(date.getMinutes() < 10){
            minutes = "0" + date.getMinutes()
          }

          if(day < 10){
            day = "0" + date.getDate()
          }
          
          if(month < 10){
            month = "0" + (date.getMonth()+1)
          }


          let fullDate = day+"-"+month+"-"+date.getFullYear();
          let time = date.getHours()+"h"+minutes;

          return(
            <View key={key} style={{position:'relative'}}>
              <ImageBackground style={styles.infoContainer} source={require('../img/bg.png')}>
                <Image source={img} style = {{borderRadius: 60, height: 60, width: 60, resizeMode : 'cover'}}/>
                <View style = {{height: 45, width: 1, backgroundColor:"#C6CCC2"}}></View>
                <View style= {{justifyContent: 'flex-start'}}>
                  <View style={styles.row}>
                    <Text style={styles.date}>{fullDate}</Text>
                    <Text style={styles.date}>{time}</Text>
                  </View>
                  <Text style={{color: '#C6CCC2', fontSize: 12}}>Vous avez ouvert à quelqu'un</Text>
                </View>
              </ImageBackground>
              <TouchableOpacity style={{position:'absolute', right: 48, bottom: 6, width: 29, height: 29}} onPress={() => this.deleteEntry(key)}>
                <Image style={{width: '100%', height: '100%', resizeMode : 'cover'}} source={require('../img/button.png')} />
              </TouchableOpacity>
            </View>
          )
        })

        return(
          <ScrollView style={{backgroundColor: '#FCFDFE',}}>
            {data}
          </ScrollView>
        )
      }
    }

  }
}

export default TabNavigator({
  History: { screen: History },
  Doors: {screen: Doors},
  Settings: { screen: Settings },
},{
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: '#C42C51',
    labelStyle: {
      color: '#C6CCC2',
      fontSize: 12,
      marginTop: 2,
    },
    pressColor: '#C42C51',
    indicatorStyle: {
      backgroundColor: '#C42C51',
      height: 1,
    },
    style: {
      backgroundColor: '#ffffff', 
      height: 58,
    }
  }
})

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
    marginVertical: 50,

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

  infoContainer: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
    marginHorizontal: 16,
    marginVertical: 16,
    height: 95,
    width: 328,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200
  },
  date: {
    fontSize: 20,
    fontWeight:'bold',
    color: '#545750',
    marginBottom: 5,
  },

 });
