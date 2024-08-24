import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
} from 'react-native';
import InputAuth from '../../../components/input/InputAuth';
import ButtonComponent from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';

type RootStackParamList = {
  Login: undefined;
};

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    if (!identifier) {
      setError('Vui lòng nhập email');
    } else if (!identifier.includes('@')) {
      setError('Nhập đúng định dạng email');
    } else {
      setError('');
      setLoading(true);
      // Handle your API call here
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/Background.png')}
      style={styles.imageBackground}
      resizeMode="cover">
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.instructionText}>
            Đừng lo lắng! Nó xảy ra. Vui lòng nhập địa chỉ email được liên kết
            với tài khoản của bạn
          </Text>
          <InputAuth
            label=""
            value={identifier}
            onChangeText={text => {
              setIdentifier(text);
              setError('');
            }}
            placeholder="Nhập Email của bạn "
            iconName="user"
            hasError={!!error}
            errorMessage={error}
          />

          <ButtonComponent
            title="Khôi Phục Mật Khẩu"
            onPress={handleForgotPassword}
          />
        </ScrollView>
        <LoadingSpinner loading={loading} />
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>Nhớ Mật Khẩu?</Text>
          <TouchableOpacity
            style={styles.termsButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.termsButtonText}>Đăng Nhập </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '15%',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    marginTop: Platform.OS === 'android' ? 110 : 60,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  instructionText: {
    fontSize: 16,
    color: Colors.textbody,
    textAlign: 'center',
    marginVertical: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 20,
  },
  termsText: {
    fontSize: 15,
    color: '#1E232C',
    textAlign: 'center',
  },
  termsButton: {
    marginLeft: 10,
  },
  termsButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ForgotPasswordScreen;
