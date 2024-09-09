import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {TextInput, Card, Text, Switch} from 'react-native-paper';
import GradientButton from '../../../components/button/GradientButton';
import Colors from '../../../constants/colors';
import {updatePost, getPostById} from '../../../apis/services/postService';
import Toast from 'react-native-toast-message';
import BlurredToast from '../../../components/toast/BlurredToast';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {toastConfig} from '../../../components/toast/ToastAuth';

// Định nghĩa kiểu dữ liệu cho formData
interface FormData {
  postType: 'OfferingTransport';
  status: 'active' | 'completed';
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

const EditOfferingTransportPost = ({route, navigation}: any) => {
  const {postId} = route.params;
  const [formData, setFormData] = useState<FormData>({
    postType: 'OfferingTransport',
    status: 'active',
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

  const [errors, setErrors] = useState<{[key in keyof FormData]?: string}>({});
  const [showTransportTimePicker, setShowTransportTimePicker] = useState(false);
  const [showReturnTimePicker, setShowReturnTimePicker] = useState(false);
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
        const post = await getPostById(postId);
        if (!post) {
          throw new Error(
            'Bài đăng không tồn tại hoặc không lấy được dữ liệu.',
          );
        }

        // Chuyển đổi `transportTime` và `returnTime` thành `Date`
        const transportTime = post.transportTime
          ? new Date(post.transportTime)
          : new Date();
        const returnTime = post.returnTime
          ? new Date(post.returnTime)
          : new Date();

        // Cập nhật formData với dữ liệu từ API
        setFormData({
          postType: post.postType || 'OfferingTransport',
          status: post.status || 'active',
          origin: post.origin || '',
          destination: post.destination || '',
          transportTime,
          returnTrip: post.returnTrip || false,
          returnTime,
          vehicleType: post.vehicleType || '',
          vehicleCapacity: post.vehicleCapacity || 0,
          availableWeight: post.availableWeight || 0,
          pricePerUnit: post.pricePerUnit || 0,
          vehicleDetails: post.vehicleDetails || '',
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

  const handleChange = (name: keyof FormData, value: any) => {
    setFormData(prevData => ({...prevData, [name]: value}));
    setErrors(prevErrors => ({...prevErrors, [name]: undefined}));
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await updatePost(postId, {
          ...formData,
          status: formData.status, // Đảm bảo gửi đúng trạng thái
          transportTime: formData.transportTime.toISOString(),
          returnTime: formData.returnTime.toISOString(),
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

        <DropDownPicker
          open={openStatusPicker}
          value={formData.status}
          items={statusOptions}
          setOpen={setOpenStatusPicker}
          setValue={callback =>
            handleChange('status', callback(formData.status))
          }
          setItems={setStatusOptions}
          placeholder="Chọn trạng thái bài đăng"
          style={[styles.dropdown, errors.status ? {borderColor: 'red'} : {}]}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={{fontSize: 16}}
        />
        {errors.status && <Text style={styles.errorText}>{errors.status}</Text>}

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
