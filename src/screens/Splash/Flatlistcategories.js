import React, {useEffect, useState} from 'react';

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
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const FlatListcategories = ({data}) => {
  const navigation = useNavigation();
  const [wallpaperCate, setwallpapperCategores] = useState([]);


  useEffect(() => {
    firestore()
      .collection('appData')
      .where('types', '==', 'categories')
      .get()
      .then(querySnapshot => {
        setwallpapperCategores(querySnapshot?.docs[0]?._data?.images);
      });
  }, []);


  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          width: deviceWidth / 2.1,
          height: deviceHeight / 8.2,
          borderRadius: 13,
          overflow: 'hidden',
          margin: 3,
        }}
        onPress={() => navigation.navigate('Imagedownload', {item})}>
        <Image
          source={{uri: item.image}}
          style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          blurRadius={3}
        />
        <Text
          style={{
            position: 'absolute',
            fontSize: 18,
            left: 10,
            color: 'white',
            fontWeight: '600',
            top: 30,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{}}>

{wallpaperCate.length==0?<Text style={{textAlign:"center",fontSize:20,color:"white",}}>Loading...</Text>:
      <FlatList
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        data={wallpaperCate}
        renderItem={({item}) => renderItem({item})}
        keyExtractor={item => item.id}
        //pagingEnabled
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'center',
        }}
      />}
    </View>
  );
};

export default FlatListcategories;
