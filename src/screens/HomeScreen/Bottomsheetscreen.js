import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function BottomSheet({isOpen, onClose,savetoMedia,setWallpaper,setbothWallpappers,setlockWallpapper,closed}) {
  const refRBSheet = useRef();
  if (isOpen) {
    refRBSheet.current.open();
  }
  if(closed){
    refRBSheet.current.close();

  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <RBSheet
        ref={refRBSheet}
        onClose={() => onClose()}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            justifyContent: 'space-around',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            height:320
          },
        }}>
        <Text style={styles.text}> Success!</Text>
        <Text
          style={{
            ...styles.text,
            fontSize: 18,
            fontWeight: '700',
            color: 'black',
          }}>
          Thank you
        </Text>
        <Text
          style={{
            ...styles.text,
            fontSize: 18,
            fontWeight: '400',
            color: 'black',
          }}>
          {' '}
          What would you like to do?
        </Text>
        <TouchableOpacity 
        onPress={()=>setWallpaper()}
        style={styles.touchopacity}>
          <Text style={{textAlign: 'justify', fontSize: 16, width: '73%'}}>
            SET WALLPAPER
          </Text>
          <Ionicons
            name="image-sharp"
            size={25}
            color={'black'}
            style={{right: 13}}
          />
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>setlockWallpapper()}
        style={styles.touchopacity}>
          <Text style={{textAlign: 'justify', fontSize: 16, width: '73%'}}>
            SET AS LOCK SCREEN
          </Text>
          <Ionicons
            name="lock-closed-sharp"
            size={25}
            color={'black'}
            style={{right: 13}}
          />
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>setbothWallpappers()}
        style={styles.touchopacity}>
          <Text style={{textAlign: 'justify', fontSize: 16, width: '73%'}}>
            SET AS BOTH
          </Text>
          <Ionicons
            name="ios-settings"
            size={25}
            color={'black'}
            style={{right: 13}}
          />
        </TouchableOpacity>



        <TouchableOpacity 
        onPress={()=>savetoMedia()}
        style={styles.touchopacity}>
          <Text style={{textAlign: 'justify', fontSize: 16, width: '73%'}}>
            SAVE TO MEDIA FOLDER
          </Text>
          <Ionicons
            name="arrow-down"
            size={25}
            color={'black'}
            style={{right: 13}}
          />
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {textAlign: 'center', fontSize: 17},
  touchopacity: {
    height: 50,
    width: '90%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
