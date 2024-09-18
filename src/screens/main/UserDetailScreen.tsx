import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Avatar, Card, Divider, Text} from 'react-native-paper';
import {getUserInfoById} from '../../apis/services/userService'; // API mới để lấy thông tin người dùng theo ID
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
      console.error('Error fetching user info:', error);
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
        <Card style={styles.card}>
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
          <Card.Content>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Địa chỉ:</Text>
              <Text style={styles.value}>{userInfo.address || 'N/A'}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Người đại diện:</Text>
              <Text style={styles.value}>
                {userInfo.representativeName || 'N/A'}
              </Text>
            </View>
          </Card.Content>
        </Card>
      ) : (
        <Text>Không có thông tin người dùng.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 5,
    backgroundColor: Colors.background,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.background,
    elevation: 3,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: Colors.text,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textbody,
  },
  imageSection: {
    marginTop: 15,
    alignItems: 'center',
  },
  squareImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  placeholder: {
    color: Colors.placeholder,
    fontStyle: 'italic',
  },
});

export default UserDetailScreen;
