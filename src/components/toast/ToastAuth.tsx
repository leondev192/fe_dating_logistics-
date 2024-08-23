import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Toast from 'react-native-toast-message';

// Định nghĩa kiểu cho props
interface CustomToastProps {
  text1: string;
  text2?: string;
}

// Component tùy chỉnh cho Toast
const CustomToast: React.FC<CustomToastProps> = props => {
  return (
    <View style={styles.customToastContainer}>
      <Image
        source={require('../../assets/images/success.png')}
        style={styles.icon}
      />
      <View>
        <Text style={styles.title}>{props.text1}</Text>
        {props.text2 ? (
          <Text style={styles.subtitle}>{props.text2}</Text>
        ) : null}
      </View>
    </View>
  );
};

// Cấu hình toast
export const toastConfig = {
  success: ({text1, text2}: {text1: string; text2?: string}) => (
    <CustomToast text1={text1} text2={text2} />
  ),
  error: ({text1, text2}: {text1: string; text2?: string}) => (
    <CustomToast text1={text1} text2={text2} />
  ),
};

const styles = StyleSheet.create({
  customToastContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Hiệu ứng mờ
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    maxWidth: '80%', // Để toast không quá lớn
    alignSelf: 'center',
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 15,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    color: '#ddd',
    fontSize: 14,
  },
});

export default CustomToast;
