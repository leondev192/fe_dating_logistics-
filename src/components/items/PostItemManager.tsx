// PostManagerItem.tsx
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  ArrowRight,
  Box,
  TruckFast,
  TruckRemove,
  Home3,
} from 'iconsax-react-native';
import GradientButton from '../../components/button/post/GradientButton';
import OutlineButton from '../../components/button/post/OutlineButton';

interface PostManagerItemProps {
  postType: string;
  companyName?: string;
  hasVehicle?: boolean | null;
  cargoType?: string;
  cargoWeight?: number | null;
  cargoVolume?: number | null;
  requiredVehicleType?: string;
  cargoTypeRequest?: string;
  vehicleType?: string;
  maxWeight?: number | null;
  availableWeight?: number | null;
  pricePerUnit?: number | null;
  vehicleDetails?: string;
  origin?: string;
  destination?: string;
  transportTime?: string;
  returnTrip?: boolean | null;
  returnTime?: string | null;
  status: string;
  specialRequirements?: string;
  image: any;
  onEdit: () => void; // Hàm sửa
  onDelete: () => void; // Hàm xóa
}

const PostManagerItem: React.FC<PostManagerItemProps> = ({
  postType,
  companyName,
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
  transportTime,
  returnTrip,
  returnTime,
  status,
  specialRequirements,
  image,
  onEdit,
  onDelete,
}) => {
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

    return (
      <View style={styles.titleWrapper}>
        <View style={styles.companyNameContainer}>
          <Home3 size="20" color="#555" style={styles.companyIcon} />
          <Text style={styles.companyName}>
            {companyName || 'Tên công ty không xác định'}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          {icon}
          <Text style={styles.postType}>{title}</Text>
        </View>
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
                  <Text style={styles.label}>Loại hàng yêu cầu:</Text>
                  <Text style={styles.detail} numberOfLines={1}>
                    {cargoTypeRequest}
                  </Text>
                </View>
              )}
              {requiredVehicleType && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Loại xe:</Text>
                  <Text style={styles.detail}>{requiredVehicleType}</Text>
                </View>
              )}
            </View>
            <View style={styles.column}>
              {origin && destination && (
                <View style={styles.routeRow}>
                  <Text style={styles.label}>Tuyến:</Text>
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
              {transportTime && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Thời gian dự kiến:</Text>
                  <Text style={styles.detail}>
                    {new Date(transportTime).toLocaleDateString()}
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
              {maxWeight !== undefined && maxWeight !== null && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Trọng tải tối đa:</Text>
                  <Text style={styles.detail}>{maxWeight}</Text>
                </View>
              )}
              {availableWeight !== undefined && availableWeight !== null && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Trọng tải còn lại:</Text>
                  <Text style={styles.detail}>{availableWeight}</Text>
                </View>
              )}
              {pricePerUnit !== undefined && pricePerUnit !== null && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Giá mỗi đơn vị:</Text>
                  <Text style={styles.detail}>{pricePerUnit}</Text>
                </View>
              )}
            </View>
            <View style={styles.column}>
              {origin && destination && (
                <View style={styles.routeRow}>
                  <Text style={styles.label}>Tuyến:</Text>
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
              {vehicleDetails && (
                <View style={styles.rowInfo}>
                  <Text style={styles.label}>Chi tiết xe:</Text>
                  <Text style={styles.detail} numberOfLines={1}>
                    {vehicleDetails}
                  </Text>
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
        <Image source={image} style={styles.avatar} />
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
      <View style={styles.buttonContainer}>
        <GradientButton title="Sửa" onPress={onEdit} />
        <OutlineButton title="Xóa" onPress={onDelete} />
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
    marginTop: 25,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PostManagerItem;
