// src/screens/GuideScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Colors from '../../constants/colors';

const GuideScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Trang Chủ</Text>
        <Text style={styles.description}>
          Trang chủ là nơi bạn có thể xem các bài đăng về việc tìm xe hoặc cung
          cấp dịch vụ vận chuyển. Bạn có thể tìm kiếm và kết nối với đối tác phù
          hợp một cách dễ dàng.
        </Text>
        <Text style={styles.steps}>
          - **Bước 1:** Tại trang chủ, danh sách các bài đăng sẽ hiển thị. Sử
          dụng bộ lọc để chọn loại bài đăng phù hợp như "Tìm vận chuyển" hay
          "Cung cấp vận chuyển".{'\n'}- **Bước 2:** Chọn bài đăng bạn quan tâm
          để xem thông tin chi tiết về hàng hóa hoặc dịch vụ vận chuyển.{'\n'}-
          **Bước 3:** Nhấn nút "Liên hệ" để kết nối và trao đổi trực tiếp với
          đối tác về các chi tiết cần thiết.
        </Text>
      </View>

      {/* Section for Post Management Screen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Quản Lý Tin</Text>
        <Text style={styles.description}>
          Trang Quản lý tin giúp bạn theo dõi và quản lý tất cả các bài đăng của
          mình. Bạn có thể dễ dàng chỉnh sửa hoặc tạo mới các bài đăng tìm xe
          hoặc cung cấp dịch vụ vận chuyển.
        </Text>
        <Text style={styles.steps}>
          - **Bước 1:** Vào trang Quản lý tin để xem tất cả các bài đăng của
          bạn.{'\n'}- **Bước 2:** Sử dụng các tab để chọn loại bài đăng: "Tìm
          xe", "Cung cấp xe", hoặc "Theo dõi".{'\n'}- **Bước 3:** Nhấn vào nút
          "Đăng tin" để bắt đầu tạo bài đăng mới với thông tin chi tiết về hàng
          hóa hoặc dịch vụ vận chuyển.
        </Text>
      </View>

      {/* Section for Messages Screen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Tin Nhắn</Text>
        <Text style={styles.description}>
          Mục Tin nhắn hiển thị tất cả các cuộc trò chuyện với đối tác. Bạn có
          thể sử dụng phần này để trao đổi chi tiết về các thỏa thuận hoặc thắc
          mắc liên quan đến bài đăng.
        </Text>
        <Text style={styles.steps}>
          - **Bước 1:** Nhấn vào biểu tượng Tin nhắn trên thanh điều hướng phía
          dưới màn hình.{'\n'}- **Bước 2:** Tại đây, danh sách các cuộc trò
          chuyện sẽ được hiển thị. Chọn cuộc trò chuyện mà bạn muốn xem.{'\n'}-
          **Bước 3:** Sử dụng hộp thoại để nhắn tin và trao đổi với đối tác về
          chi tiết của bài đăng hoặc các thỏa thuận.
        </Text>
      </View>

      {/* Section for Profile Screen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Trang Cá Nhân</Text>
        <Text style={styles.description}>
          Trang Cá nhân hiển thị thông tin của bạn và cho phép bạn quản lý tài
          khoản, chỉnh sửa thông tin cá nhân, xem các chính sách bảo mật, trợ
          giúp và đóng góp ý kiến.
        </Text>
        <Text style={styles.steps}>
          - **Bước 1:** Vào trang Cá nhân để xem thông tin tài khoản của bạn như
          tên, email, và các thông tin doanh nghiệp.{'\n'}- **Bước 2:** Chọn
          "Thông tin doanh nghiệp" để chỉnh sửa thông tin cá nhân và cập nhật
          ảnh đại diện.{'\n'}- **Bước 3:** Các mục khác như "Chính sách bảo
          mật", "Trợ giúp" và "Đóng góp ý kiến" giúp bạn tìm hiểu thêm và tương
          tác với hệ thống.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  steps: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default GuideScreen;
