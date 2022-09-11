import React from 'react';
import {Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import ToptabNavigator from './Toptabnavi';
import LikedStack from './LikedStack';

function CustomDrawerContent(props) {
  return (
    <LinearGradient
      colors={['#111f4b','#61045f','#6C33A3','#111f4b']}
      style={{
        flex: 1,
      }}>
      <DrawerContentScrollView {...props} style={{padding: 20, marginTop: 10}}>
        <Text
          style={{
            fontSize: 25,
            color: 'white',
            padding: 10,
            fontWeight: 'bold',
            bottom: 15,
            fontFamily: 'sans-serif-condensed',
          }}>
          Wallip
        </Text>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </LinearGradient>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigater() {
  return (

      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerLabelStyle: {
            marginLeft: -15,
            fontFamily: 'Roboto_medium',
            fontSize: 15,
            color: 'white',
          
          },
          drawerActiveBackgroundColor: '#32035c',
          drawerActiveTintColor: '#1c0035',
          drawerInactiveTintColor: '#333',
        }}>
        <Drawer.Screen
          name="Wallpapers"
          component={ToptabNavigator}
          options={{
            headerStyle: {
              backgroundColor: '#252525',
            },
            headerTintColor: '#fff',
            drawerIcon: ({color}) => (
              <Ionicons name="image-sharp" size={25} color={'white'} />
            ),
          }}
        
         
        />
        <Drawer.Screen
         
          name="Favourites"
          component={LikedStack}
          options={{
            headerShown:false,
            drawerIcon: ({color}) => (
              <Ionicons
                name="md-heart-outline"
                size={25}
                color={'white'}
              />
            ),
          }}
        />
        {/* <Drawer.Screen
          name="Profile"
          component={ProfilesScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="person-outline" size={25} color={'white'} />
            ),
          }}
        /> */}
        {/* <Drawer.Screen
          name="Message"
          component={MessageScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons
                name="chatbox-ellipses-outline"
                size={25}
                color={'white'}
              />
            ),
          }}
        /> */}
        {/* <Drawer.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name="settings-outline" size={25} color={'white'} />
            ),
          }}
        /> */}
      </Drawer.Navigator>
  );
}
