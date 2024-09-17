import React, {useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Card, Text} from 'react-native-paper';
import GradientButton from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

// Định nghĩa kiểu dữ liệu cho formData
interface FormData {
  postType: 'LookingForTransport';
  status: 'Active' | 'Completed';
  origin: string;
  destination: string;
  transportGoes: Date;
  transportComes: Date;
  requiredVehicleType: string;
  cargoTypeRequest: string;
  cargoWeight: string; // Khối lượng hàng hóa
}

const CreateLookingForTransportPost = ({route}: any) => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<FormData>({
    postType: 'LookingForTransport',
    status: 'Active',
    origin: '',
    destination: '',
    transportGoes: new Date(),
    transportComes: new Date(),
    requiredVehicleType: '',
    cargoTypeRequest: '',
    cargoWeight: '', // Khối lượng hàng hóa
  });

  const [showTransportGoesPicker, setShowTransportGoesPicker] = useState(false);
  const [showTransportComesPicker, setShowTransportComesPicker] =
    useState(false);
  const [errors, setErrors] = useState<{[key in keyof FormData]?: string}>({});

  const [openVehicleType, setOpenVehicleType] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([
    {label: 'Xe tải', value: 'Xe tải'},
    {label: 'Xe tải lạnh ', value: 'Xe tải lạnh'},
    {label: 'Xe container', value: 'Xe container'},
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

    if (!formData.requiredVehicleType) {
      newErrors.requiredVehicleType = 'Vui lòng chọn loại xe yêu cầu';
      valid = false;
    }

    if (!formData.cargoTypeRequest) {
      newErrors.cargoTypeRequest = 'Vui lòng nhập loại hàng hóa yêu cầu';
      valid = false;
    }

    if (!formData.cargoWeight) {
      newErrors.cargoWeight =
        'Khối lượng hàng hóa phải lớn hơn 0 và là số hợp lệ';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (name: keyof FormData, value: any) => {
    setFormData(prevData => ({...prevData, [name]: value}));
    setErrors(prevErrors => ({...prevErrors, [name]: undefined}));
  };

  const navigateToMap = (field: 'origin' | 'destination') => {
    navigation.navigate('MapScreen', {field});
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const formDataToSend = {
        ...formData,
        transportGoes: formData.transportGoes.toISOString(),
        transportComes: formData.transportComes.toISOString(),
      };
      navigation.navigate('PaymentScreen', {formData: formDataToSend});
    } else {
      Alert.alert(
        'Thông báo',
        'Vui lòng điền đầy đủ thông tin.',
        [{text: 'OK'}],
        {cancelable: true},
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      const handleFocus = () => {
        if (route.params?.selectedLocation) {
          const {field, locationName} = route.params.selectedLocation;
          handleChange(field, locationName);
          navigation.setParams({selectedLocation: null});
        }
      };

      navigation.addListener('focus', handleFocus);

      return () => {
        navigation.removeListener('focus', handleFocus);
      };
    }, [route.params?.selectedLocation]),
  );

  const renderFormFields = () => {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <TouchableOpacity
            onPress={() => navigateToMap('origin')}
            style={styles.inputContainer}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {formData.origin || 'Nơi bắt đầu'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigateToMap('destination')}
            style={styles.inputContainer}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {formData.destination || 'Nơi kết thúc'}
            </Text>
          </TouchableOpacity>

          <View style={styles.timeRow}>
            <TextInput
              label="Thời gian dự kiến"
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
          </View>

          {showTransportGoesPicker && (
            <DateTimePicker
              value={formData.transportGoes}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowTransportGoesPicker(false);
                if (selectedDate) {
                  handleChange('transportGoes', selectedDate);
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
                  handleChange('transportComes', selectedDate);
                }
              }}
            />
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

          <TextInput
            label="Loại hàng hóa"
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

          <TextInput
            label="Khối lượng hàng hóa"
            mode="outlined"
            value={String(formData.cargoWeight)}
            onChangeText={text => handleChange('cargoWeight', text)}
            style={styles.input}
            outlineColor={Colors.bordercolor}
            activeOutlineColor={Colors.primary}
            error={!!errors.cargoWeight}
          />
          {errors.cargoWeight && (
            <Text style={styles.errorText}>{errors.cargoWeight}</Text>
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
  dropdown: {
    marginBottom: 15,
    borderColor: Colors.bordercolor,
  },
  dropdownContainer: {
    borderColor: Colors.bordercolor,
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
});

export default CreateLookingForTransportPost;
