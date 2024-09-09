// EditCargoMatchingPost.tsx
import React, {useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {TextInput, Card, Text, RadioButton} from 'react-native-paper';
import GradientButton from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {updatePost} from '../../../apis/services/postService';
import Toast from 'react-native-toast-message';
import BlurredToast from '../../../components/toast/BlurredToast';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {toastConfig} from '../../../components/toast/ToastAuth';

// Định nghĩa kiểu dữ liệu cho formData
interface FormData {
  postType: 'CargoMatching';
  status: 'active' | 'completed';
  origin: string;
  destination: string;
  transportTime: Date;
  hasVehicle: boolean;
  cargoType: string;
  cargoWeight: number;
  cargoVolume: number;
  specialRequirements: string;
}

const EditCargoMatchingPost = ({route, navigation}: any) => {
  const {post} = route.params;
  const [formData, setFormData] = useState<FormData>({
    postType: 'CargoMatching',
    status: post.status || 'active', // Đảm bảo `status` có giá trị mặc định
    origin: post.origin,
    destination: post.destination,
    transportTime: new Date(post.transportTime),
    hasVehicle: post.hasVehicle,
    cargoType: post.cargoType,
    cargoWeight: post.cargoWeight,
    cargoVolume: post.cargoVolume,
    specialRequirements: post.specialRequirements,
  });

  const [showTransportTimePicker, setShowTransportTimePicker] = useState(false);
  const [errors, setErrors] = useState<{[key in keyof FormData]?: string}>({});
  const [openCargoType, setOpenCargoType] = useState(false);
  const [cargoTypes, setCargoTypes] = useState([
    {label: 'Hàng khô', value: 'Hàng khô'},
    {label: 'Hàng đông lạnh', value: 'Hàng đông lạnh'},
  ]);

  // Status options
  const [openStatusPicker, setOpenStatusPicker] = useState(false);
  const [statusOptions, setStatusOptions] = useState([
    {label: 'Hoạt động', value: 'active'},
    {label: 'Hoàn tất', value: 'completed'},
  ]);

  // Hàm kiểm tra tính hợp lệ của form
  const validateForm = () => {
    let valid = true;
    const newErrors: {[key in keyof FormData]?: string} = {};

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

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Gọi hàm updatePost với ID bài đăng và dữ liệu cập nhật
        await updatePost(post.id, {
          ...formData,
          status: formData.status, // Đảm bảo gửi đúng trạng thái
          transportTime: formData.transportTime.toISOString(), // Đảm bảo chuyển đổi Date sang string
        });

        Toast.show({
          type: 'success',
          text1: 'Cập nhật bài đăng thành công',
          onHide: () => navigation.goBack(),
        });
      } catch (error) {
        console.error('Error updating post:', error);
        Toast.show({
          type: 'error',
          text1: 'Lỗi khi cập nhật bài đăng',
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng điền đầy đủ thông tin',
      });
    }
  };

  const renderStatusButtons = () => (
    <View style={styles.statusButtonContainer}>
      <TouchableOpacity
        style={[
          styles.statusButton,
          formData.status === 'active'
            ? styles.activeButton
            : styles.inactiveButton,
        ]}
        onPress={() => handleChange('status', 'active')}>
        <Text style={styles.statusButtonText}>Hoạt động</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.statusButton,
          formData.status === 'completed'
            ? styles.completedButton
            : styles.inactiveButton,
        ]}
        onPress={() => handleChange('status', 'completed')}>
        <Text style={styles.statusButtonText}>Hoàn tất</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFormFields = () => (
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
        {errors.origin && <Text style={styles.errorText}>{errors.origin}</Text>}

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

        <View style={styles.radioButtonContainer}>
          <Text style={styles.label}>Có xe vận tải:</Text>
          <RadioButton.Group
            onValueChange={newValue =>
              handleChange('hasVehicle', newValue === 'true')
            }
            value={formData.hasVehicle ? 'true' : 'false'}>
            <View style={styles.radioButtonRow}>
              <View style={styles.radioButtonItem}>
                <RadioButton.Android value="true" color={Colors.primary} />
                <Text style={styles.radioLabel}>Đã có xe</Text>
              </View>
              <View style={styles.radioButtonItem}>
                <RadioButton.Android value="false" color={Colors.primary} />
                <Text style={styles.radioLabel}>Chưa có xe</Text>
              </View>
            </View>
          </RadioButton.Group>
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
        {renderStatusButtons()}
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <GradientButton title="Cập Nhật" onPress={handleSubmit} />
      </Card.Actions>
    </Card>
  );

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
  radioButtonContainer: {
    marginBottom: 15,
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioButtonItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.text,
    fontWeight: '600',
  },
  dropdown: {
    marginBottom: 15,
    borderColor: Colors.bordercolor,
  },
  dropdownContainer: {
    borderColor: Colors.bordercolor,
  },
  statusButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statusButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
  },
  completedButton: {
    backgroundColor: '#F44336',
  },
  inactiveButton: {
    backgroundColor: '#ddd',
  },
  statusButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditCargoMatchingPost;
