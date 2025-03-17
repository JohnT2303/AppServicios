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
  MainTabs: undefined;
  ServiceDetails: {
    service: {
      id: string;
      name: string;
      provider: {
        id: string;
        name: string;
        photo: string;
        rating: number;
      };
      category: string;
      price: string;
      distance: string;
      rating: number;
    };
  };
  ServiceRequest: {
    service: {
      id: string;
      name: string;
      provider: {
        id: string;
        name: string;
        photo: string;
        rating: number;
      };
      category: string;
      price: string;
      distance: string;
      rating: number;
    };
  };
  EditProfile: undefined;
  Addresses: undefined;
  PaymentMethods: undefined;
  Notifications: undefined;
  Settings: undefined;
  ProviderServices: undefined;
  WorkSchedule: undefined;
  Earnings: undefined;
  Services: {
    category?: string;
  };
};

export type TabParamList = {
  Home: undefined;
  Services: undefined;
  Bookings: undefined;
  Profile: undefined;
};

export type NavigationProps = {
  navigate: (screen: keyof RootStackParamList, params?: any) => void;
  goBack: () => void;
  setOptions: (options: any) => void;
  reset: (options: { index: number; routes: { name: keyof RootStackParamList }[] }) => void;
}; 