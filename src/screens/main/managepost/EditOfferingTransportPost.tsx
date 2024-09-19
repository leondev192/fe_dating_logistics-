import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import GradientButton from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {updatePost, getPostById} from '../../../apis/services/postService';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

// Định nghĩa kiểu dữ liệu cho formData
interface FormData {
  postType: 'OfferingTransport';
  status: 'active' | 'completed';
  origin: string;
  destination: string;
  transportGoes: Date;
  transportComes: Date;
  returnTrip: boolean;
  vehicleType: string;
  vehicleCapacity: string;
  availableWeight: string;
  pricePerUnit: string;
  vehicleDetails: string;
  cargoTypeRequest: string;
}

const EditOfferingTransportPost = ({route}: any) => {
  const {postId} = route.params;
  const navigation = useNavigation();

  const [formData, setFormData] = useState<FormData>({
    postType: 'OfferingTransport',
    status: 'active',
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
    {label: 'Xe container', value: 'Xe container'},
  ]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const post = await getPostById(postId);
        if (!post) {
          throw new Error(
            'Bài đăng không tồn tại hoặc không lấy được dữ liệu.',
          );
        }

        setFormData({
          postType: 'OfferingTransport',
          status: post.status || 'active',
          origin: post.origin || '',
          destination: post.destination || '',
          transportGoes: post.transportGoes
            ? new Date(post.transportGoes)
            : new Date(),
          transportComes: post.transportComes
            ? new Date(post.transportComes)
            : new Date(),
          returnTrip: post.returnTrip || false,
          vehicleType: post.vehicleType || '',
          vehicleCapacity: post.vehicleCapacity?.toString() || '',
          availableWeight: post.availableWeight?.toString() || '',
          pricePerUnit: post.pricePerUnit?.toString() || '',
          vehicleDetails: post.vehicleDetails || '',
          cargoTypeRequest: post.cargoTypeRequest || '',
        });
      } catch (error) {
        Alert.alert('Lỗi', 'Lỗi khi tải dữ liệu bài đăng', [{text: 'OK'}]);
      }
    };

    fetchPostData();
  }, [postId]);

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

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const updatedData = {
          ...formData,
          transportGoes: formData.transportGoes.toISOString(),
          transportComes: formData.transportComes.toISOString(),
        };

        await updatePost(postId, updatedData);
        Alert.alert('Thành công', 'Cập nhật bài đăng thành công', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      } catch (error) {
        Alert.alert('Lỗi', 'Lỗi khi cập nhật bài đăng', [
          {text: 'OK', onPress: () => console.log('Alert closed')},
        ]);
      }
    } else {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin', [
        {text: 'OK', onPress: () => console.log('Alert closed')},
      ]);
    }
  };

  const navigateToMap = (field: 'origin' | 'destination') => {
    navigation.navigate('EditMapScreenOffering', {
      field,
      postId,
    });
  };

  useFocusEffect(
    useCallback(() => {
      const handleFocus = () => {
        if (route.params?.selectedLocation) {
          const {field, locationName} = route.params.selectedLocation;
          handleChange(field, locationName);
          if (!postId) {
            navigation.setParams({postId: route.params?.postId});
          }
          navigation.setParams({selectedLocation: null});
        }
      };

      navigation.addListener('focus', handleFocus);

      return () => {
        navigation.removeListener('focus', handleFocus);
      };
    }, [route.params?.selectedLocation, postId]),
  );

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
    <View style={styles.formContainer}>
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

      {renderStatusButtons()}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[{key: 'form'}]}
        renderItem={renderFormFields}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.container}
      />
      <View style={styles.actions}>
        <GradientButton title="Cập nhật bài đăng" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    padding: 15,
  },
  formContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  switch: {marginStart: 'auto'},
  actions: {
    justifyContent: 'center',
    marginTop: '-15%',
  },
});

export default EditOfferingTransportPost;
