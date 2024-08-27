import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import Colors from '../../../constants/colors';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import GradientButton from '../../../components/button/GradientButton';

type RootStackParamList = {
  Login: undefined;
};

const ResetPasswordSuccessScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/ResetPasswordSuccess.png')}
      style={styles.imageBackground}
      resizeMode="cover">
      <View style={styles.container}>
        <GradientButton title="Đăng nhập" onPress={handleLoginPress} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: Colors.textbody,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: Colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResetPasswordSuccessScreen;
