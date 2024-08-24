import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Colors from '../../constants/colors';

interface GradientTextProps {
  text: string;
  style?: object;
}

const GradientText: React.FC<GradientTextProps> = ({text, style}) => {
  return (
    <View>
      <MaskedView
        maskElement={<Text style={[styles.text, style]}>{text}</Text>}>
        <LinearGradient
          colors={Colors.gradientColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={[styles.text, style, {opacity: 0}]}>{text}</Text>
        </LinearGradient>
      </MaskedView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GradientText;
