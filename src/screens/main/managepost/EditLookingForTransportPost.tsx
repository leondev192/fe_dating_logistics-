import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput, Card, Text} from 'react-native-paper';
import GradientButton from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {updatePost, getPostById} from '../../../apis/services/postService';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

interface FormData {
  postType: 'LookingForTransport';
  status: 'active' | 'completed';
  origin: string;
  destination: string;
  transportGoes: Date;
  transportComes: Date;
  requiredVehicleType: string;
  cargoTypeRequest: string;
  cargoWeight: string;
}

const EditLookingForTransportPost = ({route}: any) => {
  const {postId} = route.params;
  const navigation = useNavigation();
  const [formData, setFormData] = useState<FormData>({
    postType: 'LookingForTransport',
    status: 'active',
    origin: '',
    destination: '',
    transportGoes: new Date(),
    transportComes: new Date(),
    requiredVehicleType: '',
    cargoTypeRequest: '',
    cargoWeight: '',
  });
  const navigateToMap = (field: 'origin' | 'destination') => {
    navigation.navigate('EditMapScreen', {
      field,
      postId,
    });
  };

  const [showTransportGoesPicker, setShowTransportGoesPicker] = useState(false);
  const [showTransportComesPicker, setShowTransportComesPicker] =
    useState(false);
  const [errors, setErrors] = useState<{[key in keyof FormData]?: string}>({});
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
          throw new Error('Không tìm thấy bài đăng hoặc dữ liệu không hợp lệ.');
        }

        const transportGoes = post.transportGoes
          ? new Date(post.transportGoes)
          : new Date();
        const transportComes = post.transportComes
          ? new Date(post.transportComes)
          : new Date();

        // Cập nhật formData với status từ dữ liệu của bài đăng
        setFormData({
          postType: 'LookingForTransport',
          status: post.status || 'active', // Cập nhật status từ dữ liệu bài đăng
          origin: post.origin || '',
          destination: post.destination || '',
          transportGoes,
          transportComes,
          requiredVehicleType: post.requiredVehicleType || '',
          cargoTypeRequest: post.cargoTypeRequest || '',
          cargoWeight: post.cargoWeight || '',
        });
      } catch (error) {
        // console.error('Error fetching post by ID:', error);
        Alert.alert('Lỗi', 'Lỗi khi tải dữ liệu bài đăng', [
          {text: 'OK', onPress: () => console.log('Alert closed')},
        ]);
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

  useFocusEffect(
    useCallback(() => {
      const handleFocus = () => {
        // Kiểm tra và cập nhật lại formData khi có selectedLocation
        if (route.params?.selectedLocation) {
          const {field, locationName} = route.params.selectedLocation;
          handleChange(field, locationName);
          // Đảm bảo postId vẫn được giữ nguyên và không bị mất khi quay lại
          if (!postId) {
            navigation.setParams({postId: route.params?.postId});
          }
          // Đặt lại selectedLocation để tránh cập nhật lại không cần thiết
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
        {renderStatusButtons()}
      </Card.Content>

      <Card.Actions style={styles.cardActions}>
        <GradientButton title="Cập nhật bài đăng" onPress={handleSubmit} />
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
});

export default EditLookingForTransportPost;
