import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Switch} from 'react-native';
import {TextInput, Card} from 'react-native-paper';
import GradientButton from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {createPost} from '../../../apis/services/postService';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateOfferingTransportPost = () => {
  const [formData, setFormData] = useState({
    postType: 'OfferingTransport',
    status: 'Active',
    origin: '',
    destination: '',
    transportTime: new Date(),
    returnTrip: false,
    returnTime: new Date(),
    vehicleType: '',
    vehicleCapacity: 0,
    availableWeight: 0,
    pricePerUnit: 0,
    vehicleDetails: '',
  });
  const [showTransportTimePicker, setShowTransportTimePicker] = useState(false);
  const [showReturnTimePicker, setShowReturnTimePicker] = useState(false);

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
              label="Khứ hồi"
              mode="outlined"
              editable={false}
              value={formData.returnTrip ? 'Có' : 'Không'}
              style={styles.input}
              outlineColor={Colors.bordercolor}
              activeOutlineColor={Colors.primary}
            />
            <Switch
              value={formData.returnTrip}
              onValueChange={value => handleChange('returnTrip', value)}
            />
          </View>
          {formData.returnTrip && (
            <View>
              <TextInput
                label="Thời gian trở về"
                mode="outlined"
                value={formData.returnTime.toLocaleDateString()}
                style={styles.input}
                outlineColor={Colors.bordercolor}
                activeOutlineColor={Colors.primary}
                onFocus={() => setShowReturnTimePicker(true)}
              />
              {showReturnTimePicker && (
                <DateTimePicker
                  value={formData.returnTime}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowReturnTimePicker(false);
                    if (selectedDate) {
                      handleChange('returnTime', selectedDate);
                    }
                  }}
                />
              )}
            </View>
          )}
          <TextInput
            label="Loại xe"
            mode="outlined"
            value={formData.vehicleType}
            onChangeText={text => handleChange('vehicleType', text)}
            style={styles.input}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
          />
          <TextInput
            label="Sức chứa xe"
            mode="outlined"
            keyboardType="numeric"
            value={String(formData.vehicleCapacity)}
            onChangeText={text =>
              handleChange('vehicleCapacity', parseFloat(text) || 0)
            }
            style={styles.input}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
          />
          <TextInput
            label="Khối lượng còn lại"
            mode="outlined"
            keyboardType="numeric"
            value={String(formData.availableWeight)}
            onChangeText={text =>
              handleChange('availableWeight', parseFloat(text) || 0)
            }
            style={styles.input}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
          />
          <TextInput
            label="Giá mỗi đơn vị"
            mode="outlined"
            keyboardType="numeric"
            value={String(formData.pricePerUnit)}
            onChangeText={text =>
              handleChange('pricePerUnit', parseFloat(text) || 0)
            }
            style={styles.input}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
          />
          <TextInput
            label="Chi tiết xe"
            mode="outlined"
            value={formData.vehicleDetails}
            onChangeText={text => handleChange('vehicleDetails', text)}
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

export default CreateOfferingTransportPost;
