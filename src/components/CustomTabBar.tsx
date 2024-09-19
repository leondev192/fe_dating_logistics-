// src/components/CustomTabBar.tsx
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Home, SearchNormal, Notification, Profile} from 'iconsax-react-native';
import Colors from '../constants/colors';

const {width} = Dimensions.get('window');

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const IconComponent = (() => {
          switch (route.name) {
            case 'Home':
              return Home;
            case 'Search':
              return SearchNormal;
            case 'ManagePosts':
              return Profile;
            case 'Notifications':
              return Notification;
            default:
              return Home;
          }
        })();

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}>
            <View
              style={[
                styles.iconWrapper,
                isFocused && styles.activeIconWrapper,
              ]}>
              <IconComponent
                size={isFocused ? 35 : 24}
                color={isFocused ? '#fff' : '#999'}
              />
            </View>
            <Text
              style={[
                styles.label,
                isFocused ? styles.activeLabel : styles.inactiveLabel,
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    width: width - 40,
    height: 70,
    marginHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 15,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconWrapper: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    top: -30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    elevation: 10,
  },
  label: {
    fontSize: 12,
    marginTop: 5,
  },
  activeLabel: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  inactiveLabel: {
    color: '#999',
  },
});

export default CustomTabBar;
