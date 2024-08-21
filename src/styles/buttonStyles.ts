import {StyleSheet} from 'react-native';

// Định nghĩa colors riêng
export const GRADIENT_COLORS = ['#00d2ff', '#3a7bd5'];

export const buttonStyles = StyleSheet.create({
  outlineButton: {
    borderWidth: 1,
    borderColor: '#007bff',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: '100%',
    height: 58,
    marginVertical: 10,
  },
  outlineText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  solidButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: '100%',
    height: 58,
    marginVertical: 10,
  },
  solidText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
