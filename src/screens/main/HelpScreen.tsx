// src/screens/HelpScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const helpTopics = [
  {
    id: '1',
    question: 'Cách sử dụng dịch vụ ghép hàng?',
    answer: 'Để sử dụng, bạn cần đăng ký và tìm kiếm các dịch vụ phù hợp.',
  },
  {
    id: '2',
    question: 'Làm sao để liên hệ với nhà vận tải?',
    answer:
      'Bạn có thể liên hệ trực tiếp thông qua mục Liên hệ trên mỗi bài đăng.',
  },
  {
    id: '3',
    question: 'Làm sao để đăng ký tài khoản?',
    answer:
      'Bạn có thể đăng ký tài khoản mới bằng cách nhấn vào nút Đăng ký trên màn hình chính và điền thông tin cá nhân cần thiết.',
  },
  {
    id: '4',
    question: 'Cách tạo bài đăng tìm kiếm vận chuyển?',
    answer:
      'Vào mục Tạo bài đăng, chọn Tìm vận chuyển, sau đó điền thông tin chi tiết về loại hàng hóa, điểm đi và đến.',
  },
  {
    id: '5',
    question: 'Cách cập nhật thông tin cá nhân?',
    answer:
      'Bạn có thể cập nhật thông tin cá nhân bằng cách vào mục Tài khoản và chọn Chỉnh sửa thông tin.',
  },
  {
    id: '6',
    question: 'Làm thế nào để hủy ghép đôi?',
    answer:
      'Bạn có thể hủy ghép đôi bằng cách liên hệ trực tiếp với đối tác qua mục Tin nhắn và thỏa thuận việc hủy giao dịch.',
  },
  {
    id: '7',
    question: 'Phương thức thanh toán được hỗ trợ là gì?',
    answer:
      'Ứng dụng hỗ trợ nhiều phương thức thanh toán như chuyển khoản ngân hàng và thanh toán trực tuyến qua các ví điện tử.',
  },
  {
    id: '8',
    question: 'Làm sao để đánh giá nhà vận tải?',
    answer:
      'Sau khi kết thúc giao dịch, bạn có thể đánh giá nhà vận tải thông qua mục Đánh giá trên bài đăng.',
  },
  {
    id: '9',
    question: 'Cách bảo mật tài khoản?',
    answer:
      'Hãy sử dụng mật khẩu mạnh và không chia sẻ thông tin đăng nhập của bạn với bất kỳ ai. Kích hoạt bảo mật hai lớp nếu có sẵn.',
  },
  {
    id: '10',
    question: 'Làm sao để tìm kiếm các bài đăng phù hợp?',
    answer:
      'Bạn có thể sử dụng tính năng tìm kiếm trong ứng dụng để lọc các bài đăng phù hợp với nhu cầu vận chuyển của bạn.',
  },
  {
    id: '11',
    question:
      'Tôi có thể thay đổi vai trò từ khách hàng sang nhà vận tải không?',
    answer:
      'Bạn có thể thay đổi vai trò trong mục Tài khoản, nhưng cần liên hệ với bộ phận hỗ trợ để hoàn tất quá trình chuyển đổi.',
  },
  {
    id: '12',
    question: 'Làm thế nào để liên hệ với bộ phận hỗ trợ?',
    answer:
      'Bạn có thể liên hệ với bộ phận hỗ trợ qua email: support@datinglogistic.com hoặc qua số điện thoại 0123-456-789.',
  },
  {
    id: '13',
    question: 'Làm thế nào để tăng cường bảo mật tài khoản?',
    answer:
      'Hãy đảm bảo mật khẩu của bạn là duy nhất và khó đoán, không chia sẻ mật khẩu với người khác, và sử dụng bảo mật hai lớp nếu có sẵn.',
  },
  {
    id: '14',
    question: 'Cách xử lý khi không tìm thấy đối tác ghép đôi?',
    answer:
      'Nếu không tìm thấy đối tác phù hợp, hãy thử điều chỉnh các tiêu chí tìm kiếm hoặc liên hệ bộ phận hỗ trợ để được tư vấn.',
  },
  {
    id: '15',
    question: 'Tôi có thể xóa bài đăng không?',
    answer:
      'Bạn có thể xóa bài đăng của mình trong phần Quản lý bài đăng trên trang cá nhân.',
  },
  {
    id: '16',
    question: 'Ứng dụng có tính phí không?',
    answer:
      'Một số dịch vụ trên ứng dụng có thể yêu cầu phí. Chi tiết về phí sẽ được thông báo trước khi bạn xác nhận sử dụng dịch vụ.',
  },
  {
    id: '17',
    question: 'Làm thế nào để nhận thông báo về các bài đăng mới?',
    answer:
      'Bạn có thể bật thông báo từ ứng dụng trong phần Cài đặt để nhận thông tin về các bài đăng mới và các đề xuất phù hợp.',
  },
  {
    id: '18',
    question: 'Làm thế nào để báo cáo bài đăng xấu?',
    answer:
      'Bạn có thể báo cáo bài đăng vi phạm bằng cách nhấn vào nút Báo cáo trên bài đăng và chọn lý do thích hợp.',
  },
  {
    id: '19',
    question: 'Cách giải quyết tranh chấp với đối tác?',
    answer:
      'Trong trường hợp có tranh chấp, hãy liên hệ trực tiếp với đối tác qua mục Tin nhắn hoặc liên hệ bộ phận hỗ trợ của chúng tôi để được hỗ trợ.',
  },
  {
    id: '20',
    question: 'Làm thế nào để thay đổi mật khẩu?',
    answer:
      'Bạn có thể thay đổi mật khẩu trong phần Cài đặt tài khoản, mục Đổi mật khẩu và làm theo hướng dẫn.',
  },
];

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={helpTopics}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.topicContainer}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4081',
    marginBottom: 10,
  },
  topicContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
  },
  question: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  answer: {
    fontSize: 13,
    color: '#666',
    marginTop: 5,
  },
});

export default HelpScreen;
