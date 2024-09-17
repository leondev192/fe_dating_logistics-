import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Alert} from 'react-native';
import {TextInput, Card, Text, Divider} from 'react-native-paper';
import ImageUploader from '../../components/image/ImageUploader';
import {updateUser} from '../../apis/services/userService';
import GradientButton from '../../components/button/GradientButton';
import Colors from '../../constants/colors';

const UserEdit = ({route, navigation}: any) => {
  const userInfo = route.params?.userInfo;

  if (!userInfo) {
    console.error('User info is missing from route params.');
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
    taxCode: userInfo.taxCode || '',
    representativeName: userInfo.representativeName || '',
    representativeUrl: userInfo.representativeUrl || '',
    profilePictureUrl: userInfo.profilePictureUrl || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setUser(prevState => ({...prevState, [field]: value}));
  };

  const handleImageUpload = (field: string) => (url: string) => {
    setUser(prevState => ({...prevState, [field]: url}));
  };

  const handleUpdate = async () => {
    try {
      await updateUser(user);

      // Hiển thị thông báo thành công và sau đó điều hướng quay lại
      Alert.alert('Thành công', 'Cập nhật thông tin thành công', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      // Hiển thị thông báo lỗi khi cập nhật thất bại
      Alert.alert('Lỗi', 'Cập nhật thông tin thất bại', [{text: 'OK'}]);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <Card style={styles.card}>
        <Card.Content>
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
          <TextInput
            label="Địa chỉ"
            mode="outlined"
            value={user.address}
            onChangeText={value => handleInputChange('address', value)}
            style={styles.input}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
          />
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
            onChangeText={value =>
              handleInputChange('representativeName', value)
            }
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
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <GradientButton title="Lưu thông tin" onPress={handleUpdate} />
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.background,
    elevation: 3,
  },
  divider: {
    marginVertical: 10,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.text,
    fontWeight: '600',
  },
  cardActions: {
    justifyContent: 'center',
    marginTop: 15,
  },
});

export default UserEdit;
