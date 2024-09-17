import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  ArrowRight,
  Box,
  TruckFast,
  TruckRemove,
  Building4,
} from 'iconsax-react-native';
import GradientButton from '../../components/button/payment/OutlineButton';

interface PostItemProps {
  postId: string;
  receiverId: string;
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
  onContactPress: (postId: string, receiverId: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({
  postId,
  receiverId,
  postType,
  companyName,
  cargoType,
  cargoWeight,
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
  returnTrip,
  returnTime,
  status,
  image,
  onContactPress,
}) => {
  // Header hiển thị thông tin công ty và loại bài đăng
  const renderHeader = () => {
    let icon;
    let title;

    switch (postType) {
      case 'CargoMatching':
        icon = <Box size="20" color="#555" />;
        title = 'Ghép hàng';
        break;
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

    return (
      <View style={styles.header}>
        <Image source={image} style={styles.avatar} />
        <View style={styles.titleWrapper}>
          <View style={styles.companyNameContainer}>
            <Building4 size="20" color="#555" style={styles.companyIcon} />
            <Text style={styles.companyName}>
              {companyName || 'Tên công ty không xác định'}
            </Text>
          </View>
          <View style={styles.postTypeContainer}>
            {icon}
            <Text style={styles.postType}>{title}</Text>
            <Text
              style={[
                styles.status,
                status === 'active' ? styles.active : styles.completed,
              ]}>
              {status === 'active' ? 'Hoạt động' : 'Hoàn tất'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // Hiển thị chi tiết bài đăng
  const renderDetails = () => (
    <View style={styles.detailsContainer}>
      {/* Cột 1: Thông tin phương tiện */}
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

      {/* Cột 2: Thông tin tuyến đường */}
      <View style={styles.column}>
        {origin && destination && (
          <View style={styles.routeRow}>
            <Text style={styles.label}>Tuyến đường:</Text>
            <View style={styles.routeContainer}>
              <Text style={styles.detail}>{origin}</Text>
              <ArrowRight size="16" color="#888" style={styles.arrowIcon} />
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

  return (
    <TouchableOpacity style={styles.container}>
      {renderHeader()}
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
  postTypeContainer: {
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
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  column: {
    flex: 1,
    padding: 5,
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeRow: {
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
  },
  contactContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
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
