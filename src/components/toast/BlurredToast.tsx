import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Toast, {
  ToastConfig,
  ToastConfigParams,
} from 'react-native-toast-message';
import {BlurView} from '@react-native-community/blur';
import CustomToast from './ToastAuth';

interface BlurredToastProps {
  config: ToastConfig;
}

const BlurredToast: React.FC<BlurredToastProps> = ({config}) => {
  const [isVisible, setIsVisible] = useState(false);

  const showToast = () => {
    setIsVisible(true);
  };

  const hideToast = () => {
    setIsVisible(false);
    Toast.hide(); // Tắt Toast khi được gọi
  };

  useEffect(() => {
    if (isVisible) {
      const timeoutId = setTimeout(() => {
        hideToast();
      }, 4000); // Đặt thời gian khớp với thời gian Toast tự động tắt

      return () => clearTimeout(timeoutId); // Xóa timeout nếu component bị unmount
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
      )}

      <Toast
        config={{
          ...config,
          success: (params: ToastConfigParams<any>) => (
            <CustomToast
              {...params}
              onPressOk={hideToast} // Truyền callback để ẩn Toast
            />
          ),
          error: (params: ToastConfigParams<any>) => (
            <CustomToast
              {...params}
              onPressOk={hideToast} // Truyền callback để ẩn Toast
            />
          ),
        }}
        onShow={showToast}
        onHide={hideToast} // Đảm bảo cập nhật trạng thái khi Toast tự động ẩn
      />
    </>
  );
};

export default BlurredToast;
