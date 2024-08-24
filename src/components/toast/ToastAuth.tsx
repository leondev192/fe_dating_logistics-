import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ToastConfig, ToastConfigParams} from 'react-native-toast-message';

interface CustomToastProps {
  text1?: string;
  text2?: string;
  type: 'success' | 'error';
}

const CustomToast: React.FC<CustomToastProps> = ({text1, text2, type}) => {
  const textColor = type === 'success' ? styles.successText : styles.errorText;

  return (
    <View style={styles.customToastContainer}>
      <Image
        source={
          type === 'success'
            ? require('../../assets/images/success.png')
            : require('../../assets/images/Error.png')
        }
        style={styles.icon}
      />
      <View>
        <Text style={[styles.title, textColor]}>{text1}</Text>
        {text2 ? (
          <Text style={[styles.subtitle, textColor]}>{text2}</Text>
        ) : null}
      </View>
    </View>
  );
};

export const toastConfig: ToastConfig = {
  success: ({text1, text2}: ToastConfigParams<any>) => (
    <CustomToast text1={text1} text2={text2} type="success" />
  ),
  error: ({text1, text2}: ToastConfigParams<any>) => (
    <CustomToast text1={text1} text2={text2} type="error" />
  ),
};

const styles = StyleSheet.create({
  customToastContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#DEF7FF',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    maxWidth: '95%',
    alignSelf: 'center',
    marginTop: '15%',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
  },
  successText: {
    color: 'green',
  },
  errorText: {
    color: 'red',
  },
});

export default CustomToast;
