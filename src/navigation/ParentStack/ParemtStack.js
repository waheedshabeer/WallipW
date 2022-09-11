import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  ImageBackground,
  Alert,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import DrawerNavigater from '../drawerscreen.js';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../../assets/path.js';
import Share from 'react-native-share';
import Theme from '../../screens/Utils/Theme.js';
import RNFetchBlob from 'react-native-fetch-blob';
import DownloadDone from '../../components/Animationdownload.js';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import BottomSheet from '../../screens/HomeScreen/Bottomsheetscreen.js';
import ManageWallpaper, {TYPE} from 'react-native-manage-wallpaper';
import firestore from '@react-native-firebase/firestore';
const Stack = createStackNavigator();
function Imagedownload({route}) {
  const [ispress, setispress] = useState(false);
  const [isShare, setisShare] = useState(false);
  const [favourite, setfavourite] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(
    route?.params?.item?.arr[0],
  );
  const [Done, setDone] = useState(false);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [isOpen, setisOpen] = useState(false);
  const [closed, setclosed] = useState(false);
  const [loked, setLiked] = useState(false);
  const [activeDocid, setactiveDocid] = useState('');

  useEffect(() => {
    firestore()
      .collection('likePics')
      .where('image', '==', backgroundImg)
      .onSnapshot(snap => {
        if (snap?.empty) {
          setLiked(false);
        } else {
          setactiveDocid(snap?.docs[0]?._data?.docId);
          setLiked(true);
        }
      });
  }, [backgroundImg]);

 
  const customshare = async () => {
    const options = {
      url: backgroundImg,
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
        uri: backgroundImg,
      },
      responce,
      TYPE.HOME,
    );
  };
  const setlockWallpapper = () => {
    ManageWallpaper.setWallpaper(
      {
        uri: backgroundImg,
      },
      responce,
      TYPE.LOCK,
    );
  };
  const setbothWallpappers = () => {
    ManageWallpaper.setWallpaper(
      {
        uri: backgroundImg,
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
        Alert.alert(err?.code, err?.message);
      }
    }
  };

  const downloadImage = () => {
    let date = new Date();
    let image_URL = backgroundImg;
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

  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1, borderRadius: 2, justifyContent: 'center'}}>
        <FastImage
          source={{
            uri: item,
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
    );
  };

  const likePhoto = async () => {
    if (loked) {
      firestore()
        .collection('likePics')
        .doc(activeDocid)
        .delete()
        .then(() => setLiked(false));
    } else {
      const id = Math.random().toString(36);
      const picType = route?.params?.item.type;
      firestore().collection('likePics').doc(id).set({
        type: picType,
        image: backgroundImg,
        userId: auth()?.currentUser?.uid,
        docId: id,
      });
    }
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={{uri: backgroundImg}}
        style={{width: Theme.width, height: Theme.height}}
        blurRadius={6}>
        <Carousel
          width={width}
          height={height}
          windowSize={100}
          data={route?.params?.item?.arr}
          onSnapToItem={index => {
            setBackgroundImg(route?.params?.item?.arr[index]);
          }}
          renderItem={({item}) => renderItem({item})}
        />
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
            <Ionicons name="share-social-outline" size={32} color={'white'} />
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
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => likePhoto()}>
            {loked ? (
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

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Drawer">
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigater}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Imagedownload"
          component={Imagedownload}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
