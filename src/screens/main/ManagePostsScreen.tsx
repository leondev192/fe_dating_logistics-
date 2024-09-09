// src/screens/UserPostsScreen.tsx
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  RefreshControl,
  Alert,
} from 'react-native';
import {getUserPosts, deletePost} from '../../apis/services/postService';
import {Post} from '../../models/postModel';
import PostItem from '../../components/items/PostItemManager';
import {useNavigation} from '@react-navigation/native';

const UserPostsScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  // Hàm lấy dữ liệu bài đăng của user
  const fetchUserPosts = async () => {
    try {
      const userPosts = await getUserPosts();
      setPosts(userPosts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
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
    console.log('Navigating to Edit with postId:', post.id); // Log kiểm tra postId
    // Truyền đúng postId khi điều hướng đến EditOfferingTransportPost
    switch (post.postType) {
      case 'CargoMatching':
        navigation.navigate('EditCargoMatchingPost', {post});
        break;
      case 'LookingForTransport':
        navigation.navigate('EditLookingForTransportPost', {postId: post.id}); // Đảm bảo truyền đúng postId
        break;
      case 'OfferingTransport':
        navigation.navigate('EditOfferingTransportPost', {postId: post.id}); // Sửa lại để truyền đúng postId
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
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.noDataText}>Không có bài đăng nào</Text>
        }
        contentContainerStyle={styles.postList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  postList: {
    flexGrow: 1,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});

export default UserPostsScreen;
