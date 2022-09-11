import React from 'react';
import NotificationsScreen from '../components/NotificationsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Liked from '../screens/LikedPicks';
const LikedStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
    screenOptions={{headerShown:false}}>
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <Stack.Screen name="Liked" component={Liked} />
    </Stack.Navigator>
  );
};
export default LikedStack;
