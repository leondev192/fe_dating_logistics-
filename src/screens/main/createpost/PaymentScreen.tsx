import React, {useState} from 'react';
import {View, StyleSheet, Alert, Image} from 'react-native';
import {Card, Text, Divider} from 'react-native-paper';
import Colors from '../../../constants/colors';
import {createPost} from '../../../apis/services/postService';
import GradientButton from '../../../components/button/payment/GradientButton'; // Import GradientButton
import LoadingSpinner from '../../../components/loading/LoadingSpinner'; // Import LoadingSpinner

const PaymentScreen = ({navigation, route}: any) => {
  const [isPaying, setIsPaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const formData = {
    ...route.params.formData,
    transportGoes: new Date(route.params.formData.transportGoes),
    transportComes: new Date(route.params.formData.transportComes),
  };

  const handlePayment = async () => {
    setIsPaying(true);
    setLoading(true);

    setTimeout(async () => {
      setIsPaying(false);
      try {
        // Gọi hàm tạo bài đăng
        await createPost(formData);

        // Hiển thị thông báo thành công
        Alert.alert(
          'Chờ trong giây lát',
          'bài đăng của bạn sẻ được đăng sau khi chúng tôi xác thực thanh toán',
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
        // console.error('Error creating post:', error);
        Alert.alert(
          'Lỗi',
          'Lỗi khi tạo bài đăng',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: true},
        );
      } finally {
        setLoading(false);
      }
    }, 3000); // Thời gian chờ 5 giây
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
          <Text style={styles.sectionTitle}>Thông tin chuyển khoản</Text>
          <Text style={styles.bankInfo}>
            Ngân hàng: Techcombank
            {'\n'}Chủ tài khoản: VO THI HANG NGA
            {'\n'}Số tài khoản: 1903 9249 6300 17
          </Text>
          <Image
            source={require('../../../assets/images/qr.png')} // Thay bằng link hoặc đường dẫn tới ảnh QR code
            style={styles.qrImage}
          />
          <Divider style={styles.divider} />
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <GradientButton
            title={isPaying ? 'Đang xử lý...' : 'Xác nhận đã chuyển khoản'}
            onPress={handlePayment}
            style={styles.button}
          />
        </Card.Actions>
      </Card>
      {loading && <LoadingSpinner loading={loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
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
  bankInfo: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
  qrImage: {
    width: 200,
    height: 160,
    alignSelf: 'center',
    marginBottom: 10,
  },
  divider: {
    marginVertical: 10,
  },
  cardActions: {
    justifyContent: 'center',
    marginTop: 15,
  },
  button: {
    alignSelf: 'center',
    width: '80%',
  },
});

export default PaymentScreen;
