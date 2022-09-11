import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../components/HomeScreen';
import CategoriesScreen from '../components/CategoriesScreen';
import PrimumScreen from '../components/PrimumScreen';
import { Dimensions } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function ToptabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: '#252525',
      justifyContent:"center"},
        swipeEnabled: false,
        
      }
      }>
      <Tab.Screen
        name="HOME"
        component={HomeScreen}
        options={{
          tabBarShowLabel: true,
          tabBarLabelStyle: {color: 'white', fontWeight: 'bold', fontSize: 14},

         
        }}
      />
      <Tab.Screen
        name="CATEGORIES"
        component={CategoriesScreen}
        options={{
          tabBarShowLabel: true,
          tabBarLabelStyle: {color: 'white', fontWeight: 'bold', fontSize: 14},
        }}
      />
      {/* <Tab.Screen
        name="PREMIUM"
        component={PrimumScreen}
        options={{
          tabBarShowLabel: true,
          tabBarLabelStyle: {color: 'white', fontWeight: 'bold', fontSize: 14},
        }}
      /> */}
    </Tab.Navigator>
  );
}
