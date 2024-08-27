import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface OtpInputComponentProps {
  length: number;
  onChange: (value: string) => void;
}

const OtpInputComponent: React.FC<OtpInputComponentProps> = ({
  length,
  onChange,
}) => {
  const [otp, setOtp] = useState('');
  const inputRef = useRef<TextInput | null>(null); // Cập nhật kiểu dữ liệu

  const handleOtpChange = (value: string) => {
    if (value.length <= length) {
      setOtp(value);
      onChange(value);
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Kiểm tra null trước khi gọi focus()
    }
  };

  return (
    <View style={styles.otpContainer}>
      <TouchableOpacity
        onPress={focusInput}
        style={styles.otpBoxesContainer}
        activeOpacity={1}>
        {Array.from({length}, (_, i) => (
          <View key={i} style={styles.otpBox}>
            <Text style={styles.otpText}>{otp[i] || ''}</Text>
          </View>
        ))}
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        style={styles.hiddenInput}
        value={otp}
        onChangeText={handleOtpChange}
        keyboardType="number-pad"
        maxLength={length}
        textContentType="oneTimeCode"
        autoFocus={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  otpBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  otpBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpText: {
    fontSize: 18,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
  },
});

export default OtpInputComponent;
