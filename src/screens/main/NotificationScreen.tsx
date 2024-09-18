import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

// Danh sách thông báo demo ghép đôi
const notifications = Array.from({length: 20}, (_, index) => ({
  id: `${index + 1}`,
  title: `Ghép đôi thành công`,
  description: `Người dùng ${
    index + 1
  } đã ghép đôi với bạn. Hãy bắt đầu trò chuyện ngay!`,
  isRead: index % 2 === 0, // Đánh dấu thông báo đã đọc cho các thông báo có chỉ số chẵn
  imageUrl: require('../../assets/images/log.png'), // Sử dụng ảnh từ assets
}));

const NotificationScreen = () => {
  const [data, setData] = useState(notifications);

  // Hàm xử lý khi nhấn vào thông báo
  const handlePressNotification = id => {
    // Cập nhật trạng thái đã đọc của thông báo
    setData(prevData =>
      prevData.map(notification =>
        notification.id === id ? {...notification, isRead: true} : notification,
      ),
    );
  };

  // Hàm render từng mục thông báo
  const renderNotificationItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.notificationItem,
          {backgroundColor: item.isRead ? '#FFFFFF' : '#E8F0FE'}, // Màu nền cho thông báo chưa đọc
        ]}
        onPress={() => handlePressNotification(item.id)}>
        <Image source={item.imageUrl} style={styles.avatar} />
        <View style={styles.notificationInfo}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text
            style={styles.notificationDescription}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có thông báo nào</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    marginHorizontal: 10,
    marginTop: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    color: '#333',
  },
  notificationDescription: {
    fontSize: 12,
    color: '#666',
    maxWidth: '90%', // Đảm bảo văn bản không vượt quá chiều rộng của container
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    color: '#888',
  },
});

export default NotificationScreen;
