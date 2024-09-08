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
import {SearchNormal, Filter} from 'iconsax-react-native';
import Colors from '../../constants/colors';

interface CustomHeaderProps {
  title?: string;
  showSearch?: boolean;
  showLogo?: boolean;
  onPressSearch?: () => void;
  onPressFilter?: () => void; // Add filter button press function
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showSearch,
  showLogo,
  onPressSearch,
  onPressFilter, // Handle filter button press
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
              <SearchNormal size={25} style={styles.searchIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={onPressFilter}>
              <Filter size={25} color={Colors.primary} />
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
    marginTop: 10,
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
    backgroundColor: Colors.bordercolor,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
  },
  searchIcon: {
    marginLeft: 5,
    color: Colors.primary,
  },
  searchPlaceholder: {
    color: '#6a6a6a',
    flex: 1,
  },
  filterButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: Colors.bordercolor,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default CustomHeader;
