import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

// Định nghĩa kiểu dữ liệu cho bài đăng
interface PostItemProps {
  postType: string; // yêu cầu hoặc cung cấp dịch vụ
  cargoType?: string; // Loại hàng hóa
  vehicleType?: string; // Loại xe
  quantity?: number; // Số lượng hàng hóa
  origin?: string; // Nơi bắt đầu vận chuyển
  destination?: string; // Nơi kết thúc vận chuyển
  transportTime?: string; // Thời gian vận chuyển dự kiến
  status: string; // Trạng thái bài đăng
  image: any; // Ảnh đại diện cho bài đăng
  onPress: () => void;
}

const PostItem: React.FC<PostItemProps> = ({
  postType,
  cargoType,
  vehicleType,
  quantity,
  origin,
  destination,
  transportTime,
  status,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>
          {postType === 'Yêu cầu'
            ? '🚚 Yêu cầu vận chuyển'
            : '📦 Cung cấp dịch vụ'}
        </Text>
        <View style={styles.divider} />
        {cargoType && (
          <View style={styles.row}>
            <Text style={styles.label}>Loại hàng:</Text>
            <Text style={styles.detail}>{cargoType}</Text>
          </View>
        )}
        {vehicleType && (
          <View style={styles.row}>
            <Text style={styles.label}>Loại xe:</Text>
            <Text style={styles.detail}>{vehicleType}</Text>
          </View>
        )}
        {quantity !== undefined && (
          <View style={styles.row}>
            <Text style={styles.label}>Số lượng:</Text>
            <Text style={styles.detail}>{quantity} tấn</Text>
          </View>
        )}
        {origin && destination && (
          <View style={styles.row}>
            <Text style={styles.label}>Tuyến:</Text>
            <Text style={styles.detail}>
              {origin} ➡ {destination}
            </Text>
          </View>
        )}
        {transportTime && (
          <View style={styles.row}>
            <Text style={styles.label}>Thời gian:</Text>
            <Text style={styles.detail}>
              {new Date(transportTime).toLocaleDateString()}
            </Text>
          </View>
        )}
        <View style={styles.divider} />
        <Text
          style={[
            styles.status,
            status === 'Hoàn tất' ? styles.completed : styles.active,
          ]}>
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  detail: {
    fontSize: 14,
    color: '#888',
    marginLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
    padding: 4,
    borderRadius: 4,
  },
  active: {
    color: '#4CAF50', // Màu xanh cho trạng thái hoạt động
    backgroundColor: '#E8F5E9',
  },
  completed: {
    color: '#F44336', // Màu đỏ cho trạng thái hoàn tất
    backgroundColor: '#FDECEA',
  },
});

export default PostItem;
