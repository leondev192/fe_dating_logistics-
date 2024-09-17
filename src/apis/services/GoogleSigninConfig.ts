// GoogleSigninConfig.ts
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '193742166494-vhvkbi0atp26iu8m0tlnph4js6nu32lu.apps.googleusercontent.com', // Đặt Web Client ID từ Google Cloud Console
  iosClientId:
    '193742166494-8rmrlkofcs88ejiirsemjl8s7hrn3k7h.apps.googleusercontent.com', // Đặt iOS Client ID từ Google Cloud Console
});
