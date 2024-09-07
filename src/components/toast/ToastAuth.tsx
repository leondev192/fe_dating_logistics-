import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ToastConfig,
  ToastConfigParams,
  ToastType,
} from 'react-native-toast-message';
import Colors from '../../constants/colors'; // Đảm bảo đường dẫn đến Colors là chính xác

interface CustomToastProps {
  text1?: string;
  text2?: string;
  type: ToastType;
  onPressOk: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({
  text1,
  text2,
  type,
  onPressOk,
}) => {
  return (
    <View style={styles.toastContainer}>
      <Image
        source={
          type === 'success'
            ? require('../../assets/images/success.png')
            : require('../../assets/images/Error.png')
        }
        style={styles.icon}
      />
      <Text style={styles.mainText}>{text1}</Text>
      <Text style={styles.subText}>{text2}</Text>
      <TouchableOpacity onPress={onPressOk} style={styles.okButton}>
        <LinearGradient
          colors={Colors.gradientColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.okButtonGradient}>
          <Text style={styles.okButtonText}>OK</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export const toastConfig: ToastConfig = {
  success: ({text1, text2, props}: ToastConfigParams<any>) => (
    <CustomToast
      text1={text1}
      text2={text2}
      type="success"
      onPressOk={props.onPressOk}
    />
  ),
  error: ({text1, text2, props}: ToastConfigParams<any>) => (
    <CustomToast
      text1={text1}
      text2={text2}
      type="error"
      onPressOk={props.onPressOk}
    />
  ),
  // Thêm các kiểu khác như 'info' nếu cần
};

const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 50,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#6A707C',
    textAlign: 'center',
    marginBottom: 20,
  },
  okButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  okButtonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  okButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CustomToast;
