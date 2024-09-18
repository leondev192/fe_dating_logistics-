import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {ArrowLeft3} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

const ArrowLeft = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <ArrowLeft3
        size="30"
        color="#1e232c"
        variant="Broken"
        style={{marginLeft: 20}}
      />
    </TouchableOpacity>
  );
};

export default ArrowLeft;
