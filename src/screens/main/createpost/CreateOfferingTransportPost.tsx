import React, {useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Switch,
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
  postType: 'OfferingTransport';
  status: 'Active' | 'Completed';
  origin: string;
  destination: string;
  transportGoes: Date; // Thời gian đi
  transportComes: Date; // Thời gian tới
  returnTrip: boolean;
  vehicleType: string;
  vehicleCapacity: string;
  availableWeight: string;
  pricePerUnit: string;
  vehicleDetails: string;
  cargoTypeRequest: string;
}

const CreateOfferingTransportPost = ({route}: any) => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<FormData>({
    postType: 'OfferingTransport',
    status: 'Active',
    origin: '',
    destination: '',
    transportGoes: new Date(),
    transportComes: new Date(),
    returnTrip: false,
    vehicleType: '',
    vehicleCapacity: '',
    availableWeight: '',
    pricePerUnit: '',
    vehicleDetails: '',
    cargoTypeRequest: '',
  });

  const [errors, setErrors] = useState<{[key in keyof FormData]?: string}>({});
  const [showTransportGoesPicker, setShowTransportGoesPicker] = useState(false);
  const [showTransportComesPicker, setShowTransportComesPicker] =
    useState(false);
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

    if (!formData.vehicleType) {
      newErrors.vehicleType = 'Vui lòng chọn loại xe';
      valid = false;
    }
    if (!formData.cargoTypeRequest) {
      newErrors.cargoTypeRequest = 'Vui lòng nhập loại hàng hóa yêu cầu';
      valid = false;
    }

    if (!formData.vehicleCapacity) {
      newErrors.vehicleCapacity =
        'Vui lòng nhập sức chứa hợp lệ (số và lớn hơn 0)';
      valid = false;
    }

    if (!formData.availableWeight) {
      newErrors.availableWeight =
        'Vui lòng nhập khối lượng còn lại hợp lệ (số và lớn hơn 0)';
      valid = false;
    }

    if (!formData.pricePerUnit) {
      newErrors.pricePerUnit =
        'Vui lòng nhập giá mỗi đơn vị hợp lệ (số và lớn hơn 0)';
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
    navigation.navigate('MapScreenOffering', {field});
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

  const renderFormFields = () => (
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
            label="Thời gian dụ kiến"
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
          label="Loại hàng hóa vận chuyển"
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
          label="Sức chứa xe"
          mode="outlined"
          value={String(formData.vehicleCapacity)}
          onChangeText={text => handleChange('vehicleCapacity', text)}
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
          value={String(formData.availableWeight)}
          onChangeText={text => handleChange('availableWeight', text)}
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
          value={String(formData.pricePerUnit)}
          onChangeText={text => handleChange('pricePerUnit', text)}
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

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Khứ hồi:</Text>
          <Switch
            value={formData.returnTrip}
            style={styles.switch}
            onValueChange={value => handleChange('returnTrip', value)}
          />
        </View>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <GradientButton title="Tạo Bài Đăng" onPress={handleSubmit} />
      </Card.Actions>
    </Card>
  );

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
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  switch: {marginStart: 'auto'},
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
  label: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
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

export default CreateOfferingTransportPost;
