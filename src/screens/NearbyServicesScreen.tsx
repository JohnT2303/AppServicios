import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProps, Service } from '../types/navigation';
import Map from '../components/Map';

// Mock data for nearby services
const mockServices: Service[] = [
  {
    id: '1',
    name: 'Plomería Express',
    category: 'Plomería',
    rating: 4.8,
    distance: '0.5 km',
    price: 'Desde $50',
    location: {
      latitude: 19.4326,
      longitude: -99.1332,
    },
  },
  {
    id: '2',
    name: 'Electricidad Pro',
    category: 'Electricidad',
    rating: 4.9,
    distance: '0.8 km',
    price: 'Desde $70',
    location: {
      latitude: 19.4327,
      longitude: -99.1333,
    },
  },
  {
    id: '2',
    name: 'Electricidad Pro',
    category: 'Electricidad',
    rating: 4.9,
    distance: '0.8 km',
    price: 'Desde $70',
    location: {
      latitude: 19.4327,
      longitude: -99.1333,
    },
  },
  {
    id: '3',
    name: 'Pintura Fácil',
    category: 'Pintura',
    rating: 4.7,
    distance: '1.2 km',
    price: 'Desde $100',
    location: {
      latitude: 19.4328,
      longitude: -99.1334,
    },
  },
  {
    id: '4',
    name: 'Jardinería Verde',
    category: 'Jardinería',
    rating: 4.6,
    distance: '1.5 km',
    price: 'Desde $80',
    location: {
      latitude: 19.4329,
      longitude: -99.1335,
    },
  },
  {
    id: '5',
    name: 'Cerrajería Segura',
    category: 'Cerrajería',
    rating: 4.5,
    distance: '1.8 km',
    price: 'Desde $90',
    location: {
      latitude: 19.4330,
      longitude: -99.1336,
    },
  },
  // Add more mock services as needed
];

interface NearbyServicesScreenProps {
  navigation: NavigationProps;
}

const NearbyServicesScreen: React.FC<NearbyServicesScreenProps> = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 19.4326,
    longitude: -99.1332,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'

  useEffect(() => {
    // Get current location
    Geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          ...region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const renderServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => navigation.navigate('ServiceDetails', { service: item })}
    >
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceCategory}>{item.category}</Text>
        <View style={styles.serviceDetails}>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          <Text style={styles.distance}>{item.distance}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Servicios Cercanos</Text>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'map' && styles.activeToggle]}
            onPress={() => setViewMode('map')}
          >
            <MaterialIcons
              name="map"
              size={24}
              color={viewMode === 'map' ? '#007AFF' : '#666'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'list' && styles.activeToggle]}
            onPress={() => setViewMode('list')}
          >
            <MaterialIcons
              name="list"
              size={24}
              color={viewMode === 'list' ? '#007AFF' : '#666'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {viewMode === 'map' ? (
        <Map
          region={region}
          style={styles.map}
          markers={mockServices.map(service => ({
            id: service.id,
            coordinate: service.location,
            title: service.name,
            description: service.category
          }))}
        />
      ) : (
        <FlatList
          data={mockServices}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  listContainer: {
    padding: 16,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  serviceCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  serviceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default NearbyServicesScreen; 