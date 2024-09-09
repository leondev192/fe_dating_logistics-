// OutlineButton.tsx
import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../../constants/colors';
import GradientText from '../../text/GradientText';

interface OutlineButtonProps {
  title: string;
  onPress: () => void;
  style?: object; // Allow custom styles to be passed
}

const OutlineButton: React.FC<OutlineButtonProps> = ({
  title,
  onPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
  gradientBorder: {
    padding: 1.5,
    borderRadius: 30,
    width: '100%',
  },
  innerButtonContainer: {
    backgroundColor: '#fff',
    borderRadius: 28,
    height: 38,
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
