import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import PostItem from '../../components/items/PostItem';
import {
  Box,
  TruckFast,
  TruckRemove,
  ArchiveTick,
  Filter,
} from 'iconsax-react-native';
import Colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';

interface Post {
  id: string;
  postType: string;
  companyName: string; // Tên công ty đăng bài
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
}

const samplePosts: Post[] = [
  {
    id: '1',
    postType: 'Ghép hàng',
    companyName: 'ABC Logistics',
    cargoType: 'Hàng khô',
    vehicleType: 'Xe tải',
    maxWeight: 20,
    availableWeight: 8,
    origin: 'Hà Nội',
    destination: 'Hồ Chí Minh',
    transportTime: '2024-09-10',
    returnTrip: true,
    returnTime: '2024-09-15',
    status: 'Hoạt động',
    specialRequirements: 'Không được để ướt',
    image: require('../../assets/images/1.png'),
  },
  {
    id: '2',
    postType: 'Tìm vận chuyển',
    companyName: 'DEF Transport',
    cargoType: 'Hàng lạnh',
    vehicleType: 'Xe container',
    quantity: 50,
    origin: 'Đà Nẵng',
    destination: 'Hải Phòng',
    transportTime: '2024-09-15',
    status: 'Hoạt động',
    specialRequirements: 'Bảo quản dưới -2°C',
    costEstimate: 5000000,
    image: require('../../assets/images/2.png'),
  },
  {
    id: '3',
    postType: 'Cung cấp vận chuyển',
    companyName: 'GHI Cargo',
    vehicleType: 'Xe tải lớn',
    maxWeight: 30,
    availableWeight: 10,
    pricePerUnit: 120000,
    origin: 'Quảng Ninh',
    destination: 'Nghệ An',
    transportTime: '2024-09-18',
    returnTrip: false,
    status: 'Hoạt động',
    specialRequirements: 'Hàng nặng, cần xe cẩu hỗ trợ',
    image: require('../../assets/images/3.png'),
  },
  {
    id: '4',
    postType: 'Cung cấp vận chuyển',
    companyName: 'GHI Cargo',
    vehicleType: 'Xe tải lớn',
    maxWeight: 30,
    availableWeight: 10,
    pricePerUnit: 120000,
    origin: 'Quảng Ninh',
    destination: 'Nghệ An',
    transportTime: '2024-09-18',
    returnTrip: false,
    status: 'Hoạt động',
    specialRequirements: 'Hàng nặng, cần xe cẩu hỗ trợ',
    image: require('../../assets/images/3.png'),
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = route => {
    navigation.navigate(route);
  };

  const renderItem = ({item}: {item: Post}) => (
    <PostItem
      postType={item.postType}
      companyName={item.companyName}
      cargoType={item.cargoType}
      vehicleType={item.vehicleType}
      quantity={item.quantity}
      maxWeight={item.maxWeight}
      availableWeight={item.availableWeight}
      pricePerUnit={item.pricePerUnit}
      origin={item.origin}
      destination={item.destination}
      transportTime={item.transportTime}
      returnTrip={item.returnTrip}
      returnTime={item.returnTime}
      status={item.status}
      specialRequirements={item.specialRequirements}
      costEstimate={item.costEstimate}
      image={item.image}
      onPress={() => console.log(`Pressed on post: ${item.id}`)}
    />
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.createSliderContainer}>
        <Swiper
          style={styles.wrapper}
          autoplay={true}
          autoplayTimeout={4}
          showsPagination={true}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}>
          <Image
            source={require('../../assets/images/1.png')}
            style={styles.bannerImage}
          />
          <Image
            source={require('../../assets/images/2.png')}
            style={styles.bannerImage}
          />
          <Image
            source={require('../../assets/images/3.png')}
            style={styles.bannerImage}
          />
        </Swiper>
      </View>

      <View style={styles.postContainer}>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => handleNavigation('GhepHangScreen')}>
          <Box size="32" color={Colors.primary} />
          <Text style={styles.filterText}>Ghép hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.postButton}
          onPress={() => handleNavigation('TimVanChuyenScreen')}>
          <TruckFast size="32" color={Colors.primary} />
          <Text style={styles.filterText}>Tìm vận chuyển</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.postButton}
          onPress={() => handleNavigation('CungCapVanChuyenScreen')}>
          <TruckRemove size="32" color={Colors.primary} />
          <Text style={styles.filterText}>Cung cấp vận chuyển</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.postButton}
          onPress={() => handleNavigation('TheoDoiDonHangScreen')}>
          <ArchiveTick size="32" color={Colors.primary} />
          <Text style={styles.filterText}>Theo dõi đơn hàng</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.postList}>
        <FlatList
          data={samplePosts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={1}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  createSliderContainer: {marginHorizontal: 5, marginTop: 5},
  wrapper: {
    height: 220,
  },
  bannerImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  dot: {
    backgroundColor: Colors.background,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    marginBottom: -15,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    marginBottom: -15,
  },
  companyInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#E6EAF4',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  companyName: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },

  postContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
    paddingTop: 10,
    marginHorizontal: 5,
  },
  postButton: {
    backgroundColor: '#E6EAF4',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  filterText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
  postList: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
