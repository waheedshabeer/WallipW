import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
import Wallpapers from '../Utils/Wallpapers.js';
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Skeleton from '../../components/SkeltenPlaceholder.js';
import Theme from '../Utils/Theme.js';
const FlatListScreenV = ({ data}) => {
  const navigation = useNavigation();
const [wallpaperData,setwallpapperData]=useState([])
const [wallpaperType,setwallpapperType]=useState([])



useEffect(() => {
  firestore()
    .collection('appData')
    .where('types', '==', 'wallpappers')
    .get()
    .then(querySnapshot => {
      setwallpapperData(querySnapshot?.docs[0]?._data?.images);
    });
}, []);


  const renderItem = ({item}) => {
  console.log("ittt",item.type)
    return (
      <TouchableOpacity
        style={{
          width: deviceWidth / 3.2-2,
          height: deviceHeight / 2.5,
          borderRadius: 10,
          overflow: 'hidden',
          margin:2
          
        }}
        onPress={() => navigation.navigate('Imagedownload', {item})}>
        <FastImage
          source={{uri: item.image,
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.high}}
          style={{width: '100%', height: '100%', resizeMode: 'cover'}}
       />
      </TouchableOpacity>
    );
  };

  return (
<>
    {wallpaperData.length==0?
     
        <View style={{width:Theme.width,height:600,}}>
 <View style={{width:"100%",height:300,flexDirection:"row",justifyContent:"space-evenly",alignItems:"center" }}>
        <Skeleton height={295} width={Theme.width/3.2}/>
       <Skeleton height={295} width={Theme.width/3.2}/>
       <Skeleton height={295} width={Theme.width/3.2}/>
</View>
<View style={{width:"100%",height:300,flexDirection:"row",justifyContent:"space-evenly",alignItems:"center" }}>
        <Skeleton height={295} width={Theme.width/3.2}/>
       <Skeleton height={295} width={Theme.width/3.2}/>
       <Skeleton height={295} width={Theme.width/3.2}/>
</View>
    
      </View>:
    <FlatList
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      data={wallpaperData}
      renderItem={({item}) => renderItem({item})}
      keyExtractor={item => item.id}
      pagingEnabled
      numColumns={3}
      columnWrapperStyle={{
        justifyContent: "center",
        
      }}
    />}
    </>
  );
};

export default FlatListScreenV;


