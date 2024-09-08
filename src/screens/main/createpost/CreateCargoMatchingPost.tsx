import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Switch} from 'react-native';
import {TextInput, Card} from 'react-native-paper';
import GradientButton from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {createPost} from '../../../apis/services/postService';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateCargoMatchingPost = () => {
  const [formData, setFormData] = useState({
    postType: 'CargoMatching',
    status: 'Active',
    origin: '',
    destination: '',
    transportTime: new Date(),
    hasVehicle: false,
    cargoType: '',
    cargoWeight: 0,
    cargoVolume: 0,
    specialRequirements: '',
  });
  const [showTransportTimePicker, setShowTransportTimePicker] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData(prevData => ({...prevData, [name]: value}));
  };

  const handleSubmit = async () => {
    try {
      await createPost(formData);
      Toast.show({
        type: 'success',
        text1: 'Tạo bài đăng thành công',
        position: 'top',
        topOffset: 300,
        autoHide: true,
        visibilityTime: 3000,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi khi tạo bài đăng',
        position: 'top',
        topOffset: 300,
        autoHide: true,
        visibilityTime: 3000,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Nơi bắt đầu"
            mode="outlined"
            value={formData.origin}
            onChangeText={text => handleChange('origin', text)}
            style={styles.input}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
          />
          <TextInput
            label="Nơi kết thúc"
            mode="outlined"
            value={formData.destination}
            onChangeText={text => handleChange('destination', text)}
            style={styles.input}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
          />
          <View>
            <TextInput
              label="Thời gian vận chuyển"
              mode="outlined"
              value={formData.transportTime.toLocaleDateString()}
              style={styles.input}
              outlineColor={Colors.bordercolor}
              activeOutlineColor={Colors.primary}
              onFocus={() => setShowTransportTimePicker(true)}
            />
            {showTransportTimePicker && (
              <DateTimePicker
                value={formData.transportTime}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowTransportTimePicker(false);
                  if (selectedDate) {
                    handleChange('transportTime', selectedDate);
                  }
                }}
              />
            )}
          </View>
          <View style={styles.switchContainer}>
            <TextInput
              label="Có xe không"
              mode="outlined"
              editable={false}
              value={formData.hasVehicle ? 'Đã có' : 'Chưa có'}
              style={styles.input}
              outlineColor={Colors.bordercolor}
              activeOutlineColor={Colors.primary}
            />
            <Switch
              value={formData.hasVehicle}
              onValueChange={value => handleChange('hasVehicle', value)}
            />
          </View>
          <TextInput
            label="Loại hàng hóa"
            mode="outlined"
            value={formData.cargoType}
            onChangeText={text => handleChange('cargoType', text)}
            style={styles.input}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
          />
          <TextInput
            label="Khối lượng hàng hóa"
            mode="outlined"
            keyboardType="numeric"
            value={String(formData.cargoWeight)}
            onChangeText={text =>
              handleChange('cargoWeight', parseFloat(text) || 0)
            }
            style={styles.input}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
          />
          <TextInput
            label="Thể tích hàng hóa"
            mode="outlined"
            keyboardType="numeric"
            value={String(formData.cargoVolume)}
            onChangeText={text =>
              handleChange('cargoVolume', parseFloat(text) || 0)
            }
            style={styles.input}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
          />
          <TextInput
            label="Yêu cầu đặc biệt"
            mode="outlined"
            value={formData.specialRequirements}
            onChangeText={text => handleChange('specialRequirements', text)}
            style={styles.input}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
          />
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <GradientButton title="Tạo Bài Đăng" onPress={handleSubmit} />
        </Card.Actions>
      </Card>
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 5,
    backgroundColor: Colors.background,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  cardActions: {
    justifyContent: 'center',
    marginTop: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default CreateCargoMatchingPost;
