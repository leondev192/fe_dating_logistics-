import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  NavigationProp,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {Avatar, Divider, Text} from 'react-native-paper';
import {getUserInfo} from '../../apis/services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/colors';
import GradientButton from '../../components/button/GradientButton';

type RootStackParamList = {
  UserEdit: {userInfo: any};
};

const UserProfile = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Hàm lấy thông tin người dùng
  const fetchUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        // console.error('Token không tồn tại');
        return;
      }

      const userData = await getUserInfo(token);
      setUserInfo(userData);
    } catch (error) {
      // console.error('Error fetching user info:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sử dụng useFocusEffect để gọi lại hàm khi trang được focus
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchUserInfo();
    }, []),
  );

  const handleEditPress = () => {
    navigation.navigate('UserEdit', {userInfo});
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {userInfo ? (
        <View style={styles.content}>
          <View style={styles.header}>
            {userInfo.profilePictureUrl ? (
              <Avatar.Image
                source={{uri: userInfo.profilePictureUrl}}
                size={80}
                style={styles.avatar}
              />
            ) : (
              <Avatar.Text
                label={userInfo.companyName?.charAt(0) || 'U'}
                size={80}
                style={styles.avatar}
              />
            )}
            <View style={styles.headerText}>
              <Text style={styles.title}>
                {userInfo.companyName || 'Tên công ty chưa có'}
              </Text>
              <Text style={styles.subtitle}>
                Mã kinh doanh: {userInfo.businessCode || 'N/A'}
              </Text>
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Địa chỉ: </Text>
              <Text style={styles.valueAddress}>
                {userInfo.address || 'N/A'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}> Người đại diện: </Text>
              <Text style={styles.value}>
                {userInfo.representativeName || 'N/A'}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.imageSection}>
              <Text style={styles.label}>Ảnh CCCD:</Text>
              {userInfo.representativeUrl ? (
                <Image
                  source={{uri: userInfo.representativeUrl}}
                  style={styles.squareImage}
                />
              ) : (
                <Text style={styles.placeholder}>Chưa có ảnh CCCD</Text>
              )}
            </View>
          </View>
          <View style={styles.actions}>
            <GradientButton
              onPress={handleEditPress}
              title="Chỉnh sửa thông tin"
            />
          </View>
        </View>
      ) : (
        <Text>Không có thông tin người dùng.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  valueAddress: {
    fontSize: 16,

    color: Colors.textbody,
    flex: 1, // Để đảm bảo phần text chiếm hết không gian còn lại
    flexWrap: 'wrap', // Cho phép text xuống dòng khi dài
  },
  container: {
    flexGrow: 1,
    padding: 5,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: Colors.quinary,
  },
  headerText: {
    marginLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text,
  },
  divider: {
    marginVertical: 10,
  },
  infoSection: {
    padding: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: Colors.textbody,
    flex: 1, // Để đảm bảo phần text chiếm hết không gian còn lại
    flexWrap: 'wrap', // Cho phép text xuống dòng khi dài
  },
  imageSection: {
    marginTop: 15,
    alignItems: 'center',
  },
  squareImage: {
    width: '100%',
    height: 200,
    borderRadius: 10, // Giữ hình vuông nhưng bo góc nhẹ
    marginBottom: 10,
    marginTop: 20,
  },
  placeholder: {
    color: Colors.placeholder,
    fontStyle: 'italic',
  },
  actions: {
    justifyContent: 'center',
    marginTop: 15,
  },
});

export default UserProfile;
