import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput, Card, Text, RadioButton} from 'react-native-paper';
import GradientButton from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {updatePost} from '../../../apis/services/postService';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

// Định nghĩa kiểu dữ liệu cho formData
interface FormData {
  postType: 'CargoMatching';
  status: 'active' | 'completed';
  origin: string;
  destination: string;
  transportGoes: Date;
  transportComes: Date;
  hasVehicle: boolean;
  cargoType: string;
  cargoWeight: string; // Đổi từ number sang string
  cargoVolume: string; // Đổi từ number sang string
  specialRequirements: string;
}

const EditCargoMatchingPost = ({route, navigation}: any) => {
  const {post} = route.params;
  const [formData, setFormData] = useState<FormData>({
    postType: 'CargoMatching',
    status: post.status || 'active',
    origin: post.origin,
    destination: post.destination,
    transportGoes: new Date(post.transportGoes),
    transportComes: new Date(post.transportComes),
    hasVehicle: post.hasVehicle,
    cargoType: post.cargoType,
    cargoWeight: String(post.cargoWeight), // Chuyển sang chuỗi
    cargoVolume: String(post.cargoVolume), // Chuyển sang chuỗi
    specialRequirements: post.specialRequirements,
  });

  const [showTransportGoesPicker, setShowTransportGoesPicker] = useState(false);
  const [showTransportComesPicker, setShowTransportComesPicker] =
    useState(false);
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

    if (!formData.cargoWeight) {
      newErrors.cargoWeight = 'Khối lượng hàng hóa phải lớn hơn 0';
      valid = false;
    }

    if (!formData.cargoVolume) {
      newErrors.cargoVolume = 'Thể tích hàng hóa phải lớn hơn 0';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData(prevData => ({...prevData, [name]: value}));
    setErrors(prevErrors => ({...prevErrors, [name]: undefined}));
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await updatePost(post.id, {
          ...formData,
          status: formData.status,
          transportGoes: formData.transportGoes.toISOString(),
          transportComes: formData.transportComes.toISOString(),
        });

        Alert.alert(
          'Thành công',
          'Cập nhật bài đăng thành công',
          [{text: 'OK', onPress: () => navigation.goBack()}],
          {cancelable: false},
        );
      } catch (error) {
        console.error('Error updating post:', error);
        Alert.alert('Lỗi', 'Lỗi khi cập nhật bài đăng', [{text: 'OK'}], {
          cancelable: true,
        });
      }
    } else {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin', [{text: 'OK'}], {
        cancelable: true,
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

        <View style={styles.timeRow}>
          <TextInput
            label="Thời gian đi"
            mode="outlined"
            value={formData.transportGoes.toLocaleDateString()}
            style={[styles.timeInput, {marginRight: 5}]}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
            onPressIn={() => {
              setShowTransportGoesPicker(true);
              setShowTransportComesPicker(false);
            }}
          />
          <Text style={styles.dash}>-</Text>
          <TextInput
            label="Thời gian tới"
            mode="outlined"
            value={formData.transportComes.toLocaleDateString()}
            style={[styles.timeInput, {marginLeft: 5}]}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
            onPressIn={() => {
              setShowTransportComesPicker(true);
              setShowTransportGoesPicker(false);
            }}
          />
        </View>

        {showTransportGoesPicker && (
          <DateTimePicker
            value={formData.transportGoes}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowTransportGoesPicker(false);
              if (selectedDate) {
                handleChange('transportGoes', selectedDate.toISOString());
              }
            }}
          />
        )}

        {showTransportComesPicker && (
          <DateTimePicker
            value={formData.transportComes}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowTransportComesPicker(false);
              if (selectedDate) {
                handleChange('transportComes', selectedDate.toISOString());
              }
            }}
          />
        )}

        <View style={styles.radioButtonContainer}>
          <Text style={styles.label}>Có xe vận tải:</Text>
          <RadioButton.Group
            onValueChange={newValue =>
              handleChange('hasVehicle', newValue === 'true' ? 'true' : 'false')
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
          value={formData.cargoWeight}
          onChangeText={text => handleChange('cargoWeight', text)}
          style={styles.input}
          outlineColor={Colors.bordercolor}
          activeOutlineColor={Colors.primary}
          error={!!errors.cargoWeight}
          keyboardType="default"
        />
        {errors.cargoWeight && (
          <Text style={styles.errorText}>{errors.cargoWeight}</Text>
        )}

        <TextInput
          label="Thể tích hàng hóa"
          mode="outlined"
          value={formData.cargoVolume}
          onChangeText={text => handleChange('cargoVolume', text)}
          style={styles.input}
          outlineColor={Colors.bordercolor}
          activeOutlineColor={Colors.primary}
          error={!!errors.cargoVolume}
          keyboardType="default"
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
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  timeInput: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dash: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  dropdown: {
    marginBottom: 15,
    borderColor: Colors.bordercolor,
  },
  dropdownContainer: {
    borderColor: Colors.bordercolor,
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
