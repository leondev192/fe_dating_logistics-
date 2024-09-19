import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colorfilter, Notification} from 'iconsax-react-native'; // Import Notification từ Iconsax
import Colors from '../../constants/colors';
import {getUserInfo} from '../../apis/services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type RootStackParamList = {
  Filter: undefined;
  Notifications: undefined;
};

interface CustomHeaderProps {
  onPressFilter?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = () => {
  const [userName, setUserName] = useState<string>('Người dùng');
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null,
  );
  const [displayText, setDisplayText] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const userInfo = await getUserInfo(token);
          const shortenedName = truncateName(
            userInfo.companyName || 'Người dùng',
          );
          setUserName(shortenedName);
          setProfilePictureUrl(userInfo.profilePictureUrl || null);
          startTypingEffect(shortenedName);
        }
      } catch (error) {}
    };

    fetchUserInfo();
  }, []);

  const startTypingEffect = (text: string) => {
    let index = 0;
    setDisplayText('');
    const typeLetter = () => {
      if (index < text.length) {
        setDisplayText(prev => prev + text[index]);
        index++;
        setTimeout(typeLetter, 200);
      } else {
        setTimeout(() => {
          startTypingEffect(text);
        }, 4000);
      }
    };

    typeLetter();
  };

  const truncateName = (name: string, maxLength: number = 25) => {
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };

  // Xử lý khi nhấn nút lọc
  const handleFilterPress = () => {
    navigation.navigate('Filter');
  };

  // Xử lý khi nhấn nút thông báo
  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#FF358A', '#110088']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradientBorder}>
        <View style={styles.headerContainer}>
          <Image
            source={
              profilePictureUrl
                ? {uri: profilePictureUrl}
                : require('../../assets/images/log.png')
            }
            style={styles.avatar}
          />
          <View style={styles.textWrapper}>
            <Text style={styles.welcomeText}>Xin chào, </Text>
            <Animated.Text style={styles.typingText}>
              {displayText}
            </Animated.Text>
          </View>
          {/* Nút Lọc */}
          <TouchableOpacity
            style={styles.filterButton}
            onPress={handleFilterPress}>
            <Colorfilter size={25} color={Colors.primary} />
          </TouchableOpacity>
          {/* Nút Thông Báo */}
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={handleNotificationPress}>
            <Notification size={24} color={Colors.primary} variant="Outline" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
    paddingBottom: -80,
    marginTop: 0.5,
  },
  gradientBorder: {
    borderRadius: 50,
    padding: 1.5,
    marginBottom: 5,
  },
  headerContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: -3,
    marginRight: 10,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.primary,
    fontStyle: 'italic',
  },
  typingText: {
    fontSize: 14,
    color: Colors.primary,
    fontStyle: 'italic',
  },
  filterButton: {
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationButton: {
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomHeader;
