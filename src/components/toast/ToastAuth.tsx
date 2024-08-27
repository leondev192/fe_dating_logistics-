import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  ToastConfig,
  ToastConfigParams,
  ToastType,
} from 'react-native-toast-message';

interface CustomToastProps {
  text1?: string;
  text2?: string;
  type: ToastType; // Sử dụng ToastType từ thư viện
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
      <TouchableOpacity style={styles.okButton} onPress={onPressOk}>
        <Text style={styles.okButtonText}>OK</Text>
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
    backgroundColor: '#2495F4',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
  },
  okButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CustomToast;
