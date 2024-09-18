import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, Linking} from 'react-native';
import ImageUploader from '../../components/image/ImageUploaderMessage';
import {
  getConversationDetails,
  updateContractImage,
} from '../../apis/services/chatService';
import GradientButton from '../../components/button/OutlineButton';

const ConversationDetailScreen = ({route}) => {
  const {conversationId} = route.params;
  const [contractImageUrl, setContractImageUrl] = useState('');
  const [loading, setLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    // Hàm fetch lại chi tiết cuộc hội thoại và cập nhật URL ảnh hợp đồng
    const fetchConversation = async () => {
      try {
        const data = await getConversationDetails(conversationId);
        console.log('Response data từ API:', data);

        if (data && data.contractImageUrl) {
          setContractImageUrl(data.contractImageUrl);
        } else {
          console.log('Không có ảnh hợp đồng cho cuộc trò chuyện này.');
          setContractImageUrl('');
        }
      } catch (error) {
        console.error('Error fetching conversation:', error);
        Alert.alert('Lỗi', 'Không thể tải thông tin cuộc trò chuyện.');
      } finally {
        setLoading(false); // Dừng loading khi hoàn thành
      }
    };

    fetchConversation();
  }, [conversationId]); // Khi component mount hoặc conversationId thay đổi

  // Xử lý upload ảnh hợp đồng
  const handleImageUpload = async (url: string) => {
    try {
      await updateContractImage(conversationId, url);
      setContractImageUrl(url); // Cập nhật URL ảnh vào state
      Alert.alert('Thành công', 'Ảnh hợp đồng đã được cập nhật.');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật ảnh hợp đồng.');
      console.error('Error updating contract image:', error);
    }
  };

  // Xử lý mở URL ảnh hợp đồng trong trình duyệt
  const handleDownloadContract = () => {
    if (contractImageUrl) {
      Linking.openURL(contractImageUrl).catch(err => {
        console.error('Không thể mở URL:', err);
        Alert.alert('Lỗi', 'Không thể mở ảnh hợp đồng.');
      });
    } else {
      Alert.alert('Không có ảnh hợp đồng để tải về');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ImageUploader
        onImageUpload={handleImageUpload}
        currentImageUrl={contractImageUrl}
      />
      {!loading && ( // Chỉ hiển thị sau khi dữ liệu được load xong
        <>
          {contractImageUrl ? (
            <View style={styles.downloadButton}>
              <GradientButton
                onPress={handleDownloadContract}
                title="Tải hợp đồng"
              />
            </View>
          ) : (
            <Text style={styles.noContractText}>
              Chưa có ảnh hợp đồng. Vui lòng tải lên.
            </Text>
          )}

          <View style={styles.contractPolicyContainer}>
            <Text style={styles.policyTitle}>Chính sách hợp đồng</Text>
            <Text style={styles.sectionTitle}>1. Thu thập thông tin</Text>
            <Text style={styles.sectionContent}>
              Chúng tôi thu thập thông tin doanh nghiệp bao gồm: tên công ty,
              địa chỉ, mã số thuế, thông tin vận chuyển, thông tin hàng hóa, và
              các chi tiết cần thiết khác để phục vụ nhu cầu ghép đôi và vận
              chuyển hàng hóa.
            </Text>

            <Text style={styles.sectionTitle}>2. Sử dụng thông tin</Text>
            <Text style={styles.sectionContent}>
              Thông tin được sử dụng để hỗ trợ quá trình ghép đôi vận chuyển,
              cung cấp dịch vụ vận tải, và cải thiện trải nghiệm người dùng.
              Dating Logistics có quyền sử dụng thông tin này để gửi thông báo
              và cập nhật quan trọng.
            </Text>

            <Text style={styles.sectionTitle}>3. Bảo vệ thông tin</Text>
            <Text style={styles.sectionContent}>
              Dating Logistics cam kết bảo mật thông tin doanh nghiệp và hàng
              hóa của người dùng. Chúng tôi sẽ áp dụng các biện pháp bảo vệ an
              toàn như mã hóa và lưu trữ thông tin một cách an toàn. Tuy nhiên,
              chúng tôi không đảm bảo tuyệt đối trong mọi trường hợp, người dùng
              cần tự bảo mật thông tin đăng nhập của mình.
            </Text>

            <Text style={styles.sectionTitle}>4. Chia sẻ thông tin</Text>
            <Text style={styles.sectionContent}>
              Dating Logistics chỉ chia sẻ thông tin giữa các đối tác liên quan
              trong quá trình ghép đôi và vận chuyển. Chúng tôi sẽ không chia sẻ
              hoặc bán thông tin cho bên thứ ba mà không có sự đồng ý của người
              dùng, trừ khi được yêu cầu bởi pháp luật.
            </Text>

            <Text style={styles.sectionTitle}>
              5. Quyền và trách nhiệm của người dùng
            </Text>
            <Text style={styles.sectionContent}>
              Người dùng có quyền truy cập, cập nhật và xóa thông tin cá nhân
              hoặc doanh nghiệp của mình. Đồng thời, người dùng chịu trách nhiệm
              cung cấp thông tin chính xác và tuân thủ các quy định khi tham gia
              giao dịch trên nền tảng.
            </Text>

            <Text style={styles.sectionTitle}>6. Xử lý tranh chấp</Text>
            <Text style={styles.sectionContent}>
              Trong trường hợp tranh chấp, các bên được khuyến khích tự giải
              quyết thông qua thương lượng trực tiếp. Nếu tranh chấp không được
              giải quyết, Dating Logistics sẽ can thiệp để hỗ trợ các bên thông
              qua quy trình giải quyết tranh chấp.
            </Text>

            <Text style={styles.sectionTitle}>7. Thay đổi chính sách</Text>
            <Text style={styles.sectionContent}>
              Chính sách này có thể thay đổi mà không cần thông báo trước.
              Dating Logistics sẽ công khai thay đổi quan trọng trên nền tảng
              hoặc gửi email tới người dùng nếu cần thiết.
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  noContractText: {
    fontSize: 16,
    color: '#FF4081',
    textAlign: 'center',
    marginTop: 10,
  },
  downloadButton: {
    marginTop: 20,
  },
  contractPolicyContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  policyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    lineHeight: 22,
  },
});

export default ConversationDetailScreen;
