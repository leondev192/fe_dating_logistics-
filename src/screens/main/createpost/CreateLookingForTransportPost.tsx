import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {TextInput, Card} from 'react-native-paper';
import GradientButton from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {createPost} from '../../../apis/services/postService';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateLookingForTransportPost = () => {
  const [formData, setFormData] = useState({
    postType: 'LookingForTransport',
    status: 'Active',
    origin: '',
    destination: '',
    transportTime: new Date(),
    requiredVehicleType: '',
    cargoTypeRequest: '',
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
          <TextInput
            label="Loại xe yêu cầu"
            mode="outlined"
            value={formData.requiredVehicleType}
            onChangeText={text => handleChange('requiredVehicleType', text)}
            style={styles.input}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
          />
          <TextInput
            label="Loại hàng hóa yêu cầu"
            mode="outlined"
            value={formData.cargoTypeRequest}
            onChangeText={text => handleChange('cargoTypeRequest', text)}
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
});

export default CreateLookingForTransportPost;
