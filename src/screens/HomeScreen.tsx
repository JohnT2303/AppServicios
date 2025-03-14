import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

type Category = {
  id: string;
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const categories: Category[] = [
    { id: '1', name: 'Plomería', icon: 'plumbing' },
    { id: '2', name: 'Electricidad', icon: 'electrical-services' },
    { id: '3', name: 'Carpintería', icon: 'handyman' },
    { id: '4', name: 'Limpieza', icon: 'cleaning-services' },
    { id: '5', name: 'Pintura', icon: 'format-paint' },
    { id: '6', name: 'Jardinería', icon: 'yard' },
  ];

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Services', { category: item.name })}
    >
      <View style={styles.categoryIcon}>
        <MaterialIcons name={item.icon} size={32} color="#007AFF" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola!</Text>
          <Text style={styles.name}>Usuario</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => {/* TODO: Implement notifications */}}
        >
          <MaterialIcons name="notifications" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Services', {})}
        >
          <MaterialIcons name="search" size={24} color="#666" />
          <Text style={styles.searchText}>Buscar servicios...</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categorías</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => renderCategoryItem({ item: category }))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Servicios Cercanos</Text>
          <TouchableOpacity onPress={() => navigation.navigate('NearbyServices')}>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.nearbyServices}
        >
          {[1, 2, 3].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.nearbyServiceCard}
              onPress={() =>
                navigation.navigate('ServiceDetails', {
                  service: {
                    id: item.toString(),
                    name: 'Servicio de Ejemplo',
                    category: 'Categoría',
                    rating: 4.5,
                    distance: '0.5 km',
                    price: 'Desde $50',
                    location: {
                      latitude: 19.4326,
                      longitude: -99.1332,
                    },
                  },
                })
              }
            >
              <View style={styles.nearbyServiceImage} />
              <View style={styles.nearbyServiceInfo}>
                <Text style={styles.nearbyServiceName}>
                  Servicio de Ejemplo {item}
                </Text>
                <Text style={styles.nearbyServiceCategory}>Categoría</Text>
                <View style={styles.nearbyServiceDetails}>
                  <View style={styles.ratingContainer}>
                    <MaterialIcons name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}>4.5</Text>
                  </View>
                  <Text style={styles.distance}>0.5 km</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
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
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationButton: {
    padding: 8,
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  },
  searchText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#007AFF',
    fontSize: 14,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#f0f0f0',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  nearbyServices: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  nearbyServiceCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nearbyServiceImage: {
    height: 160,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  nearbyServiceInfo: {
    padding: 12,
  },
  nearbyServiceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  nearbyServiceCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  nearbyServiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});

export default HomeScreen;
