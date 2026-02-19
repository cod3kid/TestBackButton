import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialDesignIcons as Icon } from '@react-native-vector-icons/material-design-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import screens
import DashboardScreen from '../screens/DashboardScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WeakPointGuideScreen from '../screens/WeakPointGuideScreen';
import ProgramsStack from './ProgramsNavigator';
import WorkoutStack from './WorkoutNavigator';

const Tab = createBottomTabNavigator();

// Icon component using react-native-vector-icons
const TabIcon = ({ route, focused, color, size }) => {
  const icons = {
    Dashboard: focused ? 'view-dashboard' : 'view-dashboard-outline',
    Programs: focused ? 'dumbbell' : 'dumbbell',
    Workout: focused ? 'weight-lifter' : 'weight-lifter',
    Guide: focused ? 'target' : 'target',
    Settings: focused ? 'cog' : 'cog-outline',
  };

  return <Icon name={icons[route]} size={size || 24} color={color} />;
};

const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName='Dashboard'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon route={route.name} focused={focused} color={color} size={size} />
        ),
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: '#FFFFFF80',
        tabBarStyle: {
          position: 'absolute',
          bottom: insets.bottom > 0 ? insets.bottom + 5 : 10,
          left: 20,
          right: 20,
          marginHorizontal: 10,
          backgroundColor: '#1C1C1E',
          borderTopWidth: 0,
          borderRadius: 20,
          elevation: 15,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          paddingBottom: 10,
          paddingTop: 10,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name="Programs"
        component={ProgramsStack}
        options={{ title: 'Programs', headerShown: false }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutStack}
        options={{ title: 'Workout', headerShown: false }}
      />
      <Tab.Screen
        name="Guide"
        component={WeakPointGuideScreen}
        options={{ title: 'Guide' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
