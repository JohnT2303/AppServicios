import { NavigatorScreenParams } from '@react-navigation/native';

export interface Service {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: string;
  price: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  ProviderTabs: NavigatorScreenParams<ProviderTabParamList>;
  ServiceDetails: { service: Service };
  Services: { category?: string };
  NearbyServices: undefined;
  Profile: undefined;
  EditProfile: undefined;
  Addresses: undefined;
  PaymentMethods: undefined;
  Notifications: undefined;
  Settings: undefined;
  ProviderHome: undefined;
  ProviderProfile: undefined;
  ProviderServices: undefined;
  WorkSchedule: undefined;
  Earnings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  NearbyServices: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type ProviderTabParamList = {
  ProviderHome: undefined;
  ProviderOrders: undefined;
  ProviderProfile: undefined;
};

export type NavigationProps = {
  navigate: (screen: keyof RootStackParamList, params?: any) => void;
  goBack: () => void;
  setOptions: (options: any) => void;
}; 