import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/colors';
import GradientButton from '../../components/button/GradientButton';
import OutlineButton from '../../components/button/OutlineButton';
import {useNavigation, CommonActions} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../components/toast/ToastAuth';

const ProfileScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setIsLoggedIn(!!token);
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

  return (
    <SafeAreaView style={styles.containerSafe}>
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={Colors.gradientColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.header}>
          <Image
            source={{uri: 'https://via.placeholder.com/150'}}
            style={styles.avatar}
          />
          <View style={styles.headerTextContainer}>
            {isLoggedIn ? (
              <>
                <Text style={styles.name}>Nguyễn Văn A</Text>
                <Text style={styles.email}>email@example.com</Text>
                <OutlineButton title="Chỉnh sửa thông tin" onPress={() => {}} />
              </>
            ) : (
              <OutlineButton title="Đăng nhập" onPress={handleLogin} />
            )}
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <OutlineButton title="Chính sách bảo mật" onPress={handleLogin} />
          <OutlineButton title="Trợ giúp" onPress={handleLogin} />
          <OutlineButton title="Đóng góp ý kiến" onPress={handleLogin} />
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
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

export default ProfileScreen;
