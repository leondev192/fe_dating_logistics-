import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {buttonStyles, GRADIENT_COLORS} from '../../styles/buttonStyles';

interface OutlineButtonProps {
  title: string;
  onPress: () => void;
}

const OutlineButton: React.FC<OutlineButtonProps> = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles.outlineButton}>
      <Text style={buttonStyles.outlineText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OutlineButton;
