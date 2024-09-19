import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {Post} from '../../models/postModel';
import PostItem from '../../components/items/PostItem';
import {getAllPosts} from '../../apis/services/postService';
import OutlineButton from '../../components/button/post/OutlineButton';
import Colors from '../../constants/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {createChat} from '../../apis/services/chatService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserInfo} from '../../apis/services/userService';
import RootStackParamList from '../../navigations/RootStackParamList';

const AdvancedFilterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [postType, setPostType] = useState<string>('all');
  const [selectedVehicleType, setSelectedVehicleType] = useState<string | null>(
    null,
  );
  const [cargoType, setCargoType] = useState<string | null>(null);
  const [cargoWeight, setCargoWeight] = useState<string | null>(null);
  const [vehicleCapacity, setVehicleCapacity] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

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

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Fetch all posts from the server
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getAllPosts();
        setPosts(postsData);
        setFilteredPosts(postsData); // Set all posts initially
      } catch (error) {
        // console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Function to apply filters based on post type and additional criteria
  const applyFilters = () => {
    let filtered = posts.filter(post => {
      // Chuyển cả postType và filter thành chữ thường để so sánh không phân biệt chữ hoa/thường
      let typeMatch =
        postType === 'all' ||
        post.postType.toLowerCase() === postType.toLowerCase();

      // Chuyển chuỗi nhập vào và dữ liệu thành chữ thường để so sánh
      let cargoMatch =
        postType === 'LookingForTransport'
          ? (!cargoType ||
              post.cargoTypeRequest
                ?.toLowerCase()
                .includes(cargoType.toLowerCase())) &&
            (!selectedVehicleType ||
              post.requiredVehicleType
                ?.toLowerCase()
                .includes(selectedVehicleType.toLowerCase())) &&
            (!cargoWeight ||
              post.cargoWeight
                ?.toLowerCase()
                .includes(cargoWeight.toLowerCase()))
          : true;

      let vehicleMatch =
        postType === 'OfferingTransport'
          ? (!selectedVehicleType ||
              post.vehicleType
                ?.toLowerCase()
                .includes(selectedVehicleType.toLowerCase())) &&
            (!vehicleCapacity ||
              post.vehicleCapacity
                ?.toLowerCase()
                .includes(vehicleCapacity.toLowerCase()))
          : true;

      return typeMatch && cargoMatch && vehicleMatch;
    });

    setFilteredPosts(filtered);
  };

  // Handle contact press
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}>
      {/* Post Type Filter */}
      <View style={styles.filterGroup}>
        <Text style={styles.filterLabel}>Lọc theo loại bài đăng:</Text>
        <View style={styles.filterOptions}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              postType === 'all' && styles.activeButton,
            ]}
            onPress={() => setPostType('all')}>
            <Text style={styles.filterText}>Tất cả</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              postType === 'LookingForTransport' && styles.activeButton,
            ]}
            onPress={() => setPostType('LookingForTransport')}>
            <Text style={styles.filterText}>Tìm vận chuyển</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              postType === 'OfferingTransport' && styles.activeButton,
            ]}
            onPress={() => setPostType('OfferingTransport')}>
            <Text style={styles.filterText}>Cung cấp vận chuyển</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Detail Filters Based on Post Type */}
      {postType === 'LookingForTransport' && (
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Lọc chi tiết (Tìm vận chuyển):</Text>
          {/* Vehicle Type Filter */}
          <TextInput
            style={styles.input}
            placeholder="Nhập loại xe"
            value={selectedVehicleType}
            onChangeText={setSelectedVehicleType}
          />
          <TextInput
            style={styles.input}
            placeholder="Nhập loại hàng hóa"
            value={cargoType}
            onChangeText={setCargoType}
          />
          {/* Cargo Weight Input */}
          <TextInput
            style={styles.input}
            placeholder="Nhập khối lượng hàng hóa"
            value={cargoWeight}
            onChangeText={setCargoWeight}
            keyboardType="numeric"
          />
        </View>
      )}

      {postType === 'OfferingTransport' && (
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>
            Lọc chi tiết (Cung cấp vận chuyển):
          </Text>
          {/* Vehicle Type Input */}
          <TextInput
            style={styles.input}
            placeholder="Nhập loại xe"
            value={selectedVehicleType}
            onChangeText={setSelectedVehicleType}
          />
          {/* Cargo Type Input */}
          <TextInput
            style={styles.input}
            placeholder="Nhập loại hàng hóa"
            value={cargoType}
            onChangeText={setCargoType}
          />
          {/* Vehicle Capacity Input */}
          <TextInput
            style={styles.input}
            placeholder="Nhập sức chứa của xe"
            value={vehicleCapacity}
            onChangeText={setVehicleCapacity}
            keyboardType="numeric"
          />
        </View>
      )}
      <View style={styles.button}>
        <OutlineButton onPress={applyFilters} title="Áp dụng bộ lọc" />
      </View>
      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
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
            image={{
              uri: item.companyImageUrl || 'https://via.placeholder.com/50',
            }}
            onContactPress={() => handleContactPress(item.id, item.userId)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.noDataText}>Không có bài đăng phù hợp</Text>
        }
        scrollEnabled={false} // Disable FlatList scroll to allow ScrollView to handle scrolling
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    padding: 10,
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  applyButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});

export default AdvancedFilterScreen;
