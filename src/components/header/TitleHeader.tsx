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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#1e232c',
    fontWeight: 'bold',
  },
});

export default TitleHeader;
