import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  FlatList,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
} from 'react-native';
import MapView, {UrlTile, LatLng, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {Add, Gps} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import GradientButton from '../../components/button/GradientButton';

const HERE_API_KEY = '0iK9NH7BKY8yWYhFjJIUHk4UQHcGjZ6NxvdFizl4rwc';

const MapScreen: React.FC = ({route}: any) => {
  const {field} = route.params;
  const [location, setLocation] = useState<LatLng | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation();

  // Request location permission
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert(
            'Quyền truy cập bị từ chối',
            'Cần quyền truy cập vị trí để sử dụng chức năng này',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      Geolocation.requestAuthorization('whenInUse').then(status => {
        if (status === 'granted') {
          getCurrentLocation();
        } else {
          Alert.alert(
            'Quyền truy cập bị từ chối',
            'Cần quyền truy cập vị trí để sử dụng chức năng này',
          );
        }
      });
    }
  };

  // Get the current location of the user
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const newLocation = {latitude, longitude};
        setLocation(newLocation);
        getPlaceName(latitude, longitude);
        mapRef.current?.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        });
      },
      error => {
        Alert.alert('Lỗi', `Không thể lấy vị trí hiện tại: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
      },
    );
  };

  // Get place name using reverse geocoding
  const getPlaceName = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=vi-VN&apikey=${HERE_API_KEY}`,
      );
      if (response.data.items && response.data.items.length > 0) {
        const address = response.data.items[0].address;
        setLocationName(address.label);
      } else {
        setLocationName('Không tìm thấy địa chỉ');
      }
    } catch (error) {
      setLocationName('Không thể lấy tên địa điểm');
    }
  };

  // Fetch suggestions based on query and current location
  const fetchSuggestions = async (query: string) => {
    if (!query || !location) {
      setSuggestions([]);
      return;
    }

    try {
      const {latitude, longitude} = location;

      const response = await axios.get(
        `https://autosuggest.search.hereapi.com/v1/autosuggest`,
        {
          params: {
            q: query,
            lang: 'vi-VN',
            at: `${latitude},${longitude}`,
            apikey: HERE_API_KEY,
          },
        },
      );

      if (response.data.items) {
        setSuggestions(response.data.items);
      } else {
        Alert.alert('Không có gợi ý', 'Không tìm thấy gợi ý cho từ khóa này.');
      }
    } catch (error) {
      Alert.alert('Lỗi khi lấy gợi ý');
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const handleSuggestionSelect = (suggestion: any) => {
    if (suggestion.position && suggestion.address) {
      const {lat, lng} = suggestion.position;
      const newLocation = {latitude: lat, longitude: lng};
      setLocation(newLocation);
      setLocationName(suggestion.address.label || 'Không có tên địa chỉ');
      setSuggestions([]);
      mapRef.current?.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      Alert.alert('Lỗi', 'Không thể lấy thông tin vị trí đầy đủ');
    }
  };

  const onRegionChangeComplete = (region: any) => {
    const {latitude, longitude} = region;
    setLocation({latitude, longitude});
    getPlaceName(latitude, longitude);
  };

  const handleConfirm = () => {
    if (!locationName || !location) {
      Alert.alert('Chưa chọn vị trí', 'Vui lòng chọn vị trí trên bản đồ.');
      return;
    }

    // Log dữ liệu trước khi truyền về `UserEdit`
    // console.log('Truyền địa chỉ về UserEdit:', {
    //   selectedLocation: {field, locationName},
    //   userInfo: route.params?.userInfo,
    // });

    // Truyền địa chỉ và thông tin người dùng về UserEdit
    navigation.navigate('UserEdit', {
      selectedLocation: {field, locationName}, // Truyền địa chỉ mới
      userInfo: route.params?.userInfo, // Truyền lại userInfo để cập nhật chính xác
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude || 21.028511,
          longitude: location?.longitude || 105.804817,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={onRegionChangeComplete}
        showsUserLocation={true}
        showsMyLocationButton={false}>
        <UrlTile
          urlTemplate={`https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey=${HERE_API_KEY}&lg=vie`}
          maximumZ={19}
          flipY={false}
        />
        {location && <Marker coordinate={location} />}
      </MapView>
      <View style={styles.centerMarkerContainer}>
        <Add size={30} color="#110088" variant="Broken" />
      </View>
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Nhập tên địa điểm"
            value={searchQuery}
            onChangeText={text => {
              setSearchQuery(text);
              fetchSuggestions(text);
            }}
          />
          <TouchableOpacity
            style={styles.locationButton}
            onPress={getCurrentLocation}>
            <Gps size={24} color="#110088" variant="Broken" />
          </TouchableOpacity>
        </View>
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSuggestionSelect(item)}>
                <Text>{item.address?.label || 'Không có tên địa chỉ'}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsList}
          />
        )}
      </SafeAreaView>
      <View style={styles.infoContainer}>
        {location ? (
          <Text style={styles.infoText}>
            Địa chỉ: {locationName || 'Đang lấy tên địa điểm...'}
          </Text>
        ) : (
          <Text style={styles.infoText}>Kéo bản đồ để chọn vị trí</Text>
        )}
      </View>
      <View style={styles.confirmButton}>
        <GradientButton title="Xác Nhận" onPress={handleConfirm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centerMarkerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
    marginTop: '-16%',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    paddingLeft: 10,
    borderRadius: 5,
  },
  locationButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginLeft: 10,
  },
  suggestionsList: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    maxHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 5,
    zIndex: 20,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  confirmButton: {
    padding: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapScreen;
