import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SearchNormal, NotificationBing} from 'iconsax-react-native';

interface CustomHeaderProps {
  title?: string;
  showSearch?: boolean;
  showLogo?: boolean;
  onPressSearch?: () => void;
  onPressMessage?: () => void;
  onPressNotification?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showSearch,
  showLogo,
  onPressSearch,
  onPressMessage,
  onPressNotification,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {showLogo && (
          <Image
            source={require('../../assets/images/log.png')}
            style={styles.logo}
          />
        )}
        {showSearch && (
          <View style={styles.searchWrapper}>
            <TouchableOpacity
              style={styles.searchContainer}
              onPress={onPressSearch}>
              <Text style={styles.searchPlaceholder}>Tìm kiếm...</Text>
              <SearchNormal size={25} color="#000" style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
        )}
        {title && <Text style={styles.headerText}>{title}</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    height: 50,
    marginBottom: Platform.OS === 'ios' ? -30 : 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  headerText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
  },
  searchIcon: {
    marginLeft: 5,
  },
  searchPlaceholder: {
    color: '#6a6a6a',
    flex: 1,
  },
  notificationButton: {
    marginLeft: 10,
  },
});

export default CustomHeader;
