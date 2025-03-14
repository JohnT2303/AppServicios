import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import NearbyServicesScreen from '../screens/NearbyServicesScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProviderHomeScreen from '../screens/ProviderHomeScreen';
import ProviderOrdersScreen from '../screens/ProviderOrdersScreen';
import ProviderProfileScreen from '../screens/ProviderProfileScreen';
import { useAuth } from '../contexts/AuthContext';
import { MainTabParamList, ProviderTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList & ProviderTabParamList>();

const TabNavigator = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
    >
      {user.role === 'client' ? (
        <>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Inicio',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="NearbyServices"
            component={NearbyServicesScreen}
            options={{
              title: 'Cercanos',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="location-on" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Orders"
            component={OrdersScreen}
            options={{
              title: 'Pedidos',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="receipt" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: 'Perfil',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" size={size} color={color} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="ProviderHome"
            component={ProviderHomeScreen}
            options={{
              title: 'Inicio',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="ProviderOrders"
            component={ProviderOrdersScreen}
            options={{
              title: 'Pedidos',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="receipt" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="ProviderProfile"
            component={ProviderProfileScreen}
            options={{
              title: 'Perfil',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" size={size} color={color} />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator; 