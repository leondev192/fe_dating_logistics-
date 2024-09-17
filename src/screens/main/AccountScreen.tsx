// src/screens/AccountScreen.tsx
import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, Alert} from 'react-native';
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
import {Logout, User} from 'iconsax-react-native';
import {getUserInfo} from '../../apis/services/userService';
import LoadingSpinner from '../../components/loading/LoadingSpinner'; // Import LoadingSpinner
import {useAuth} from '../../contexts/AuthContext';
import {useAnimatedValue} from '../../hooks/useAnimatedValue';

type RootStackParamList = {
  Auth: undefined;
  UserProfile: undefined;
};

const AccountScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const animatedValue = useAnimatedValue(0);

  const {logout} = useAuth();
  useEffect(() => {
    checkLoginStatus();

    const unsubscribe = navigation.addListener('focus', () => {
      if (isLoggedIn) {
        fetchUserInfo();
      }
    });

    return unsubscribe;
  }, [navigation, isLoggedIn]);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
      await fetchUserInfo();
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  };

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return;

      const userData = await getUserInfo(token);
      setUserInfo(userData);
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsLoggedIn(false);
      setUserInfo(null);
      Alert.alert('Đăng xuất thành công', 'Bạn đã đăng xuất khỏi tài khoản.');
    } catch (error) {
      Alert.alert('Đăng xuất thất bại', 'Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  const handleEditPress = () => {
    navigation.navigate('UserProfile');
  };

  // Hiển thị LoadingSpinner khi đang tải dữ liệu
  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }

  return (
    <View style={styles.containerSafe}>
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
                  `${userInfo.profilePictureUrl}?${new Date().getTime()}` ||
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
                  {userInfo.companyName || 'Tên Doanh nghiệp'}
                </Text>
                <Text style={styles.email}>
                  {userInfo.email || 'email@example.com'}
                </Text>
                <OutlineButton
                  title="Thông tin doanh nghiệp"
                  onPress={handleEditPress}
                />
              </>
            ) : (
              <OutlineButton title="Đăng nhập" onPress={logout} />
            )}
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <OutlineButton title="Chính sách bảo mật" onPress={() => {}} />
          <OutlineButton title="Trợ giúp" onPress={() => {}} />
          <OutlineButton title="Đóng góp ý kiến" onPress={() => {}} />
          {isLoggedIn && <GradientButton title="Đăng xuất" onPress={logout} />}
        </View>

        <Text style={styles.versionText}>Phiên bản 1.0</Text>
      </ScrollView>
    </View>
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
