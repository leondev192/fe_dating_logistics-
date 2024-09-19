import axios from 'axios';

// API key Cohere của bạn
const COHERE_API_KEY = '84ShicbUVWmEct2IG41EFiuAU4OLL8ARggbNIlHO';

// Hàm gọi API Cohere và tạo phản hồi dựa trên ngữ cảnh
export const generateTextWithCohere = async (userMessage: string) => {
  const prompt = `
  Bạn là một trợ lý AI chuyên hỗ trợ các doanh nghiệp trên nền tảng Dating Logistics. Đây là một hệ thống trung gian giúp kết nối các doanh nghiệp có nhu cầu vận chuyển hàng hóa với các nhà cung cấp dịch vụ vận tải. Hệ thống này có hai loại bài đăng chính:
  
  1. **Bài đăng của doanh nghiệp có hàng hóa**: Doanh nghiệp nhỏ lẻ có thể đăng bài tìm kiếm nhà cung cấp dịch vụ vận tải, cung cấp thông tin chi tiết về loại hàng hóa, trọng lượng, địa điểm khởi hành và điểm đến, thời gian vận chuyển mong muốn, và các yêu cầu cụ thể.
  
  2. **Bài đăng của nhà cung cấp dịch vụ vận tải**: Nhà cung cấp dịch vụ vận tải có thể đăng bài giới thiệu về dịch vụ của họ, bao gồm loại xe có sẵn, khu vực phục vụ, và thời gian vận chuyển. Họ có thể tìm kiếm các doanh nghiệp nhỏ lẻ có nhu cầu vận chuyển.

  Đây là nền tảng trung gian giữa các doanh nghiệp nhỏ lẻ và các nhà vận tải, giúp họ kết nối với nhau một cách hiệu quả, tối ưu hóa chi phí vận chuyển và thời gian.
  -  đây là hệ thống  ở việt nam nhé (hệ thống này chỉ mới phát triển ứng dụng android và ios tương lai sẻ có web sau nhé)
  - Hotline: 0333892809
  Khi trả lời người dùng, bạn cần đọc và hiểu các thông tin trên và cung cấp câu trả lời hợp lý ngắn gọn trên nhu cầu cụ thể của họ. Hãy xem xét trọng lượng hàng hóa, địa điểm khởi hành, địa điểm nhận hàng, và các điều kiện vận chuyển khác. 
  - Chi phí đăng bài là 50.000 VND 1 lần đăng bài(chỉ nói về chi phí khi người dùng hỏi về vấn đề liên quan thôi)
  - để đăng được bài cần hoàn thành cập nhật đầy đủ thông tin doanh nghiệp thì mới được đăng bài nhé(khi người dùng hỏi vấn đề liên quan mới nhắc tới)


  lưu ý trả lời người dùng ngắn gọn nhất có thể ngắn gọn xúc tích dể hiểu dựa trên yêu cầu người dùng
  Dưới đây là yêu cầu của người dùng:
  
  Người dùng: ${userMessage}
  AI:
  `;

  try {
    const response = await axios.post(
      'https://api.cohere.ai/generate',
      {
        model: 'command-xlarge-nightly', // Model đã được hỗ trợ
        prompt: prompt, // Prompt chứa thông tin chi tiết về hệ thống Dating Logistics
        max_tokens: 1000, // Giới hạn token cao để không bị cắt ngắn phản hồi
        temperature: 0.7, // Độ ngẫu nhiên ở mức vừa phải
        stop_sequences: ['AI:'], // Ngắt câu trả lời nếu quá dài
        return_likelihoods: 'NONE', // Không trả về xác suất
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${COHERE_API_KEY}`, // Đảm bảo API key được cung cấp chính xác
        },
      },
    );

    // console.log('Cohere API Response:', response.data); // Log chi tiết phản hồi từ API

    // Kiểm tra phản hồi có trường `text` không và trả về nếu có
    if (response.data && response.data.text) {
      return response.data.text.trim(); // Trả về văn bản đã được tạo từ Cohere
    } else {
      throw new Error('Không tìm thấy văn bản hợp lệ trong phản hồi');
    }
  } catch (error) {
    console
      .error
      //   'Lỗi Cohere API:',
      //   error.response ? error.response.data : error.message,
      ();
    throw error;
  }
};
