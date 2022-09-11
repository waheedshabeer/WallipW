import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator} from 'react-native-paper';
import Lottie from 'lottie-react-native';

import {View, Text, StyleSheet} from 'react-native';
const SplashScreen = () => {
  return (
    <LinearGradient
      colors={['#111f4b','#61045f','#6C33A3','#111f4b']}
      style={styles.linearGradient}>
      <View style={{width: 200, margin: 45, borderRadius: 10}}>
        <Text style={styles.buttonText}>Welcome to Wallip</Text>
      </View>
 <View style={{width:'100%',height:200}}> 
      <Lottie
      source={require('../../assets/img/indicator1.json')}autoPlay loop/>
    </View> 
   
 
    </LinearGradient>
  );
};

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 25,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 3,
    color: '#ffffff',
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
