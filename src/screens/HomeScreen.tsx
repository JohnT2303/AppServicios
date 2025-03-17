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
  color: string;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const categories: Category[] = [
    { id: '1', name: 'Plomería', icon: 'plumbing', color: '#2196F3' },
    { id: '2', name: 'Electricidad', icon: 'electrical-services', color: '#FFC107' },
    { id: '3', name: 'Carpintería', icon: 'handyman', color: '#795548' },
    { id: '4', name: 'Limpieza', icon: 'cleaning-services', color: '#4CAF50' },
    { id: '5', name: 'Pintura', icon: 'format-paint', color: '#9C27B0' },
    { id: '6', name: 'Jardinería', icon: 'yard', color: '#8BC34A' },
  ];

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Services', { category: item.name })}
    >
      <View style={[styles.categoryIcon, { backgroundColor: `${item.color}20` }]}>
        <MaterialIcons name={item.icon} size={32} color={item.color} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
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
          <Text style={styles.sectionTitle}>Servicios Destacados</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Services', {})}>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.featuredServices}
        >
          {[1, 2, 3].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.featuredServiceCard}
              onPress={() =>
                navigation.navigate('ServiceDetails', {
                  service: {
                    id: item.toString(),
                    name: 'Servicio de Ejemplo',
                    provider: {
                      id: '1',
                      name: 'Juan Pérez',
                      rating: 4.8,
                      photo: 'https://avatar.iran.liara.run/public/35',
                    },
                    category: 'Categoría',
                    price: 'Desde $50',
                    distance: '0.5 km',
                    rating: 4.5,
                  },
                })
              }
            >
              <Image
                source={{ uri: 'https://placebeard.it/g/640/480' }}
                style={styles.featuredServiceImage}
              />
              <View style={styles.featuredServiceInfo}>
                <Text style={styles.featuredServiceName}>
                  Servicio de Ejemplo {item}
                </Text>
                <Text style={styles.featuredServiceCategory}>Categoría</Text>
                <View style={styles.featuredServiceDetails}>
                  <View style={styles.ratingContainer}>
                    <MaterialIcons name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}>4.5</Text>
                  </View>
                  <Text style={styles.distance}>0.5 km</Text>
                </View>
                <Text style={styles.price}>Desde $50</Text>
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
  featuredServices: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  featuredServiceCard: {
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
  featuredServiceImage: {
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  featuredServiceInfo: {
    padding: 12,
  },
  featuredServiceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredServiceCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  featuredServiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    color: '#666',
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default HomeScreen;
