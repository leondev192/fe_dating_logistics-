import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Eye, EyeSlash, User, Lock, Message} from 'iconsax-react-native';
import Colors from '../../constants/colors';

interface InputComponentProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  isPassword?: boolean;
  iconName?: 'user' | 'lock' | 'message';
  hasError?: boolean;
  errorMessage?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  isPassword,
  iconName,
  hasError = false,
  errorMessage = '',
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const renderIcon = () => {
    switch (iconName) {
      case 'user':
        return <User size="20" color={Colors.icon} />;
      case 'lock':
        return <Lock size="20" color={Colors.icon} />;
      case 'message':
        return <Message size="20" color={Colors.icon} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          hasError && {borderColor: Colors.error}, // Use the error color from Colors
        ]}>
        {iconName && <View style={styles.icon}>{renderIcon()}</View>}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholder}
          secureTextEntry={isPassword && !isPasswordVisible}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}>
            {isPasswordVisible ? (
              <Eye size="20" color={Colors.icon} />
            ) : (
              <EyeSlash size="20" color={Colors.icon} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {hasError && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.bordercolor,
    borderRadius: 50,
    height: 56,
    backgroundColor: '#fff',
  },
  icon: {
    padding: 10,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  eyeIcon: {
    padding: 10,
    marginRight: 10,
  },
  errorText: {
    color: Colors.error, // Use the error color from Colors
    fontSize: 14,
    marginTop: 5,
  },
});

export default InputComponent;
