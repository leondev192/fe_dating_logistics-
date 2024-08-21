import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view'; // Make sure this is correctly imported
import Colors from '../../constants/colors';

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
      <TouchableOpacity onPress={onPress} style={styles.innerButtonContainer}>
        {/* @ts-ignore */}
        <MaskedView
          maskElement={<Text style={styles.outlineText}>{title}</Text>}>
          <LinearGradient
            colors={Colors.gradientColors}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={[styles.outlineText, {opacity: 0}]}>{title}</Text>
          </LinearGradient>
        </MaskedView>
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
