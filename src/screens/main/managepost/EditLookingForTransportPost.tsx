import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {TextInput, Card, Text} from 'react-native-paper';
import GradientButton from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {updatePost, getPostById} from '../../../apis/services/postService';
import Toast from 'react-native-toast-message';
import BlurredToast from '../../../components/toast/BlurredToast';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {toastConfig} from '../../../components/toast/ToastAuth';

interface FormData {
  postType: 'LookingForTransport';
  status: 'active' | 'completed';
  origin: string;
  destination: string;
  transportTime: Date;
  requiredVehicleType: string;
  cargoTypeRequest: string;
}

const EditLookingForTransportPost = ({route, navigation}: any) => {
  const {postId} = route.params;
  const [formData, setFormData] = useState<FormData>({
    postType: 'LookingForTransport',
    status: 'active',
    origin: '',
    destination: '',
    transportTime: new Date(),
    requiredVehicleType: '',
    cargoTypeRequest: '',
  });

  const [showTransportTimePicker, setShowTransportTimePicker] = useState(false);
  const [errors, setErrors] = useState<{[key in keyof FormData]?: string}>({});
  const [openVehicleType, setOpenVehicleType] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([
    {label: 'Xe tải', value: 'Xe tải'},
    {label: 'Xe container', value: 'Xe container'},
  ]);

  // Status options
  const [openStatusPicker, setOpenStatusPicker] = useState(false);
  const [statusOptions, setStatusOptions] = useState([
    {label: 'Hoạt động', value: 'active'},
    {label: 'Hoàn tất', value: 'completed'},
  ]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        console.log('Fetching post with ID:', postId);
        const post = await getPostById(postId);

        if (!post) {
          throw new Error('Không tìm thấy bài đăng hoặc dữ liệu không hợp lệ.');
        }

        const transportTime = post.transportTime
          ? new Date(post.transportTime)
          : new Date();

        setFormData({
          postType: post.postType || 'LookingForTransport',
          status: post.status || 'active',
          origin: post.origin || '',
          destination: post.destination || '',
          transportTime,
          requiredVehicleType: post.requiredVehicleType || '',
          cargoTypeRequest: post.cargoTypeRequest || '',
        });
      } catch (error) {
        console.error('Error fetching post by ID:', error);
        Toast.show({
          type: 'error',
          text1: 'Lỗi khi tải dữ liệu bài đăng',
        });
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
          status: formData.status, // Đảm bảo gửi đúng trạng thái
          transportTime: formData.transportTime.toISOString(),
        };

        await updatePost(postId, updatedData);
        Toast.show({
          type: 'success',
          text1: 'Cập nhật bài đăng thành công',
          onHide: () => navigation.goBack(),
        });
      } catch (error) {
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

export default EditLookingForTransportPost;
