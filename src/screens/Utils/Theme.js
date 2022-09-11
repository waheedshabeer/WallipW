import {Dimensions} from 'react-native';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
const Theme = {
  primary: '#B9770E',
  linearPrimary: '#CB218E',
  linearSecondary: '#6617CB',
  smallTxt:10,
  mediumTxt:12,
  largeTxt:16,



  

  align: 'center',


  height: deviceHeight,
  width:deviceWidth
};
export default Theme;