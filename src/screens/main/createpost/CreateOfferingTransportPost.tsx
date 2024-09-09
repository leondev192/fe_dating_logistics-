import React, {useState} from 'react';
import {View, StyleSheet, Switch, FlatList, Alert} from 'react-native'; // Import Alert từ React Native
import {TextInput, Card, Text} from 'react-native-paper';
import GradientButton from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {createPost} from '../../../apis/services/postService';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

// Định nghĩa kiểu dữ liệu cho formData
interface FormData {
  postType: 'OfferingTransport' | 'CargoMatching' | 'LookingForTransport';
  status: 'Active' | 'Completed'; // Sửa status để phù hợp với yêu cầu của API
  origin: string;
  destination: string;
  transportTime: Date;
  returnTrip: boolean;
  returnTime: Date;
  vehicleType: string;
  vehicleCapacity: number;
  availableWeight: number;
  pricePerUnit: number;
  vehicleDetails: string;
}

const CreateOfferingTransportPost = ({route, navigation}: any) => {
  // Khai báo state với kiểu dữ liệu
  const [formData, setFormData] = useState<FormData>({
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

  // State cho lỗi
  const [errors, setErrors] = useState<{[key in keyof FormData]?: string}>({});

  const [showTransportTimePicker, setShowTransportTimePicker] = useState(false);
  const [showReturnTimePicker, setShowReturnTimePicker] = useState(false);

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

    if (!formData.vehicleType) {
      newErrors.vehicleType = 'Vui lòng chọn loại xe';
      valid = false;
    }

    if (formData.vehicleCapacity <= 0) {
      newErrors.vehicleCapacity = 'Sức chứa xe phải lớn hơn 0';
      valid = false;
    }

    if (formData.availableWeight <= 0) {
      newErrors.availableWeight = 'Khối lượng còn lại phải lớn hơn 0';
      valid = false;
    }

    if (formData.pricePerUnit <= 0) {
      newErrors.pricePerUnit = 'Giá mỗi đơn vị phải lớn hơn 0';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Định nghĩa kiểu cho các tham số của handleChange
  const handleChange = (name: keyof FormData, value: any) => {
    setFormData(prevData => ({...prevData, [name]: value}));
    // Xóa lỗi khi người dùng nhập lại
    setErrors(prevErrors => ({...prevErrors, [name]: undefined}));
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await createPost(formData); // Giả sử createPost là hàm tạo bài đăng
        // Hiển thị thông báo thành công
        Alert.alert(
          'Thành công',
          'Tạo bài đăng thành công',
          [{text: 'OK', onPress: () => navigation.goBack()}],
          {cancelable: false},
        );
      } catch (error) {
        // Hiển thị lỗi khi có vấn đề trong quá trình tạo bài đăng
        Alert.alert('Lỗi', 'Lỗi khi tạo bài đăng', [{text: 'OK'}], {
          cancelable: true,
        });
      }
    } else {
      // Hiển thị lỗi khi form không hợp lệ
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin', [{text: 'OK'}], {
        cancelable: true,
      });
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
              style={styles.switch}
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
          <DropDownPicker
            open={openVehicleType}
            value={formData.vehicleType}
            items={vehicleTypes}
            setOpen={setOpenVehicleType}
            setValue={callback =>
              handleChange('vehicleType', callback(formData.vehicleType))
            }
            setItems={setVehicleTypes}
            placeholder="Chọn loại xe"
            style={[
              styles.dropdown,
              errors.vehicleType ? {borderColor: 'red'} : {},
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
            onChangeValue={value => handleChange('vehicleType', value)}
          />
          {errors.vehicleType && (
            <Text style={styles.errorText}>{errors.vehicleType}</Text>
          )}
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
            error={!!errors.vehicleCapacity}
          />
          {errors.vehicleCapacity && (
            <Text style={styles.errorText}>{errors.vehicleCapacity}</Text>
          )}
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
            error={!!errors.availableWeight}
          />
          {errors.availableWeight && (
            <Text style={styles.errorText}>{errors.availableWeight}</Text>
          )}
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
            error={!!errors.pricePerUnit}
          />
          {errors.pricePerUnit && (
            <Text style={styles.errorText}>{errors.pricePerUnit}</Text>
          )}
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
    );
  };

  return (
    <FlatList
      data={[{key: 'form'}]}
      renderItem={renderFormFields}
      keyExtractor={item => item.key}
      contentContainerStyle={styles.container}
    />
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
    marginBottom: 5,
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  switch: {marginStart: 'auto'},
  dropdown: {
    marginBottom: 15,
    borderColor: Colors.bordercolor,
  },
  dropdownContainer: {
    borderColor: Colors.bordercolor,
  },
});

export default CreateOfferingTransportPost;
