import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, TextInput} from 'react-native-paper';
import Colors from '../../../constants/colors';
import Toast from 'react-native-toast-message';
import {createPost} from '../../../apis/services/postService';
import {toastConfig} from '../../../components/toast/ToastAuth';
import BlurredToast from '../../../components/toast/BlurredToast';
import GradientButton from '../../../components/button/payment/GradientButton'; // Import GradientButton
import LoadingSpinner from '../../../components/loading/LoadingSpinner'; // Import LoadingSpinner

const PaymentScreen = ({navigation, route}: any) => {
  const [isPaying, setIsPaying] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // Chuyển đổi transportTime từ chuỗi sang Date trước khi gửi API
  const formData = {
    ...route.params.formData,
    transportTime: new Date(route.params.formData.transportTime),
  };

  const validateInputs = () => {
    const newErrors = {cardNumber: '', expiryDate: '', cvv: ''};
    let isValid = true;

    if (!cardNumber) {
      newErrors.cardNumber = 'Vui lòng nhập số thẻ';
      isValid = false;
    }
    if (!expiryDate) {
      newErrors.expiryDate = 'Vui lòng nhập ngày hết hạn';
      isValid = false;
    }
    if (!cvv) {
      newErrors.cvv = 'Vui lòng nhập CVV';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handlePayment = async () => {
    if (!validateInputs()) return;

    setIsPaying(true);
    setLoading(true);
    setTimeout(async () => {
      setIsPaying(false);
      try {
        // Gọi hàm tạo bài đăng
        await createPost(formData);

        // Hiển thị thông báo thành công
        Toast.show({
          type: 'success',
          text1: 'Thanh toán và đăng bài thành công',
          position: 'top',
          visibilityTime: 3000,
          topOffset: 300,
          autoHide: true,
          onHide: () => {
            // Điều hướng về trang chủ mà không cần set lại trạng thái toast
            navigation.reset({
              index: 0,
              routes: [{name: 'Tabs'}],
            });
          },
        });
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error creating post:', error);
        Toast.show({
          type: 'error',
          text1: 'Lỗi khi tạo bài đăng',
          position: 'top',
          visibilityTime: 3000,
          topOffset: 300,
          autoHide: true,
          onHide: () => setIsToastVisible(false),
        });
        setIsToastVisible(true);
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Thanh Toán</Text>
          <TextInput
            label="Số Thẻ"
            value={cardNumber}
            onChangeText={text => setCardNumber(text)}
            keyboardType="numeric"
            style={styles.input}
            error={!!errors.cardNumber}
          />
          {errors.cardNumber ? (
            <Text style={styles.errorText}>{errors.cardNumber}</Text>
          ) : null}

          <TextInput
            label="Ngày Hết Hạn"
            value={expiryDate}
            onChangeText={text => setExpiryDate(text)}
            placeholder="MM/YY"
            keyboardType="numeric"
            style={styles.input}
            error={!!errors.expiryDate}
          />
          {errors.expiryDate ? (
            <Text style={styles.errorText}>{errors.expiryDate}</Text>
          ) : null}

          <TextInput
            label="CVV"
            value={cvv}
            onChangeText={text => setCvv(text)}
            keyboardType="numeric"
            secureTextEntry
            style={styles.input}
            error={!!errors.cvv}
          />
          {errors.cvv ? (
            <Text style={styles.errorText}>{errors.cvv}</Text>
          ) : null}

          <Card.Actions style={styles.cardActions}>
            <GradientButton
              title={isPaying ? 'Đang xử lý...' : 'Thanh Toán'}
              onPress={handlePayment}
              style={styles.button}
            />
          </Card.Actions>
        </Card.Content>
      </Card>
      {loading && <LoadingSpinner loading={loading} />}
      <BlurredToast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardActions: {
    justifyContent: 'center',
    marginTop: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default PaymentScreen;
