import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/colors';
import GradientText from '../text/GradientText';

interface OutlineButtonProps {
  title: string;
  onPress: () => void;
}

const OutlineButton: React.FC<OutlineButtonProps> = ({title, onPress}) => {
  return (
    <LinearGradient
      colors={Colors.gradientColors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.gradientBorder}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.innerButtonContainer}
        activeOpacity={1}>
        <GradientText text={title} style={styles.outlineText} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBorder: {
    padding: 1.5,
    borderRadius: 30,
    width: '100%',
  },
  innerButtonContainer: {
    backgroundColor: '#fff',
    borderRadius: 28,
    width: '100%',
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default OutlineButton;
