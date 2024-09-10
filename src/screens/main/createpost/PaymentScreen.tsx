import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Card, Text, TextInput, Divider} from 'react-native-paper';
import Colors from '../../../constants/colors';
import {createPost} from '../../../apis/services/postService';
import GradientButton from '../../../components/button/payment/GradientButton'; // Import GradientButton
import LoadingSpinner from '../../../components/loading/LoadingSpinner'; // Import LoadingSpinner

const PaymentScreen = ({navigation, route}: any) => {
  const [isPaying, setIsPaying] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const formData = {
    ...route.params.formData,
    transportGoes: new Date(route.params.formData.transportGoes),
    transportComes: new Date(route.params.formData.transportComes),
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
        Alert.alert(
          'Thành công',
          'Thanh toán và đăng bài thành công',
          [
            {
              text: 'OK',
              onPress: () => {
                // Điều hướng về trang chủ mà không cần set lại trạng thái alert
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Tabs'}],
                });
              },
            },
          ],
          {cancelable: false},
        );
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error creating post:', error);
        Alert.alert(
          'Lỗi',
          'Lỗi khi tạo bài đăng',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: true},
        );
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Thông tin thanh toán</Text>
          <Divider style={styles.divider} />
          <View style={styles.paymentDetails}>
            <Text style={styles.paymentLabel}>Tên dịch vụ:</Text>
            <Text style={styles.paymentValue}>Đăng bài viết</Text>
          </View>
          <View style={styles.paymentDetails}>
            <Text style={styles.paymentLabel}>Số tiền thanh toán:</Text>
            <Text style={styles.paymentValue}>50.000 VND</Text>
          </View>
          <Divider style={styles.divider} />
          <Text style={styles.sectionTitle}>Chi tiết thẻ</Text>
          <TextInput
            label="Số Thẻ"
            value={cardNumber}
            onChangeText={text => setCardNumber(text)}
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
    padding: 5,
    backgroundColor: Colors.background,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
    color: Colors.textbody,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    alignSelf: 'center',
    width: '80%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  paymentLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  paymentValue: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 10,
  },
});

export default PaymentScreen;
