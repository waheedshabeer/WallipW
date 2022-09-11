import React from 'react';
import {Text, View} from 'react-native';
import Lottie from 'lottie-react-native';
import Theme from '../screens/Utils/Theme';

const DownloadDone=()=> {
  return (
    <View
      style={{height:60,position:"absolute",top:Theme.height/2.5,left:0,bottom:Theme.height/2.5,right:0,}}>
         <Lottie  style={{}}
      source={require('../assets/img/done1.json')} autoPlay loop/>
      </View>
  );
}
 export default DownloadDone;