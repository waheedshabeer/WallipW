import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import FlatListname from '../screens/Splash/Flatlistname';
import FlatListcategories from '../screens/Splash/Flatlistcategories';
import Theme from '../screens/Utils/Theme';


export default function CategoriesScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
      }}>
      <ScrollView style={{height: Theme.height}}>
        <Text style={styles.txt1}>Popular Searches</Text>
        <View style={{top: 20, padding: 4}}>
          <FlatListname />
        </View>

        <Text style={styles.txt2}>Categories</Text>

        <View style={{top: 40}}>
          <FlatListcategories  />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  txt1: {
    fontSize: 20,
    fontWeight: 'bold',
    top: 15,
    left: 10,
    color: 'white',
  },

  txt2: {
    fontSize: 21,
    fontWeight: 'bold',
    left: 12,
    color: 'white',
    top: 30,
  },
});
