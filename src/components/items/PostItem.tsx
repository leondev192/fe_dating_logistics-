import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  ArrowRight,
  Box,
  TruckFast,
  TruckRemove,
  Building4,
} from 'iconsax-react-native';
import GradientButton from '../../components/button/GradientButtonItem'; // Import GradientButton
import {NavigationProp, useNavigation} from '@react-navigation/native';
import RootStackParamList from '../../navigations/RootStackParamList';

interface PostItemProps {
  postId: string;
  createdAt: string;
  receiverId: string; // Thêm receiverId vào đây
  postType: string;
  companyName?: string;
  hasVehicle?: boolean | null;
  cargoType?: string;
  cargoWeight?: string | null;
  cargoVolume?: string | null;
  requiredVehicleType?: string;
  cargoTypeRequest?: string;
  vehicleType?: string;
  maxWeight?: string | null;
  availableWeight?: string | null;
  pricePerUnit?: string | null;
  vehicleDetails?: string;
  origin?: string;
  destination?: string;
  transportGoes?: string;
  transportComes?: string;
  returnTrip?: boolean | null;
  returnTime?: string | null;
  status: string;
  specialRequirements?: string;
  image: any;
  onContactPress: (postId: string, receiverId: string) => void; // Định nghĩa hàm này nhận cả postId và receiverId
}

const PostItem: React.FC<PostItemProps> = ({
  postId,
  receiverId,
  postType,
  companyName,
  createdAt,
  hasVehicle,
  cargoType,
  cargoWeight,
  cargoVolume,
  requiredVehicleType,
  cargoTypeRequest,
  vehicleType,
  maxWeight,
  availableWeight,
  pricePerUnit,
  vehicleDetails,
  origin,
  destination,
  transportGoes,
  transportComes,
  returnTrip,
  returnTime,
  status,
  specialRequirements,
  image,

  onContactPress,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderTitle = () => {
    let icon;
    let title;

    switch (postType) {
      case 'LookingForTransport':
        icon = <TruckFast size="20" color="#555" />;
        title = 'Tìm vận chuyển';
        break;
      case 'OfferingTransport':
        icon = <TruckRemove size="20" color="#555" />;
        title = 'Cung cấp vận chuyển';
        break;
      default:
        title = 'Loại khác';
        break;
    }
    const formattedDate = new Date(createdAt).toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return (
      <View style={styles.titleWrapper}>
        <View style={styles.companyNameContainer}>
          <Building4 size="20" color="#555" style={styles.companyIcon} />
          <Text style={styles.companyName}>
            {companyName || 'Tên công ty không xác định'}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          {icon}
          <Text style={styles.postType}>{title}</Text>
        </View>
        <Text style={styles.createdAt}>Đăng lúc: {formattedDate}</Text>
      </View>
    );
  };

  const renderDetails = () => {
    switch (postType) {
      case 'LookingForTransport':
        return (
          <View style={styles.detailsContainer}>
            <View style={styles.column}>
              {cargoTypeRequest && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Loại hàng hoá:</Text>
                  <Text style={styles.detail}>{cargoTypeRequest}</Text>
                </View>
              )}
              {requiredVehicleType && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Loại xe:</Text>
                  <Text style={styles.detail}>{requiredVehicleType}</Text>
                </View>
              )}
              {cargoWeight && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Trọng lượng:</Text>
                  <Text style={styles.detail}>{cargoWeight}</Text>
                </View>
              )}
            </View>
            <View style={styles.column}>
              {origin && destination && (
                <View style={styles.routeRow}>
                  <Text style={styles.label}>Tuyến đường:</Text>
                  <View style={styles.routeContainer}>
                    <Text style={styles.detail}>{origin}</Text>
                    <ArrowRight
                      size="16"
                      color="#888"
                      style={styles.arrowIcon}
                    />
                    <Text style={styles.detail}>{destination}</Text>
                  </View>
                </View>
              )}
              {transportGoes && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Thời gian dự kiến:</Text>
                  <Text style={styles.detail}>
                    {new Date(transportGoes).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </View>
          </View>
        );
      case 'OfferingTransport':
        return (
          <View style={styles.detailsContainer}>
            <View style={styles.column}>
              {vehicleType && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Loại xe:</Text>
                  <Text style={styles.detail}>{vehicleType}</Text>
                </View>
              )}
              {cargoTypeRequest && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Loại hàng hoá:</Text>
                  <Text style={styles.detail}>{cargoTypeRequest}</Text>
                </View>
              )}
              {maxWeight && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Trọng tải tối đa:</Text>
                  <Text style={styles.detail}>{maxWeight} tấn</Text>
                </View>
              )}
              {availableWeight && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Trọng tải còn lại:</Text>
                  <Text style={styles.detail}>{availableWeight} tấn</Text>
                </View>
              )}
              {pricePerUnit && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Giá mỗi đơn vị:</Text>
                  <Text style={styles.detail}>{pricePerUnit} VND</Text>
                </View>
              )}
              <View style={styles.rowInfo}>
                <Text style={styles.label}>Khứ hồi:</Text>
                <Text style={styles.detail}>{returnTrip ? 'Có' : 'Không'}</Text>
              </View>
            </View>
            <View style={styles.column}>
              {origin && destination && (
                <View style={styles.routeRow}>
                  <Text style={styles.label}>Tuyến đường:</Text>
                  <View style={styles.routeContainer}>
                    <Text style={styles.detail}>{origin}</Text>
                    <ArrowRight
                      size="16"
                      color="#888"
                      style={styles.arrowIcon}
                    />
                    <Text style={styles.detail}>{destination}</Text>
                  </View>
                </View>
              )}
              {transportGoes && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Thời gian dự kiến:</Text>
                  <Text style={styles.detail}>
                    {new Date(transportGoes).toLocaleDateString()}
                  </Text>
                </View>
              )}

              {vehicleDetails && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Chi tiết xe:</Text>
                  <Text style={styles.detail}>{vehicleDetails}</Text>
                </View>
              )}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('UserProfileScreen', {userId: receiverId})
          }>
          <Image source={image} style={styles.avatar} />
        </TouchableOpacity>
        {renderTitle()}
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.status,
              status === 'completed' ? styles.completed : styles.active,
            ]}>
            {status === 'active' ? 'Hoạt động' : 'Hoàn tất'}
          </Text>
        </View>
      </View>
      {renderDetails()}
      <View style={styles.contactContainer}>
        <GradientButton
          title="Liên hệ"
          onPress={() => onContactPress(postId, receiverId)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
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
  titleWrapper: {
    flex: 1,
  },
  companyNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  companyIcon: {
    marginRight: 5,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postType: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
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
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  routeRow: {
    flexDirection: 'column',
    marginBottom: 4,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  arrowIcon: {
    marginHorizontal: 5,
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
    paddingVertical: 5,
    flexShrink: 1,
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
  createdAt: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default PostItem;
