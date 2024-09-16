import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import GradientButton from '../../components/button/auth/GradientButton';
import OutlineButton from '../../components/button/auth/OutlineButton';
import {useAnimatedValue} from '../../hooks/useAnimatedValue';
import Colors from '../../constants/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAuth} from '../../contexts/AuthContext';
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};
const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const animatedValue = useAnimatedValue(0);
  const {continueWithoutLogin} = useAuth();

  return (
    <ImageBackground
      source={require('../../assets/images/Splash.png')}
      style={styles.image}
      resizeMode="cover">
      <View style={styles.container}>
        <OutlineButton
          title="Đăng nhập"
          onPress={() => navigation.navigate('Login')}
        />

        <GradientButton
          title="Đăng ký"
          onPress={() => navigation.navigate('Register')}
        />
        <TouchableOpacity
          style={styles.termsButton}
          onPress={continueWithoutLogin}>
          <Text style={styles.termsButtonText}>
            Tiếp tục mà không cần tài khoản!
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  termsText: {
    color: '#1E232C',
    fontSize: 15,
    textAlign: 'center',
  },
  termsButton: {
    marginTop: 5,
  },
  termsButtonText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
