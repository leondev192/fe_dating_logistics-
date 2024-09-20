import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import PostItem from '../../components/items/PostItem';
import {Box, TruckFast, Truck, Archive} from 'iconsax-react-native';
import Colors from '../../constants/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getAllPosts} from '../../apis/services/postService';
import {Post} from '../../models/postModel';
import {createChat} from '../../apis/services/chatService';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserInfo} from '../../apis/services/userService';
import RootStackParamList from '../../navigations/RootStackParamList';
import {useAnimatedValue} from '../../hooks/useAnimatedValue';
import Video from 'react-native-video';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const animatedValue = useAnimatedValue(0);

  // Fetch current user info
  const fetchCurrentUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const userInfo = await getUserInfo(token);
        setCurrentUser(userInfo);
      }
    } catch (error) {
      // console.error('Error fetching current user:', error);
    }
  };

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const postsData = await getAllPosts();
      setPosts(postsData);
      applyFilter(filter, postsData);
    } catch (error) {
      // console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser(); // Lấy thông tin người dùng khi màn hình được tải
    fetchPosts();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  }, []);

  const applyFilter = (filter: string, posts: Post[]) => {
    let filtered = [...posts];
    switch (filter) {
      case 'lookingForTransport':
        filtered = posts.filter(
          post => post.postType === 'LookingForTransport',
        );
        break;
      case 'offeringTransport':
        filtered = posts.filter(post => post.postType === 'OfferingTransport');
        break;
      default:
        filtered = posts;
        break;
    }
    setFilteredPosts(filtered);
  };

  const handleContactPress = async (postId: string, receiverId: string) => {
    if (currentUser && currentUser.id === receiverId) {
      Alert.alert(
        'Đây là bài viết của bạn',
        'Bạn không thể liên hệ với chính mình.',
      );
      return;
    }

    try {
      await createChat({postId, receiverId});
      Alert.alert('Thành công', 'Liên hệ thành công.');
      navigation.navigate('Message');
    } catch (error) {
      Alert.alert(
        'Bạn chưa đăng nhập',
        'Vui lòng đăng nhập để sử dụng dịch vụ ',
      );
    }
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
    applyFilter(filter, posts);
  };

  const renderItem = ({item}: {item: Post}) => (
    <PostItem
      postId={item.id}
      createdAt={item.createdAt}
      receiverId={item.userId}
      postType={item.postType}
      companyName={item.companyName}
      cargoTypeRequest={item.cargoTypeRequest}
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
      transportGoes={item.transportGoes}
      transportComes={item.transportComes}
      returnTrip={item.returnTrip}
      returnTime={item.returnTime}
      status={item.status}
      specialRequirements={item.specialRequirements}
      image={{uri: item.companyImageUrl || 'https://via.placeholder.com/50'}}
      onPress={() => console.log(`Pressed on post: ${item.id}`)}
      onContactPress={handleContactPress}
    />
  );

  const renderHeader = () => (
    <View>
      <View style={styles.createSliderContainer}>
        <Swiper
          style={styles.wrapper}
          autoplay={true}
          autoplayTimeout={8}
          showsPagination={true}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}>
          <Image
            source={require('../../assets/images/1.png')}
            style={styles.bannerImage}
          />
          {/* <View style={styles.bannerContainer}>
            <Video
              source={require('../../assets/intro.mp4')} // Đường dẫn đến video cục bộ
              style={styles.youtubeVideo} // Định dạng kích thước video
              resizeMode="cover"
              controls={false} // Không hiển thị các điều khiển
              repeat={true} // Video sẽ tự động phát lại
              muted={true} // Tắt tiếng
              playInBackground={false} // Không phát khi ứng dụng chạy nền
              playWhenInactive={false} // Không phát khi màn hình tắt
            />
          </View> */}
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
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'all' && styles.activeFilterButton,
          ]}
          onPress={() => handleFilterChange('all')}>
          <Archive size="24" color={filter === 'all' ? '#FFFFFF' : '#555'} />
          <Text
            style={[
              styles.filterText,
              filter === 'all' && styles.activeFilterText,
            ]}
            numberOfLines={1}>
            Tất cả tin
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'lookingForTransport' && styles.activeFilterButton,
          ]}
          onPress={() => handleFilterChange('lookingForTransport')}>
          <TruckFast
            size="24"
            color={filter === 'lookingForTransport' ? '#FFFFFF' : '#555'}
          />
          <Text
            style={[
              styles.filterText,
              filter === 'lookingForTransport' && styles.activeFilterText,
            ]}
            numberOfLines={1}>
            Tìm vận chuyển
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'offeringTransport' && styles.activeFilterButton,
          ]}
          onPress={() => handleFilterChange('offeringTransport')}>
          <Truck
            size="24"
            color={filter === 'offeringTransport' ? '#FFFFFF' : '#555'}
          />
          <Text
            style={[
              styles.filterText,
              filter === 'offeringTransport' && styles.activeFilterText,
            ]}
            numberOfLines={1}>
            Nhà vận chuyển
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}></View>
      ) : (
        <FlatList
          data={filteredPosts}
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
        />
      )}
      <LoadingSpinner loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ddd',
    marginHorizontal: 5,
    marginTop: 5,
  },
  filterButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 50,
  },
  activeFilterButton: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    color: '#555',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
  activeFilterText: {
    color: '#fff',
  },
  postList: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  bannerContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10, // Bo góc
    overflow: 'hidden',
  },
  youtubeVideo: {
    height: 220, // Chiều cao cố định cho video YouTube
    width: '100%',
    borderRadius: 20,
  },
});

export default HomeScreen;

// import React, {useEffect, useState, useCallback} from 'react';
// import {
//   View,
//   StyleSheet,
//   FlatList,
//   Text,
//   Image,
//   TouchableOpacity,
//   RefreshControl,
//   Alert,
// } from 'react-native';
// import Swiper from 'react-native-swiper';
// import PostItem from '../../components/items/PostItem';
// import {Box, TruckFast, Truck, Archive} from 'iconsax-react-native';
// import Colors from '../../constants/colors';
// import {NavigationProp, useNavigation} from '@react-navigation/native';
// import {getAllPosts} from '../../apis/services/postService';
// import {Post} from '../../models/postModel';
// import {createChat} from '../../apis/services/chatService';
// import LoadingSpinner from '../../components/loading/LoadingSpinner';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {getUserInfo} from '../../apis/services/userService';
// import RootStackParamList from '../../navigations/RootStackParamList';
// import {useAnimatedValue} from '../../hooks/useAnimatedValue';
// import Video from 'react-native-video';

// const HomeScreen = () => {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [filter, setFilter] = useState<string>('all');
//   const [loading, setLoading] = useState<boolean>(true);
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const animatedValue = useAnimatedValue(0);

//   // Fetch current user info
//   const fetchCurrentUser = async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       if (token) {
//         const userInfo = await getUserInfo(token);
//         setCurrentUser(userInfo);
//       }
//     } catch (error) {
//       // console.error('Error fetching current user:', error);
//     }
//   };

//   // Fetch posts
//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const postsData = await getAllPosts();
//       setPosts(postsData);
//       applyFilter(filter, postsData);
//     } catch (error) {
//       // console.error('Error fetching posts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCurrentUser(); // Lấy thông tin người dùng khi màn hình được tải
//     fetchPosts();
//   }, []);

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await fetchPosts();
//     setRefreshing(false);
//   }, []);

//   const applyFilter = (filter: string, posts: Post[]) => {
//     let filtered = [...posts];
//     switch (filter) {
//       case 'lookingForTransport':
//         filtered = posts.filter(
//           post => post.postType === 'LookingForTransport',
//         );
//         break;
//       case 'offeringTransport':
//         filtered = posts.filter(post => post.postType === 'OfferingTransport');
//         break;
//       default:
//         filtered = posts;
//         break;
//     }
//     setFilteredPosts(filtered);
//   };

//   const handleContactPress = async (postId: string, receiverId: string) => {
//     if (currentUser && currentUser.id === receiverId) {
//       Alert.alert(
//         'Đây là bài viết của bạn',
//         'Bạn không thể liên hệ với chính mình.',
//       );
//       return;
//     }

//     try {
//       await createChat({postId, receiverId});
//       Alert.alert('Thành công', 'Liên hệ thành công.');
//       navigation.navigate('Message');
//     } catch (error) {
//       Alert.alert(
//         'Bạn chưa đăng nhập',
//         'Vui lòng đăng nhập để sử dụng dịch vụ ',
//       );
//     }
//   };

//   const handleFilterChange = (filter: string) => {
//     setFilter(filter);
//     applyFilter(filter, posts);
//   };

//   const renderItem = ({item}: {item: Post}) => (
//     <PostItem
//       postId={item.id}
//       createdAt={item.createdAt}
//       receiverId={item.userId}
//       postType={item.postType}
//       companyName={item.companyName}
//       cargoTypeRequest={item.cargoTypeRequest}
//       hasVehicle={item.hasVehicle}
//       cargoType={item.cargoType}
//       cargoWeight={item.cargoWeight}
//       cargoVolume={item.cargoVolume}
//       requiredVehicleType={item.requiredVehicleType}
//       vehicleType={item.vehicleType}
//       maxWeight={item.vehicleCapacity}
//       availableWeight={item.availableWeight}
//       pricePerUnit={item.pricePerUnit}
//       origin={item.origin}
//       destination={item.destination}
//       transportGoes={item.transportGoes}
//       transportComes={item.transportComes}
//       returnTrip={item.returnTrip}
//       returnTime={item.returnTime}
//       status={item.status}
//       specialRequirements={item.specialRequirements}
//       image={{uri: item.companyImageUrl || 'https://via.placeholder.com/50'}}
//       onPress={() => console.log(`Pressed on post: ${item.id}`)}
//       onContactPress={handleContactPress}
//     />
//   );

//   const renderHeader = () => (
//     <View>
//       <View style={styles.createSliderContainer}>
//         <Swiper
//           style={styles.wrapper}
//           autoplay={true}
//           autoplayTimeout={4}
//           showsPagination={true}
//           dotStyle={styles.dot}
//           activeDotStyle={styles.activeDot}>
//           <View style={styles.bannerContainer}>
//             <Video
//               source={require('../../assets/intro.mp4')} // Đường dẫn đến video cục bộ
//               style={styles.youtubeVideo} // Định dạng kích thước video
//               resizeMode="cover"
//               controls={false} // Không hiển thị các điều khiển
//               repeat={true} // Video sẽ tự động phát lại
//               muted={true} // Tắt tiếng
//               playInBackground={false} // Không phát khi ứng dụng chạy nền
//               playWhenInactive={false} // Không phát khi màn hình tắt
//             />
//           </View>
//           {/* <Image
//             source={require('../../assets/images/1.png')}
//             style={styles.bannerImage}
//           />
//           <Image
//             source={require('../../assets/images/2.png')}
//             style={styles.bannerImage}
//           />
//           <Image
//             source={require('../../assets/images/3.png')}
//             style={styles.bannerImage}
//           /> */}
//         </Swiper>
//       </View>
//       <View style={styles.filterContainer}>
//         <TouchableOpacity
//           style={[
//             styles.filterButton,
//             filter === 'all' && styles.activeFilterButton,
//           ]}
//           onPress={() => handleFilterChange('all')}>
//           <Archive size="24" color={filter === 'all' ? '#FFFFFF' : '#555'} />
//           <Text
//             style={[
//               styles.filterText,
//               filter === 'all' && styles.activeFilterText,
//             ]}
//             numberOfLines={1}>
//             Tất cả tin
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.filterButton,
//             filter === 'lookingForTransport' && styles.activeFilterButton,
//           ]}
//           onPress={() => handleFilterChange('lookingForTransport')}>
//           <TruckFast
//             size="24"
//             color={filter === 'lookingForTransport' ? '#FFFFFF' : '#555'}
//           />
//           <Text
//             style={[
//               styles.filterText,
//               filter === 'lookingForTransport' && styles.activeFilterText,
//             ]}
//             numberOfLines={1}>
//             Tìm vận chuyển
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.filterButton,
//             filter === 'offeringTransport' && styles.activeFilterButton,
//           ]}
//           onPress={() => handleFilterChange('offeringTransport')}>
//           <Truck
//             size="24"
//             color={filter === 'offeringTransport' ? '#FFFFFF' : '#555'}
//           />
//           <Text
//             style={[
//               styles.filterText,
//               filter === 'offeringTransport' && styles.activeFilterText,
//             ]}
//             numberOfLines={1}>
//             Nhà vận chuyển
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <View style={styles.loadingContainer}></View>
//       ) : (
//         <FlatList
//           data={filteredPosts}
//           renderItem={renderItem}
//           keyExtractor={item => item.id.toString()}
//           ListHeaderComponent={renderHeader}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//           ListEmptyComponent={
//             <Text style={styles.noDataText}>Không có bài đăng nào</Text>
//           }
//           contentContainerStyle={styles.postList}
//         />
//       )}
//       <LoadingSpinner loading={loading} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   createSliderContainer: {
//     marginHorizontal: 5,
//     marginTop: 5,
//   },
//   wrapper: {
//     height: 220,
//   },
//   bannerImage: {
//     width: '100%',
//     height: 220,
//     resizeMode: 'cover',
//     borderRadius: 10,
//   },
//   dot: {
//     backgroundColor: Colors.background,
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginHorizontal: 4,
//     marginBottom: -15,
//   },
//   activeDot: {
//     backgroundColor: Colors.primary,
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     marginHorizontal: 4,
//     marginBottom: -15,
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginHorizontal: 5,
//     marginTop: 5,
//   },
//   filterButton: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 4,
//     marginHorizontal: 5,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     height: 50,
//   },
//   activeFilterButton: {
//     backgroundColor: Colors.primary,
//   },
//   filterText: {
//     color: '#555',
//     fontSize: 12,
//     fontWeight: '600',
//     marginTop: 5,
//     textAlign: 'center',
//   },
//   activeFilterText: {
//     color: '#fff',
//   },
//   postList: {
//     paddingBottom: 20,
//     flexGrow: 1,
//   },
//   noDataText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//     color: '#888',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//   },
//   bannerContainer: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10, // Bo góc
//     overflow: 'hidden',
//   },
//   youtubeVideo: {
//     height: 220, // Chiều cao cố định cho video YouTube
//     width: '100%',
//     borderRadius: 20,
//   },
// });

// export default HomeScreen;
