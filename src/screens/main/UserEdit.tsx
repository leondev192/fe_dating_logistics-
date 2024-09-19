import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import {TextInput, Divider} from 'react-native-paper';
import ImageUploader from '../../components/image/ImageUploader';
import {updateUser} from '../../apis/services/userService';
import GradientButton from '../../components/button/GradientButton';
import Colors from '../../constants/colors';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const UserEdit = ({route, navigation}: any) => {
  const userInfo = route.params?.userInfo;

  if (!userInfo) {
    return (
      <Text style={{textAlign: 'center', marginTop: 20}}>
        Lỗi: Không có thông tin người dùng.
      </Text>
    );
  }

  const [user, setUser] = useState({
    phone: userInfo.phone || '',
    companyName: userInfo.companyName || '',
    address: userInfo.address || '',
    businessCode: userInfo.businessCode || '',
    representativeName: userInfo.representativeName || '',
    representativeUrl: userInfo.representativeUrl || '',
    profilePictureUrl: userInfo.profilePictureUrl || '',
  });

  const handleInputChange = (field: string, value: string) => {
    // console.log(`Cập nhật field ${field}:`, value); // Log để kiểm tra giá trị
    setUser(prevState => ({...prevState, [field]: value}));
  };

  const handleImageUpload = (field: string) => (url: string) => {
    setUser(prevState => ({...prevState, [field]: url}));
  };

  const handleUpdate = async () => {
    try {
      await updateUser(user);
      Alert.alert('Thành công', 'Cập nhật thông tin thành công', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Lỗi', 'Cập nhật thông tin thất bại', [{text: 'OK'}]);
    }
  };

  // Điều hướng đến bản đồ
  const navigateToMap = () => {
    navigation.navigate('LocationUserEdit', {
      field: 'address',
      userInfo: user, // Truyền lại thông tin người dùng
    });
  };

  useEffect(() => {
    if (route.params?.selectedLocation) {
      const {field, locationName} = route.params.selectedLocation;
      // console.log('Nhận selectedLocation:', {field, locationName});
      if (field === 'address') {
        handleInputChange('address', locationName);
      }
      navigation.setParams({selectedLocation: null});
    }
  }, [route.params?.selectedLocation]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <TextInput
          label="Số điện thoại"
          mode="outlined"
          value={user.phone}
          onChangeText={value => handleInputChange('phone', value)}
          style={styles.input}
          outlineColor={Colors.bordercolor}
          activeOutlineColor={Colors.primary}
        />
        <TextInput
          label="Tên công ty"
          mode="outlined"
          value={user.companyName}
          onChangeText={value => handleInputChange('companyName', value)}
          style={styles.input}
          outlineColor={Colors.bordercolor}
          activeOutlineColor={Colors.primary}
        />
        <TouchableOpacity onPress={navigateToMap} style={styles.inputContainer}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {user.address || 'Chọn địa chỉ từ bản đồ'}
          </Text>
        </TouchableOpacity>

        <TextInput
          label="Mã kinh doanh"
          mode="outlined"
          value={user.businessCode}
          onChangeText={value => handleInputChange('businessCode', value)}
          style={styles.input}
          outlineColor={Colors.bordercolor}
          activeOutlineColor={Colors.primary}
        />

        <TextInput
          label="Tên người đại diện"
          mode="outlined"
          value={user.representativeName}
          onChangeText={value => handleInputChange('representativeName', value)}
          style={styles.input}
          outlineColor={Colors.bordercolor}
          activeOutlineColor={Colors.primary}
        />

        <Text style={styles.label}>Ảnh đại diện:</Text>
        <ImageUploader
          onImageUpload={handleImageUpload('profilePictureUrl')}
          currentImageUrl={user.profilePictureUrl}
        />

        <Divider style={styles.divider} />
        <Text style={styles.label}>Ảnh CCCD:</Text>
        <ImageUploader
          onImageUpload={handleImageUpload('representativeUrl')}
          currentImageUrl={user.representativeUrl}
        />
      </View>
      <View style={styles.actions}>
        <GradientButton title="Lưu thông tin" onPress={handleUpdate} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 15,
  },
  content: {
    backgroundColor: Colors.background,
  },
  divider: {
    marginVertical: 10,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderColor: Colors.bordercolor,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.text,
    fontWeight: '600',
  },
  actions: {
    justifyContent: 'center',
    marginTop: 15,
  },
});

export default UserEdit;
