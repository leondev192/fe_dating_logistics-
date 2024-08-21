import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import InputAuth from '../../../components/input/InputAuth';
import ButtonComponent from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import LoadingSpinner from '../../../components/LoadingSpinner';
type RootStackParamList = {
  Login: undefined;
};

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!identifier) {
      setError('Vui lòng nhập email');
      return;
    }
    if (!identifier.includes('@')) {
      setError('Nhập đúng định dạng email');
      return;
    }
    setLoading(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.instructionText}>
          Đừng lo lắng! Nó xảy ra. Vui lòng nhập địa chỉ email được liên kết với
          tài khoản của bạn
        </Text>
        <InputAuth
          label=""
          value={identifier}
          onChangeText={text => {
            setIdentifier(text);
            setError(''); // Clear error when user starts typing
          }}
          placeholder="Nhập Email của bạn "
          iconName="user"
          hasError={!!error} // Pass whether there's an error
          errorMessage={error} // Pass the error message
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  contentContainer: {
    marginTop: Platform.OS === 'android' ? 110 : 60,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  instructionText: {
    fontSize: 16,
    color: '#8391A1',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
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
