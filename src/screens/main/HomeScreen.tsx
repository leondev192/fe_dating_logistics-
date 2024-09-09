// src/screens/HomeScreen.tsx
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Swiper from 'react-native-swiper';
import PostItem from '../../components/items/PostItem';
import {LogBox} from 'react-native';

import {
  Box,
  TruckFast,
  TruckRemove,
  ArchiveTick,
  Refresh,
} from 'iconsax-react-native';
import Colors from '../../constants/colors';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {getAllPosts} from '../../apis/services/postService';
import {Post} from '../../models/postModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  LogBox.ignoreLogs(['VirtualizedLists should never be nested']); // Bỏ qua cảnh báo này

  // Hàm lấy dữ liệu bài đăng
  const fetchPosts = async () => {
    try {
      const postsData = await getAllPosts();
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Hàm xử lý làm mới dữ liệu khi kéo lên
  const onRefresh = useCallback(async () => {
    setRefreshing(true); // Hiển thị loading
    await fetchPosts(); // Lấy lại dữ liệu mới
    setRefreshing(false); // Tắt loading sau khi lấy xong dữ liệu
  }, []);

  const checkTokenAndNavigate = async (route: string) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        navigation.navigate(route as never);
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Auth', params: {screen: 'Login'}}],
          }),
        );
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra token:', error);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Auth', params: {screen: 'Login'}}],
        }),
      );
    }
  };

  const renderItem = ({item}: {item: Post}) => (
    <PostItem
      postType={item.postType}
      companyName={item.companyName}
      hasVehicle={item.hasVehicle}
      cargoType={item.cargoType}
      cargoWeight={item.cargoWeight}
      cargoVolume={item.cargoVolume}
      requiredVehicleType={item.requiredVehicleType}
      cargoTypeRequest={item.cargoTypeRequest} // thêm trường này cho loại LookingForTransport
      vehicleType={item.vehicleType}
      maxWeight={item.vehicleCapacity}
      availableWeight={item.availableWeight}
      pricePerUnit={item.pricePerUnit}
      vehicleDetails={item.vehicleDetails} // thêm trường này cho loại OfferingTransport
      origin={item.origin}
      destination={item.destination}
      transportTime={item.transportTime}
      returnTrip={item.returnTrip}
      returnTime={item.returnTime}
      status={item.status}
      specialRequirements={item.specialRequirements}
      image={{uri: item.companyImageUrl || 'https://via.placeholder.com/50'}}
      onPress={() => console.log(`Pressed on post: ${item.id}`)}
    />
  );

  const renderSwiper = () => (
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
  );

  const renderHeader = () => (
    <View>
      <View style={styles.postContainer}>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => checkTokenAndNavigate('CreateCargoMatchingPost')}>
          <Box size="32" color={Colors.primary} />
          <Text style={styles.filterText}>Ghép hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.postButton}
          onPress={() =>
            checkTokenAndNavigate('CreateLookingForTransportPost')
          }>
          <TruckFast size="32" color={Colors.primary} />
          <Text style={styles.filterText}>Tìm vận chuyển</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.postButton}
          onPress={() => checkTokenAndNavigate('CreateOfferingTransportPost')}>
          <TruckRemove size="32" color={Colors.primary} />
          <Text style={styles.filterText}>Cung cấp vận chuyển</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.postButton}
          onPress={() => checkTokenAndNavigate('TheoDoiDonHangScreen')}>
          <ArchiveTick size="32" color={Colors.primary} />
          <Text style={styles.filterText}>Theo dõi đơn hàng</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
        <Refresh size="24" color={Colors.primary} />
        <Text style={styles.refreshText}>Làm mới</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderSwiper()}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.noDataText}>Không có bài đăng nào</Text>
        }
        contentContainerStyle={styles.postList}
        nestedScrollEnabled={true} // Thêm thuộc tính này để xử lý lỗi
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  createSliderContainer: {
    marginHorizontal: 5,
    marginTop: 30,
  },
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
  postContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
    paddingTop: 10,
  },
  postButton: {
    backgroundColor: '#E6EAF4',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
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
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#E6EAF4',
    marginHorizontal: 5,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
  },
  refreshText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  postList: {
    paddingBottom: 5,
    flexGrow: 1,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;
