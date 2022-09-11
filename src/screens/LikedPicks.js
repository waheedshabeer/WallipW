import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  ImageBackground,
  Alert,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'react-native-fetch-blob';
import FastImage from 'react-native-fast-image';
import ManageWallpaper, {TYPE} from 'react-native-manage-wallpaper';
import firestore from '@react-native-firebase/firestore';
import BottomSheet from './HomeScreen/Bottomsheetscreen';
import DownloadDone from '../components/Animationdownload';
import Theme from './Utils/Theme';
import Images from '../assets/path';
import Share from 'react-native-share';

const Liked = ({route}) => {
  const [Done, setDone] = useState(false);;
  const [isOpen, setisOpen] = useState(false);
  const [closed, setclosed] = useState(false);
  const [ispress, setispress] = useState(false);
  const [isShare, setisShare] = useState(false);
  
const {image,type,userId,docId}=route?.params?.item?._data;
  const customshare = async () => {
 
    const options = {
      url: image,
    };

    const shareResponse = await Share.open(options);
    if (shareResponse.success) {
      Alert.alert('Done', 'Successfully Shared');
      setisShare(true);
    }
  };
  const responce = ({status, msg, url}) => {
    if (status == 'success') {
      setisOpen(false);
      setclosed(true);
      setDone(true);
    }
  };
  if (Done) {
    setTimeout(() => {
      setDone(false);
    }, 2000);
  }
  const setWallpappers = () => {
    ManageWallpaper.setWallpaper(
      {
        uri:image,
      },
      responce,
      TYPE.HOME,
    );
  };
  const setlockWallpapper = () => {
    ManageWallpaper.setWallpaper(
      {
        uri:image,
      },
      responce,
      TYPE.LOCK,
    );
  };
  const setbothWallpappers = () => {
    ManageWallpaper.setWallpaper(
      {
        uri:image,
      },
      responce,
      TYPE.BOTH,
    );
  };


  const checkPermission = async () => {
    setispress(true);
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadImage();
        } else {
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        Alert.alert(err?.code,err?.message)
      }
    }
  };

  const downloadImage = () => {
    let date = new Date();
    let image_URL = image;
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];

    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };

    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));
      });
  };

  const getExtention = Profile => {
    return /[.]/.exec(Profile) ? /[^.]+$/.exec(Profile) : undefined;
  };


const unLiked =()=>{
firestore().collection("likePics").doc(docId).delete()
}

  return( <View style={{flex: 1}}>
    <ImageBackground
      source={{uri:image}}
      style={{width: Theme.width, height: Theme.height}}
      blurRadius={6}>
      <View style={{flex: 1, borderRadius: 2, justifyContent: 'center'}}>
        <FastImage
          source={{
            uri:image,
            headers: {Authorization: 'wallpapers'},
            priority: FastImage.priority.high,
          }}
          style={{
            width: '80%',
            height: Theme.height - 280,
            marginLeft: 35,
            borderRadius: 24,
            bottom: 25,
          }}
        />
      </View>
      {Done ? <DownloadDone /> : null}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '70%',
          alignItems: 'center',
          bottom: 100,
          left: 60,
        }}>
        <TouchableOpacity onPress={customshare} style={{bottom: 5}}>
          <Ionicons
            name="share-social-outline"
            size={32}
            color={'white'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setisOpen(true);
            setclosed(false);
          }}>
          <Image
            source={Images?.download}
            style={{
              width: 90,
              height: 72,
              resizeMode: 'center',
              tintColor:  'white',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{
          unLiked()
        }}
        >
          {image ? (
            <Ionicons name="heart" size={32} color="red" />
          ) : (
            <Ionicons name="md-heart-outline" size={32} color={'white'} />
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
    <BottomSheet
      isOpen={isOpen}
      closed={closed}
      onClose={() => setisOpen(false)}
      savetoMedia={() => checkPermission()}
      setWallpaper={() => setWallpappers()}
      setbothWallpappers={() => setbothWallpappers()}
      setlockWallpapper={() => setlockWallpapper()}
    />
  </View>
);
}

export default Liked;
