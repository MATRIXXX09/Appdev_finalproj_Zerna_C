import { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

import DashboardScreen from '../screens/DashboardScreen';
import WalletScreen from '../screens/WalletScreen';
import TrackerScreen from '../screens/TrackerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookingDetailsScreen from '../screens/BookingDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashboardStackNav: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen
        name="BookingDetails"
        component={BookingDetailsScreen}
        options={{ animationEnabled: true }}
      />
    </Stack.Navigator>
  );
};

const MainNavigation: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'DashboardStack') {
            iconName = '🏠';
          } else if (route.name === 'Wallet') {
            iconName = '💳';
          } else if (route.name === 'Tracker') {
            iconName = '📍';
          } else if (route.name === 'Profile') {
            iconName = '👤';
          }

          return <Text style={{ fontSize: 20 }}>{iconName}</Text>;
        },
        tabBarActiveTintColor: '#22C55E',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopWidth: 1,
          borderTopColor: '#333333',
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="DashboardStack"
        component={DashboardStackNav}
        options={{ title: 'Home' }}
      />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Tracker" component={TrackerScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigation;



