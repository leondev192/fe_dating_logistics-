import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface TitleHeaderProps {
  title: string;
}
const TitleHeader: React.FC<TitleHeaderProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensure it takes the entire width of the header
  },
  title: {
    fontSize: 18,
    color: '#1e232c',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TitleHeader;
