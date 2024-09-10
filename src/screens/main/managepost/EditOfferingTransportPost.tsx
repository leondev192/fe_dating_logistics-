import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput, Card, Text, Switch} from 'react-native-paper';
import GradientButton from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {updatePost, getPostById} from '../../../apis/services/postService';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

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
}

const EditOfferingTransportPost = ({route, navigation}: any) => {
  const {postId} = route.params;
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
  });

  const [errors, setErrors] = useState<{[key in keyof FormData]?: string}>({});
  const [showTransportGoesPicker, setShowTransportGoesPicker] = useState(false);
  const [showTransportComesPicker, setShowTransportComesPicker] =
    useState(false);
  const [showReturnTimePicker, setShowReturnTimePicker] = useState(false);
  const [openVehicleType, setOpenVehicleType] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([
    {label: 'Xe tải', value: 'Xe tải'},
    {label: 'Xe container', value: 'Xe container'},
  ]);

  // Trạng thái của bài đăng
  const statusOptions = [
    {label: 'Hoạt động', value: 'Active'},
    {label: 'Hoàn tất', value: 'Completed'},
  ];

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
        });
      } catch (error) {
        console.error('Error fetching post by ID:', error);
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

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Khứ hồi:</Text>
          <Switch
            value={formData.returnTrip}
            style={styles.switch}
            onValueChange={value => handleChange('returnTrip', value)}
          />
        </View>

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

export default EditOfferingTransportPost;
