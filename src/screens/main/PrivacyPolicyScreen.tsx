// src/screens/PrivacyPolicy.tsx
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Colors from '../../constants/colors';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>1. Thu thập thông tin</Text>
      <Text style={styles.sectionContent}>
        Chúng tôi thu thập thông tin cá nhân từ bạn khi bạn đăng ký tài khoản,
        sử dụng dịch vụ, tương tác với nội dung, và khi liên hệ với chúng tôi.
        Các thông tin được thu thập bao gồm tên, địa chỉ email, số điện thoại,
        thông tin vận chuyển và các chi tiết cần thiết khác để phục vụ nhu cầu
        sử dụng ứng dụng.
      </Text>

      <Text style={styles.sectionTitle}>2. Sử dụng thông tin</Text>
      <Text style={styles.sectionContent}>
        Thông tin cá nhân của bạn được sử dụng để cung cấp dịch vụ, cải thiện
        trải nghiệm người dùng, và gửi thông báo liên quan đến các dịch vụ của
        chúng tôi. Chúng tôi cũng có thể sử dụng thông tin để liên lạc với bạn
        về các thay đổi chính sách hoặc cập nhật mới.
      </Text>

      <Text style={styles.sectionTitle}>3. Bảo vệ thông tin</Text>
      <Text style={styles.sectionContent}>
        Chúng tôi cam kết bảo mật thông tin cá nhân của bạn bằng cách sử dụng
        các biện pháp bảo vệ phù hợp như mã hóa, lưu trữ an toàn, và hạn chế
        truy cập chỉ đối với nhân viên cần thiết. Tuy nhiên, chúng tôi không thể
        đảm bảo an toàn tuyệt đối trong mọi trường hợp.
      </Text>

      <Text style={styles.sectionTitle}>4. Chia sẻ thông tin</Text>
      <Text style={styles.sectionContent}>
        Chúng tôi không bán, trao đổi hay chuyển giao thông tin cá nhân của bạn
        cho bên thứ ba trừ khi có sự đồng ý của bạn, hoặc được yêu cầu bởi pháp
        luật. Các trường hợp ngoại lệ bao gồm cung cấp thông tin cho các đối tác
        vận chuyển nhằm hoàn thành dịch vụ được yêu cầu.
      </Text>

      <Text style={styles.sectionTitle}>5. Quyền của người dùng</Text>
      <Text style={styles.sectionContent}>
        Bạn có quyền truy cập, cập nhật, và yêu cầu xóa thông tin cá nhân của
        mình trong hệ thống của chúng tôi. Nếu bạn có bất kỳ thắc mắc nào về
        thông tin cá nhân, vui lòng liên hệ với chúng tôi qua các kênh hỗ trợ.
      </Text>

      <Text style={styles.sectionTitle}>6. Thay đổi chính sách</Text>
      <Text style={styles.sectionContent}>
        Chính sách bảo mật này có thể thay đổi định kỳ để phản ánh các thay đổi
        trong hoạt động kinh doanh hoặc yêu cầu pháp lý. Chúng tôi sẽ thông báo
        về các thay đổi quan trọng qua email hoặc thông báo trong ứng dụng.
      </Text>

      <Text style={styles.sectionTitle}>7. Liên hệ</Text>
      <Text style={styles.sectionContent}>
        Nếu bạn có câu hỏi hoặc quan ngại về chính sách bảo mật, vui lòng liên
        hệ với chúng tôi qua email tại: support@datinglogistic.com hoặc qua số
        điện thoại 0123-456-789.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'justify',
  },
});

export default PrivacyPolicy;
