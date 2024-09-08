import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import PostItem from '../../components/items/PostItem';
import {Box, TruckFast, TruckRemove, ArchiveTick} from 'iconsax-react-native';
import Colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {getAllPosts} from '../../apis/services/postService';
import {Post} from '../../models/postModel';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getAllPosts();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleNavigation = (route: string) => {
    navigation.navigate(route);
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
      vehicleType={item.vehicleType}
      maxWeight={item.vehicleCapacity}
      availableWeight={item.availableWeight}
      pricePerUnit={item.pricePerUnit}
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

  return (
    <ScrollView style={styles.container}>
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
          onPress={() => handleNavigation('CreateCargoMatchingPost')}>
          <Box size="32" color={Colors.primary} />
          <Text style={styles.filterText}>Ghép hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.postButton}
          onPress={() => handleNavigation('CreateLookingForTransportPost')}>
          <TruckFast size="32" color={Colors.primary} />
          <Text style={styles.filterText}>Tìm vận chuyển</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.postButton}
          onPress={() => handleNavigation('CreateOfferingTransportPost')}>
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
        {posts.length > 0 ? (
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={1}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.noDataText}>Không có bài đăng nào</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  createSliderContainer: {
    marginHorizontal: 5,
    marginTop: 5,
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
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;
