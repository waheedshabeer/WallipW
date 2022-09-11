import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import FlatListScreen from '../screens/Splash/FlatlistH';
import FlatListScreenV from '../screens/Splash/FlatlistV';
import Theme from '../screens/Utils/Theme';

const HomeScreen = ({navigation}) => {
  const [wallpaperData, setwallpapperData] = useState([]);
  const [wallpaperType, setwallpapperType] = useState([]);
  const [wallpaperfeature, setwallpapperFeature] = useState([]);

  return (
    <View style={styles.container}>
      <ScrollView style={{height: Theme.height}}>
        <Text style={styles.Text1}>Featured </Text>

        <FlatListScreen data={wallpaperfeature} />

        <Text style={styles.Text2}>Popular</Text>

        <FlatListScreenV data={wallpaperData} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: '#000000',
    justifyContent: 'space-evenly',
    height: Theme.height,
  },
  Text1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    left: 2,
    padding: 10,
    top: 5,
  },

  Text2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    left: 5,
    padding: 7,
  },
});
