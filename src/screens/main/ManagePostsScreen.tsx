import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {getUserPosts, deletePost} from '../../apis/services/postService';
import {Post} from '../../models/postModel';
import PostItem from '../../components/items/PostItemManager';
import {useNavigation} from '@react-navigation/native';
import {Box, TruckFast, Truck, Archive} from 'iconsax-react-native';
import Colors from '../../constants/colors';
import LoadingSpinner from '../../components/loading/LoadingSpinner'; // Import LoadingSpinner

const UserPostsScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState<boolean>(true); // Thêm state loading
  const navigation = useNavigation();

  // Hàm lấy dữ liệu bài đăng của user
  const fetchUserPosts = async () => {
    setLoading(true); // Bắt đầu loading khi tải dữ liệu
    try {
      const userPosts = await getUserPosts();
      setPosts(userPosts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    } finally {
      setLoading(false); // Kết thúc loading sau khi tải dữ liệu
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  // Hàm làm mới danh sách bài đăng
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserPosts();
    setRefreshing(false);
  }, []);

  // Hàm xử lý xóa bài đăng
  const handleDeletePost = async (postId: string) => {
    Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa bài đăng này không?', [
      {text: 'Hủy', style: 'cancel'},
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          try {
            await deletePost(postId);
            fetchUserPosts();
          } catch (error) {
            console.error('Error deleting post:', error);
          }
        },
      },
    ]);
  };

  const handleEditPost = (post: Post) => {
    switch (post.postType) {
      case 'CargoMatching':
        navigation.navigate('EditCargoMatchingPost', {post});
        break;
      case 'LookingForTransport':
        navigation.navigate('EditLookingForTransportPost', {postId: post.id});
        break;
      case 'OfferingTransport':
        navigation.navigate('EditOfferingTransportPost', {postId: post.id});
        break;
      default:
        break;
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
      cargoTypeRequest={item.cargoTypeRequest}
      vehicleType={item.vehicleType}
      maxWeight={item.vehicleCapacity}
      availableWeight={item.availableWeight}
      pricePerUnit={item.pricePerUnit}
      vehicleDetails={item.vehicleDetails}
      origin={item.origin}
      destination={item.destination}
      transportTime={item.transportTime}
      returnTrip={item.returnTrip}
      returnTime={item.returnTime}
      status={item.status}
      specialRequirements={item.specialRequirements}
      image={{uri: item.companyImageUrl || 'https://via.placeholder.com/50'}}
      onPress={() => console.log(`Pressed on post: ${item.id}`)}
      onEdit={() => handleEditPost(item)}
      onDelete={() => handleDeletePost(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => navigation.navigate('CreateLookingForTransportPost')}>
          <TruckFast size="24" color={'#555'} />
          <Text style={styles.filterText} numberOfLines={1}>
            Tìm xe
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.postButton}
          onPress={() => navigation.navigate('CreateOfferingTransportPost')}>
          <Truck size="24" color={'#555'} />
          <Text style={styles.filterText} numberOfLines={1}>
            Cung cấp xe
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.postButton}
          onPress={() => navigation.navigate('TheoDoiDonHangScreen')}>
          <Archive size="24" color={'#555'} />
          <Text style={styles.filterText} numberOfLines={1}>
            Theo dõi
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}></View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.noDataText}>Bạn chưa có bài đăng nào</Text>
          }
          contentContainerStyle={styles.postList}
        />
      )}
      <LoadingSpinner loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  postContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
    marginTop: 5,
  },
  postButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 50,
  },
  filterText: {
    color: '#555',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
  postList: {
    paddingBottom: 20,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default UserPostsScreen;
