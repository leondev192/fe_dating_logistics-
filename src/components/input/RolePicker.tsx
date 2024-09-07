// RolePicker.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Category} from 'iconsax-react-native';
import Colors from '../../constants/colors';

interface RolePickerProps {
  role: string;
  setRole: (value: string) => void;
}

const RolePicker: React.FC<RolePickerProps> = ({role, setRole}) => {
  return (
    <View style={styles.pickerContainer}>
      <Category size="20" color={Colors.icon} style={styles.pickerIcon} />
      <RNPickerSelect
        onValueChange={value => setRole(value)}
        items={[
          {label: 'Doanh nghiệp có hàng hóa nhỏ, lẻ', value: 'customer'},
          {label: 'Doanh nghiệp cung cấp dịch vụ vận tải', value: 'carrier'},
        ]}
        style={{
          inputIOS: styles.pickerInputIOS,
          inputAndroid: styles.pickerInputAndroid,
          iconContainer: styles.iconContainer,
          placeholder: {
            color: Colors.placeholder,
            textAlignVertical: 'center',
          },
        }}
        useNativeAndroidPickerStyle={false}
        placeholder={{
          label: 'Chọn vai trò...',
          value: null,
          color: '#9EA0A4',
        }}
        value={role}
        Icon={() => null} // Loại bỏ icon tự động của RNPickerSelect
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.bordercolor,
    borderRadius: 50,
    height: 56,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  pickerIcon: {
    position: 'absolute', // Giữ icon cố định bên trái
    marginLeft: 20,
  },
  pickerInputIOS: {
    flex: 1,
    fontSize: 14,
    color: Colors.textbody,
    paddingVertical: 25,
    paddingLeft: 50, // Để chữ không bị đè lên icon
    textAlignVertical: 'center',
  },
  pickerInputAndroid: {
    flex: 1,
    fontSize: 16,
    color: Colors.textbody,
    paddingVertical: 8,
    paddingLeft: 40, // Để chữ không bị đè lên icon
    textAlignVertical: 'center',
  },
  iconContainer: {
    display: 'none', // Ẩn icon tự động của RNPickerSelect
  },
});

export default RolePicker;
