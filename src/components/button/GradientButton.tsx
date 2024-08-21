import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/colors';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.solidButton}>
      <LinearGradient
        colors={Colors.gradientColors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.solidButton}>
        <Text style={styles.solidText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default GradientButton;
