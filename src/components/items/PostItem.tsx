import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface PostItemProps {
  postType: string;
  companyName: string;
  cargoType?: string;
  vehicleType?: string;
  quantity?: number;
  maxWeight?: number;
  availableWeight?: number;
  pricePerUnit?: number;
  origin?: string;
  destination?: string;
  transportTime?: string;
  returnTrip?: boolean;
  returnTime?: string;
  status: string;
  specialRequirements?: string;
  costEstimate?: number;
  image: any;
  onPress: () => void;
}

const PostItem: React.FC<PostItemProps> = ({
  postType,
  companyName,
  cargoType,
  vehicleType,
  quantity,
  maxWeight,
  availableWeight,
  pricePerUnit,
  origin,
  destination,
  transportTime,
  returnTrip,
  returnTime,
  status,
  specialRequirements,
  costEstimate,
  image,
  onPress,
}) => {
  // Xử lý hiển thị tiêu đề bài đăng
  const renderTitle = () => {
    switch (postType) {
      case 'Ghép hàng':
        return 'Ghép hàng';
      case 'Tìm vận chuyển':
        return 'Tìm vận chuyển';
      case 'Cung cấp vận chuyển':
        return 'Cung cấp vận chuyển';
      default:
        return '';
    }
  };

  // Hiển thị thông tin chi tiết với bố cục lưới
  const renderDetails = () => (
    <View style={styles.detailsContainer}>
      <View style={styles.column}>
        {cargoType && (
          <View style={styles.rowInfo}>
            <Text style={styles.label}>Loại hàng:</Text>
            <Text style={styles.detail}>{cargoType}</Text>
          </View>
        )}
        {vehicleType && (
          <View style={styles.rowInfo}>
            <Text style={styles.label}>Loại xe:</Text>
            <Text style={styles.detail}>{vehicleType}</Text>
          </View>
        )}
        {maxWeight && (
          <View style={styles.rowInfo}>
            <Text style={styles.label}>Trọng tải tối đa:</Text>
            <Text style={styles.detail}>{maxWeight} tấn</Text>
          </View>
        )}
        {availableWeight !== undefined && (
          <View style={styles.rowInfo}>
            <Text style={styles.label}>Trọng tải còn lại:</Text>
            <Text style={styles.detail}>{availableWeight} tấn</Text>
          </View>
        )}
        {quantity !== undefined && (
          <View style={styles.rowInfo}>
            <Text style={styles.label}>Khối lượng:</Text>
            <Text style={styles.detail}>{quantity} tấn</Text>
          </View>
        )}
      </View>
      <View style={styles.column}>
        {origin && destination && (
          <View style={styles.rowInfo}>
            <Text style={styles.label}>Tuyến:</Text>
            <Text style={styles.detail}>
              {origin} ➡ {destination}
            </Text>
          </View>
        )}
        {transportTime && (
          <View style={styles.rowInfo}>
            <Text style={styles.label}>Thời gian:</Text>
            <Text style={styles.detail}>
              {new Date(transportTime).toLocaleDateString()}
            </Text>
          </View>
        )}
        {returnTrip && returnTime && (
          <View style={styles.rowInfo}>
            <Text style={styles.label}>Khứ hồi:</Text>
            <Text style={styles.detail}>
              {new Date(returnTime).toLocaleDateString()}
            </Text>
          </View>
        )}
        {specialRequirements && (
          <View style={styles.rowInfo}>
            <Text style={styles.label}>Yêu cầu đặc biệt:</Text>
            <Text style={styles.detail}>{specialRequirements}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Image source={image} style={styles.avatar} />
        <View style={styles.titleContainer}>
          <Text style={styles.companyName}>{companyName}</Text>
          <Text style={styles.postType}>{renderTitle()}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.status,
              status === 'Hoàn tất' ? styles.completed : styles.active,
            ]}>
            {status}
          </Text>
        </View>
      </View>
      {renderDetails()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postType: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  column: {
    flex: 1,
    minWidth: '45%',
    padding: 4,
  },
  rowInfo: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  detail: {
    fontSize: 13,
    color: '#888',
    marginLeft: 5,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
    borderRadius: 4,
  },
  active: {
    color: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  completed: {
    color: '#F44336',
    backgroundColor: '#FDECEA',
  },
});

export default PostItem;
