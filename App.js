import React, {useState, useEffect} from 'react';
import SplashScreen from './src/screens/Splash/splashscreen';
import auth from '@react-native-firebase/auth';
import MyStack from './src/navigation/ParentStack/ParemtStack.js';
const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
   
    if (user) {
      setUser(user);
      if (initializing) setInitializing(false);
    } else {
      auth()
        .signInAnonymously()
        .catch(error => {
          alert(error)
        });
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return <SplashScreen />
  return <MyStack
   />;
};

export default App;
