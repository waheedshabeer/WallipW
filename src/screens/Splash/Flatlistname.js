import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Theme from '../Utils/Theme.js';
import wallpapersname from '../Utils/Wallpapersname';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';


const FlatListname = ({data}) => {
  const navigation = useNavigation();
  const [wallpaperName, setwallpapperName] = useState([]);
  useEffect(() => {
    firestore()
      .collection('appData')
      .where('types', '==', 'wallpapperName')
      .get()
      .then(querySnapshot => {
        setwallpapperName(querySnapshot?.docs[0]?._data?.images);
      });
  }, []);


const renderItem = ({item}) => {
  return (
    <TouchableOpacity style={{height:"100%",justifyContent:"center"}}
    onPress={() => navigation.navigate('Imagedownload', {item})}>
    
      <Image
        source={{uri: item.image}}
        style={{
          width: 110,
          height: "95%",
          borderWidth: 2,
          // borderColor:'black',
          resizeMode: 'cover',
          borderRadius: 10,
        marginLeft:5
          }}
      />
      <Text style={{position: 'absolute', fontSize: 18,left:10,color:'white',fontWeight:'600'}}>{item.name}</Text>

    </TouchableOpacity>
  );
};

  
  return (
    <View style={{width: '100%', height:Theme.height/7,alignSelf:"center",}}>
      {wallpaperName.length==0?<Text style={{textAlign:"center",fontSize:20,color:"white"}}>Loading...</Text>:
      <FlatList
        style={{}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={wallpaperName}
        renderItem={({item}) => renderItem({item})}
        keyExtractor={item => item.id}
        //pagingEnabled
        
      />}
    </View>
  );
};

export default FlatListname;

