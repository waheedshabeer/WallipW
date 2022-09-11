import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Theme from '../Utils/Theme.js';
import {useNavigation} from '@react-navigation/native';
import Skeleton from '../../components/SkeltenPlaceholder.js';

const FlatListScreen = ({data}) => {
  const navigation = useNavigation();
  const [wallpaperfeature, setwallpapperFeature] = useState([]);
  useEffect(() => {
    firestore()
      .collection('appData')
      .where('types', '==', 'wallpapperfeature')
      .get()
      .then(querySnapshot => {
        setwallpapperFeature(querySnapshot?.docs[0]?._data?.images);
      });
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{height: '100%', justifyContent: 'center'}}
        onPress={() => navigation.navigate('Imagedownload', {item})}>
        <Image
          source={{uri: item.image}}
          style={{
            width: 155,
            height: '95%',
            borderWidth: 2,
            resizeMode: 'cover',
            borderRadius: 11,
            marginLeft: 5,
          }}
          blurRadius={3}
        />
        <Text
          style={{
            position: 'absolute',
            fontSize: 18,
            left: 10,
            color: 'white',
            fontWeight: '600',
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{width: '100%', height: Theme.height / 6, alignSelf: 'center'}}>
      {wallpaperfeature.length == 0 ? (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Skeleton height={100} width={100} />
          <Skeleton height={100} width={100} />
          <Skeleton height={100} width={100} />
        </View>
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={wallpaperfeature}
          renderItem={({item}) => renderItem({item})}
          keyExtractor={item => item.id}

        />
      )}
    </View>
  );
};

export default FlatListScreen;
