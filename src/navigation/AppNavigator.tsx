import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TabNavigator from './TabNavigator';
import ServiceDetailsScreen from '../screens/ServiceDetailsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AddressesScreen from '../screens/AddressesScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProviderServicesScreen from '../screens/ProviderServicesScreen';
import WorkScheduleScreen from '../screens/WorkScheduleScreen';
import EarningsScreen from '../screens/EarningsScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {!user ? (
                    // Auth screens
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                ) : (
                    // App screens
                    <>
                        <Stack.Screen name="MainTabs" component={TabNavigator} />
                        <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} />
                        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                        <Stack.Screen name="Addresses" component={AddressesScreen} />
                        <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
                        <Stack.Screen name="Notifications" component={NotificationsScreen} />
                        <Stack.Screen name="Settings" component={SettingsScreen} />
                        <Stack.Screen name="ProviderServices" component={ProviderServicesScreen} />
                        <Stack.Screen name="WorkSchedule" component={WorkScheduleScreen} />
                        <Stack.Screen name="Earnings" component={EarningsScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator; 