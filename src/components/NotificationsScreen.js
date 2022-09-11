import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Theme from '../screens/Utils/Theme';
import {useNavigation} from '@react-navigation/native';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
function NotificationsScreen() {
  const navigation = useNavigation();
  const [towalpapers, settowalpapers] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    firestore()
      .collection('likePics')
      .where('userId', '==', auth()?.currentUser?.uid)
      .get()
      .then(querySnapshot => {
        settowalpapers(querySnapshot?.docs);
        setloading(false);
      });
  });

  if (loading)
    return (
      <ActivityIndicator
        size={29}
        color={Theme.linearPrimary}
        style={{flex: 1, alignSelf: 'center'}}
      />
    );

  return (
    <>
      {towalpapers?.length == 0 ? (
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            color: Theme.linearSecondary,
            top: Theme.height / 2.5,
            fontSize: 18,
          }}>
          No Favourite Images
        </Text>
      ) : (
        <FlatList
          style={{backgroundColor: 'black'}}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          data={towalpapers}
          numColumns={3}
          columnWrapperStyle={{}}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  width: deviceWidth / 3.1,
                  height: deviceHeight / 4,
                  borderRadius: 10,
                  overflow: 'hidden',
                  margin: 2,
                }}
                onPress={() => {
                  navigation.navigate('Liked', {item});
                }}>
                <Image
                  source={{uri: item?._data?.image}}
                  style={{
                    width: '100%',
                    height: 200,
                    resizeMode: 'cover',
                    margin: 4,
                    alignSelf: 'center',
                    borderRadius: 5,
                  }}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
          pagingEnabled
        />
      )}
    </>
  );
}
export default NotificationsScreen;
