import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {buttonStyles, GRADIENT_COLORS} from '../../styles/buttonStyles';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles.solidButton}>
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={buttonStyles.solidButton}>
        <Text style={buttonStyles.solidText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
