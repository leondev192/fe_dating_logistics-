// src/screens/FeedbackScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import GradientButton from '../../components/button/GradientButton';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (!feedback.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập nội dung góp ý.');
      return;
    }

    // Bắt đầu hiển thị loading spinner
    setLoading(true);

    // Mô phỏng quá trình gửi phản hồi với thời gian chờ 3 giây
    setTimeout(() => {
      setLoading(false); // Tắt loading spinner
      Alert.alert('Thành công', 'Cảm ơn bạn đã đóng góp ý kiến!');
      setFeedback('');
      navigation.goBack(); // Điều hướng trở về màn hình trước
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingSpinner loading={loading} />}
      <TextInput
        style={styles.input}
        placeholder="Nhập ý kiến của bạn..."
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />
      <GradientButton onPress={handleSubmit} title="Gửi" />
      <LoadingSpinner loading={loading} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#F8F8F8',
    height: 150,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FF4081',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FeedbackScreen;
