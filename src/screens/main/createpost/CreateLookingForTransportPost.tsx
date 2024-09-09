import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {TextInput, Card, Text} from 'react-native-paper';
import GradientButton from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {createPost} from '../../../apis/services/postService';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../components/toast/ToastAuth';
import BlurredToast from '../../../components/toast/BlurredToast';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

// Định nghĩa kiểu dữ liệu cho formData
interface FormData {
  postType: 'LookingForTransport';
  status: 'Active' | 'Completed'; // Sửa kiểu status để phù hợp
  origin: string;
  destination: string;
  transportTime: Date;
  requiredVehicleType: string;
  cargoTypeRequest: string;
}

const CreateLookingForTransportPost = ({route, navigation}: any) => {
  const [isToastVisible, setIsToastVisible] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    postType: 'LookingForTransport',
    status: 'Active',
    origin: '',
    destination: '',
    transportTime: new Date(),
    requiredVehicleType: '',
    cargoTypeRequest: '',
  });
  const [showTransportTimePicker, setShowTransportTimePicker] = useState(false);

  // State cho lỗi
  const [errors, setErrors] = useState<{[key in keyof FormData]?: string}>({});

  const [openVehicleType, setOpenVehicleType] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([
    {label: 'Xe tải', value: 'Xe tải'},
    {label: 'Xe container', value: 'Xe container'},
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

    if (!formData.requiredVehicleType) {
      newErrors.requiredVehicleType = 'Vui lòng chọn loại xe yêu cầu';
      valid = false;
    }

    if (!formData.cargoTypeRequest) {
      newErrors.cargoTypeRequest = 'Vui lòng nhập loại hàng hóa yêu cầu';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (name: keyof FormData, value: any) => {
    setFormData(prevData => ({...prevData, [name]: value}));
    // Xóa lỗi khi người dùng nhập lại
    setErrors(prevErrors => ({...prevErrors, [name]: undefined}));
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await createPost(formData); // Giả sử createPost là hàm tạo bài đăng
        // Hiển thị toast thành công
        Toast.show({
          type: 'success',
          text1: 'Tạo bài đăng thành công',
          position: 'top',
          topOffset: 300,
          autoHide: true,
          visibilityTime: 3000,
          onHide: () => {
            navigation.goBack();
          },
        });
        setIsToastVisible(true);
      } catch (error) {
        // Hiển thị lỗi khi có vấn đề trong quá trình tạo bài đăng
        Toast.show({
          type: 'error',
          text1: 'Lỗi khi tạo bài đăng',
          position: 'top',
          topOffset: 300,
          autoHide: true,
          visibilityTime: 3000,
          onHide: () => setIsToastVisible(false),
        });
        setIsToastVisible(true);
      }
    } else {
      // Hiển thị lỗi khi form không hợp lệ
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

          <DropDownPicker
            open={openVehicleType}
            value={formData.requiredVehicleType}
            items={vehicleTypes}
            setOpen={setOpenVehicleType}
            setValue={callback =>
              handleChange(
                'requiredVehicleType',
                callback(formData.requiredVehicleType),
              )
            }
            setItems={setVehicleTypes}
            placeholder="Chọn loại xe"
            style={[
              styles.dropdown,
              errors.requiredVehicleType ? {borderColor: 'red'} : {},
            ]}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={{fontSize: 16}}
            searchable={true}
            searchPlaceholder="Tìm hoặc nhập loại xe..."
            onChangeSearchText={text => {
              if (!vehicleTypes.some(item => item.value === text)) {
                setVehicleTypes(prev => [...prev, {label: text, value: text}]);
              }
            }}
            onChangeValue={value => handleChange('requiredVehicleType', value)}
          />
          {errors.requiredVehicleType && (
            <Text style={styles.errorText}>{errors.requiredVehicleType}</Text>
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
          <TextInput
            label="Loại hàng hóa yêu cầu"
            mode="outlined"
            value={formData.cargoTypeRequest}
            onChangeText={text => handleChange('cargoTypeRequest', text)}
            style={styles.input}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
            error={!!errors.cargoTypeRequest}
          />
          {errors.cargoTypeRequest && (
            <Text style={styles.errorText}>{errors.cargoTypeRequest}</Text>
          )}
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

export default CreateLookingForTransportPost;
