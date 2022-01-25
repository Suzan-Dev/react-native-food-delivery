import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Svg, {Path} from 'react-native-svg';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {icons, COLORS} from '../constants';
import {Home} from '../screens';

const Tab = createBottomTabNavigator();

const tabsData = [
  {
    name: 'Dashboard',
    icon: icons.cutlery,
  },
  {
    name: 'Search',
    icon: icons.search,
  },
  {
    name: 'Like',
    icon: icons.like,
  },
  {
    name: 'User',
    icon: icons.user,
  },
];

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View style={styles.flexAndAlignCenter}>
        <View style={styles.absoluteSelectedTab}>
          <View style={styles.flexAndWhiteBg} />
          <Svg width={70} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={styles.flexAndWhiteBg} />
        </View>

        <TouchableOpacity style={styles.selectedTab} onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.notSelectedTab}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = props => {
  if (isIphoneX()) {
    return (
      <View>
        <View style={styles.iPhoneXTabBar} />
        <BottomTabBar {...props.props} />
      </View>
    );
  } else {
    return <BottomTabBar {...props.props} />;
  }
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
      tabBar={props => <CustomTabBar props={props} />}>
      {tabsData.map(({name, icon}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={icon}
                resizeMode="contain"
                style={styles.tabImage(focused)}
              />
            ),
            tabBarButton: props => <TabBarCustomButton {...props} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  flexAndAlignCenter: {flex: 1, alignItems: 'center'},
  absoluteSelectedTab: {flexDirection: 'row', position: 'absolute', top: 0},
  flexAndWhiteBg: {flex: 1, backgroundColor: COLORS.white},
  selectedTab: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
  },
  notSelectedTab: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.white,
  },
  iPhoneXTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: COLORS.white,
  },
  tabImage: focused => ({
    width: 25,
    height: 25,
    tintColor: focused ? COLORS.primary : COLORS.secondary,
  }),
});

export default Tabs;
