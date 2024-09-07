import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Swiper from 'react-native-swiper';
import PostItem from '../../components/items/PostItem';
import {AddCircle} from 'iconsax-react-native';
import Colors from '../../constants/colors';
interface Post {
  id: string;
  postType: string;
  cargoType: string;
  vehicleType: string;
  quantity: number;
  origin: string;
  destination: string;
  transportTime: string;
  status: string;
  image: any; // Thay đổi theo kiểu chính xác của image
}
const samplePosts = [
  {
    id: '1',
    postType: 'Yêu cầu',
    cargoType: 'Hàng khô',
    vehicleType: 'Xe tải',
    quantity: 20,
    origin: 'Hà Nội',
    destination: 'Hồ Chí Minh',
    transportTime: '2024-09-10',
    status: 'Hoạt động',
    image: require('../../assets/images/1.png'),
  },
  {
    id: '2',
    postType: 'Cung cấp dịch vụ',
    cargoType: 'Hàng lạnh',
    vehicleType: 'Xe container',
    quantity: 50,
    origin: 'Đà Nẵng',
    destination: 'Hải Phòng',
    transportTime: '2024-09-15',
    status: 'Đã ghép đôi',
    image: require('../../assets/images/2.png'),
  },
  {
    id: '3',
    postType: 'Yêu cầu',
    cargoType: 'Hàng dễ vỡ',
    vehicleType: 'Xe tải nhỏ',
    quantity: 10,
    origin: 'Hải Dương',
    destination: 'Hà Nội',
    transportTime: '2024-09-12',
    status: 'Hoạt động',
    image: require('../../assets/images/3.png'),
  },
  {
    id: '4',
    postType: 'Cung cấp dịch vụ',
    cargoType: 'Hàng nặng',
    vehicleType: 'Xe cẩu',
    quantity: 30,
    origin: 'Quảng Ninh',
    destination: 'Nghệ An',
    transportTime: '2024-09-18',
    status: 'Đã ghép đôi',
    image: require('../../assets/images/1.png'),
  },
];

const HomeScreen = () => {
  const renderItem = ({item}: {item: Post}) => (
    <PostItem
      postType={item.postType}
      cargoType={item.cargoType}
      vehicleType={item.vehicleType}
      quantity={item.quantity}
      origin={item.origin}
      destination={item.destination}
      transportTime={item.transportTime}
      status={item.status}
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

      <View style={styles.createPostContainer}>
        <TouchableOpacity style={styles.createPostButton}>
          <AddCircle size="28" color="#110088" variant="Bold" />
          <Text style={styles.createPostText}>
            Bạn đang nghĩ gì? Tạo bài đăng mới...
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quickFilterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Yêu cầu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Cung cấp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Đang hoạt động</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Đã ghép đôi</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.postList}>
        <FlatList
          data={samplePosts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
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
  createPostContainer: {
    marginVertical: 15,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  createPostText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },
  quickFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  filterButton: {
    backgroundColor: Colors.bordercolor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 8,
    elevation: 2,
  },
  filterText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  postList: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
