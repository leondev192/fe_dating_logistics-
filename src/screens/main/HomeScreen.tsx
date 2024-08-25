import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/store';
import {logout} from '../../redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, CommonActions} from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    try {
      // Xóa token và thông tin user khỏi AsyncStorage
      await AsyncStorage.removeItem('@token');
      await AsyncStorage.removeItem('@user');

      // Dispatch action để cập nhật trạng thái đăng nhập trong Redux
      dispatch(logout());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Auth'}], // Điều hướng đến stack Auth, nơi chứa LoginScreen
        }),
      );
    } catch (error) {
      console.error('Đăng xuất không thành công:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User ID: {user?.id}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
