import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {TextInput, Card, RadioButton, Text} from 'react-native-paper';
import GradientButton from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../components/toast/ToastAuth';
import BlurredToast from '../../../components/toast/BlurredToast';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

// Định nghĩa kiểu dữ liệu cho formData
interface FormData {
  postType: 'CargoMatching';
  status: 'Active' | 'Completed'; // Sửa kiểu status để phù hợp
  origin: string;
  destination: string;
  transportTime: Date;
  hasVehicle: boolean;
  cargoType: string;
  cargoWeight: number;
  cargoVolume: number;
  specialRequirements: string;
}

const CreateCargoMatchingPost = ({route, navigation}: any) => {
  const [formData, setFormData] = useState<FormData>({
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
  const [errors, setErrors] = useState<{[key in keyof FormData]?: string}>({});
  const [openCargoType, setOpenCargoType] = useState(false);
  const [cargoTypes, setCargoTypes] = useState([
    {label: 'Hàng khô', value: 'Hàng khô'},
    {label: 'Hàng đông lạnh', value: 'Hàng đông lạnh'},
  ]);

  // Hàm kiểm tra tính hợp lệ của form
  const validateForm = () => {
    let valid = true;
    const newErrors: {[key in keyof FormData]?: string} = {};

    // Kiểm tra từng trường và cập nhật lỗi nếu có
    if (!formData.origin) {
      newErrors.origin = 'Vui lòng nhập nơi bắt đầu';
      valid = false;
    }

    if (!formData.destination) {
      newErrors.destination = 'Vui lòng nhập nơi kết thúc';
      valid = false;
    }

    if (!formData.cargoType) {
      newErrors.cargoType = 'Vui lòng nhập loại hàng hóa';
      valid = false;
    }

    if (formData.cargoWeight <= 0) {
      newErrors.cargoWeight = 'Khối lượng hàng hóa phải lớn hơn 0';
      valid = false;
    }

    if (formData.cargoVolume <= 0) {
      newErrors.cargoVolume = 'Thể tích hàng hóa phải lớn hơn 0';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (name: keyof FormData, value: any) => {
    setFormData(prevData => ({...prevData, [name]: value}));
    setErrors(prevErrors => ({...prevErrors, [name]: undefined}));
  };
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleSubmit = () => {
    if (validateForm()) {
      // Chuyển đổi transportTime sang chuỗi ISO trước khi điều hướng
      const formDataToSend = {
        ...formData,
        transportTime: formData.transportTime.toISOString(),
      };
      navigation.navigate('PaymentScreen', {formData: formDataToSend});
    } else {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng điền đầy đủ thông tin',
        position: 'top',
        topOffset: 300,
        autoHide: true,
        visibilityTime: 3000,
        onHide: () => setIsToastVisible(false),
      });
      setIsToastVisible(true);
    }
  };

  const renderFormFields = () => {
    return (
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
            error={!!errors.origin}
          />
          {errors.origin && (
            <Text style={styles.errorText}>{errors.origin}</Text>
          )}

          <TextInput
            label="Nơi kết thúc"
            mode="outlined"
            value={formData.destination}
            onChangeText={text => handleChange('destination', text)}
            style={styles.input}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
            error={!!errors.destination}
          />
          {errors.destination && (
            <Text style={styles.errorText}>{errors.destination}</Text>
          )}

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

          <DropDownPicker
            open={openCargoType}
            value={formData.cargoType}
            items={cargoTypes}
            setOpen={setOpenCargoType}
            setValue={callback =>
              handleChange('cargoType', callback(formData.cargoType))
            }
            setItems={setCargoTypes}
            placeholder="Chọn loại hàng hóa"
            style={[
              styles.dropdown,
              errors.cargoType ? {borderColor: 'red'} : {},
            ]}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={{fontSize: 16}}
            searchable={true}
            searchPlaceholder="Tìm hoặc nhập loại hàng hóa..."
            onChangeSearchText={text => {
              if (!cargoTypes.some(item => item.value === text)) {
                setCargoTypes(prev => [...prev, {label: text, value: text}]);
              }
            }}
            onChangeValue={value => handleChange('cargoType', value)}
          />
          {errors.cargoType && (
            <Text style={styles.errorText}>{errors.cargoType}</Text>
          )}

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
            error={!!errors.cargoWeight}
          />
          {errors.cargoWeight && (
            <Text style={styles.errorText}>{errors.cargoWeight}</Text>
          )}

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
            error={!!errors.cargoVolume}
          />
          {errors.cargoVolume && (
            <Text style={styles.errorText}>{errors.cargoVolume}</Text>
          )}

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
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[{key: 'form'}]}
        renderItem={renderFormFields}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.container}
      />
      <BlurredToast config={toastConfig} />
    </View>
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
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
  cardActions: {
    justifyContent: 'center',
    marginTop: 15,
  },
  dropdown: {
    marginBottom: 15,
    borderColor: Colors.bordercolor,
  },
  dropdownContainer: {
    borderColor: Colors.bordercolor,
  },
});

export default CreateCargoMatchingPost;
