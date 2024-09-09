// src/screens/AccountScreen.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/colors';
import GradientButton from '../../components/button/GradientButton';
import OutlineButton from '../../components/button/OutlineButton';
import {
  useNavigation,
  CommonActions,
  NavigationProp,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../components/toast/ToastAuth';
import {User} from 'iconsax-react-native';
import {getUserInfo} from '../../apis/services/userService'; // Import hàm getUserInfo

type RootStackParamList = {
  Auth: undefined;
  AddProfileCompanyScreen: undefined;
};

const AccountScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null); // State để lưu thông tin người dùng
  const [loading, setLoading] = useState<boolean>(true); // State để hiển thị loading khi đang lấy thông tin
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
      await fetchUserInfo(token); // Gọi hàm lấy thông tin người dùng
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  };

  // Hàm lấy thông tin người dùng từ API
  const fetchUserInfo = async (token: string) => {
    try {
      setLoading(true);
      const userData = await getUserInfo(token);
      setUserInfo(userData);
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      }),
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsLoggedIn(false);
      setUserInfo(null);
      Toast.show({
        type: 'success',
        text1: 'Đăng xuất thành công',
        text2: 'Bạn đã đăng xuất khỏi tài khoản.',
        position: 'top',
        topOffset: 300,
        props: {
          onPressOk: () => {
            Toast.hide();
          },
        },
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Đăng xuất thất bại',
        text2: 'Có lỗi xảy ra, vui lòng thử lại.',
        position: 'top',
        topOffset: 300,
        props: {
          onPressOk: () => {
            Toast.hide();
          },
        },
      });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  return (
    <SafeAreaView style={styles.containerSafe}>
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={Colors.gradientColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.header}>
          {isLoggedIn && userInfo ? (
            <Image
              source={{
                uri:
                  userInfo.profilePictureUrl ||
                  'https://via.placeholder.com/150',
              }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatar}>
              <User size={100} color="#fff" />
            </View>
          )}
          <View style={styles.headerTextContainer}>
            {isLoggedIn && userInfo ? (
              <>
                <Text style={styles.name}>
                  {userInfo.companyName || 'Nguyễn Văn A'}
                </Text>
                <Text style={styles.email}>
                  {userInfo.email || 'email@example.com'}
                </Text>
                <OutlineButton
                  title="Chỉnh sửa thông tin"
                  onPress={() => navigation.navigate('AddProfileCompanyScreen')}
                />
              </>
            ) : (
              <OutlineButton title="Đăng nhập" onPress={handleLogin} />
            )}
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <OutlineButton title="Chính sách bảo mật" onPress={() => {}} />
          <OutlineButton title="Trợ giúp" onPress={() => {}} />
          <OutlineButton title="Đóng góp ý kiến" onPress={() => {}} />
          {isLoggedIn && (
            <GradientButton title="Đăng xuất" onPress={handleLogout} />
          )}
        </View>

        <Text style={styles.versionText}>Phiên bản 1.0</Text>
      </ScrollView>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#ddd',
    marginTop: 5,
    marginBottom: 10,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  versionText: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.textbody,
    fontSize: 14,
  },
});

export default AccountScreen;
