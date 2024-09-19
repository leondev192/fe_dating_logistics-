import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Avatar, Divider, Text} from 'react-native-paper';
import {getUserInfoById} from '../../apis/services/userService'; // API để lấy thông tin người dùng theo ID
import Colors from '../../constants/colors';

const UserDetailScreen = ({route}) => {
  const {userId} = route.params; // Nhận userId từ route params
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Hàm lấy thông tin người dùng theo ID
  const fetchUserInfo = async () => {
    try {
      const userData = await getUserInfoById(userId);
      setUserInfo(userData);
    } catch (error) {
      // console.error('Error fetching user info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {userInfo ? (
        <View style={styles.userDetails}>
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
              <Text style={styles.label}>Người đại diện: </Text>
              <Text style={styles.value}>
                {userInfo.representativeName || 'N/A'}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text>Không có thông tin người dùng.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    padding: 15,
  },
  userDetails: {
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: Colors.textbody,
    flex: 1, // Cho phép text chiếm hết không gian còn lại
    flexWrap: 'wrap', // Cho phép text xuống dòng
  },
  valueAddress: {
    fontSize: 16,
    color: Colors.textbody,
    flex: 1, // Cho phép text chiếm hết không gian còn lại
    flexWrap: 'wrap', // Cho phép text xuống dòng
  },
});

export default UserDetailScreen;
