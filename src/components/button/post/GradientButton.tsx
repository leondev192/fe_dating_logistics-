import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../../constants/colors';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  style?: object; // Allow custom styles to be passed
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <LinearGradient
          colors={Colors.gradientColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradientBackground}>
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
  button: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradientBackground: {
    height: 39, // Set the height to 38
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GradientButton;
