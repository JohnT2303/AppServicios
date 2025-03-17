import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';
import Slider from '@react-native-community/slider';

type Filter = {
  rating: number;
  priceRange: 'low' | 'medium' | 'high';
  distance: number;
  sortBy: 'rating' | 'price' | 'distance';
  availability: 'all' | 'now' | 'today';
  minPrice: number;
  maxPrice: number;
};

const categories = [
  { id: 'all', name: 'Todas', icon: 'grid-view' },
  { id: 'plomeria', name: 'Plomería', icon: 'plumbing' },
  { id: 'electricidad', name: 'Electricidad', icon: 'electrical-services' },
  { id: 'aire', name: 'Aire Acondicionado', icon: 'ac-unit' },
  { id: 'pintura', name: 'Pintura', icon: 'format-paint' },
  { id: 'jardineria', name: 'Jardinería', icon: 'grass' },
  { id: 'limpieza', name: 'Limpieza', icon: 'cleaning-services' },
];

const { width } = Dimensions.get('window');

const ServicesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const initialCategory = (route.params as any)?.category;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [filters, setFilters] = useState<Filter>({
    rating: 0,
    priceRange: 'medium',
    distance: 10,
    sortBy: 'rating',
    availability: 'all',
    minPrice: 0,
    maxPrice: 500,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);

  const mockServices = [
    {
      id: '1',
      name: 'Plomero Profesional',
      provider: {
        id: '1',
        name: 'Juan Pérez',
        rating: 4.8,
        photo: 'https://avatar.iran.liara.run/public/boy?username=Scott',
      },
      category: 'Plomería',
      price: 'Desde $150',
      distance: '0.5 km',
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Electricista Profesional',
      provider: {
        id: '2',
        name: 'Pedro Gómez',
        rating: 4.5,
        photo: 'https://avatar.iran.liara.run/public/boy?username=Scott',
      },
      category: 'Electricidad',
      price: 'Desde $100',
      distance: '0.3 km',
      rating: 4.5,
    },
    {
      id: '3',
      name: 'Reparación de Aire Acondicionado',
      provider: {
        id: '3',
        name: 'Ana Torres',
        rating: 4.7,
        photo: 'https://avatar.iran.liara.run/public/44',
      },
      category: 'Aire Acondicionado',
      price: 'Desde $200',
      distance: '1.2 km', 
      rating: 4.7,
    },
    {
      id: '4',
      name: 'Pintura de Interiores',
      provider: {
        id: '4',
        name: 'María López',
        rating: 4.6,
        photo: 'https://avatar.iran.liara.run/public/30',
      },
      category: 'Pintura',
      price: 'Desde $180',
      distance: '2.0 km',
      rating: 4.6,
    },
    {
      id: '5', 
      name: 'Jardinería Profesional',
      provider: {
        id: '5',
        name: 'Carlos Ruiz',
        rating: 4.9,
        photo: 'https://avatar.iran.liara.run/public/19',
      },
      category: 'Jardinería',
      price: 'Desde $120',
      distance: '0.8 km',
      rating: 4.9,
    },
    {
      id: '6',
      name: 'Limpieza de Hogar',
      provider: {
        id: '6',
        name: 'Laura Sánchez',
        rating: 4.8,
        photo: 'https://avatar.iran.liara.run/public/14',
      },
      category: 'Limpieza',
      price: 'Desde $90',
      distance: '1.5 km',
      rating: 4.8,
    }
    // Add more mock services as needed
  ];

  useEffect(() => {
    let filtered = [...mockServices];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => 
        service.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.provider.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by rating
    if (filters.rating > 0) {
      filtered = filtered.filter(service => service.provider.rating >= filters.rating);
    }

    // Filter by price range
    filtered = filtered.filter(service => {
      const price = parseInt(service.price.replace(/[^0-9]/g, ''));
      return price >= filters.minPrice && price <= filters.maxPrice;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return b.provider.rating - a.provider.rating;
        case 'price':
          return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        default:
          return 0;
      }
    });

    setFilteredServices(filtered);
  }, [selectedCategory, searchQuery, filters]);

  const renderServiceCard = (service: typeof mockServices[0]) => (
    <TouchableOpacity
      key={service.id}
      style={styles.serviceCard}
      onPress={() => navigation.navigate('ServiceDetails', { service })}
    >
      <View style={styles.providerInfo}>
        <Image
          source={{ uri: service.provider.photo }}
          style={styles.providerPhoto}
        />
        <View style={styles.providerDetails}>
          <Text style={styles.providerName}>{service.provider.name}</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{service.provider.rating}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.serviceName}>{service.name}</Text>
      <Text style={styles.category}>{service.category}</Text>
      <View style={styles.serviceDetails}>
        <Text style={styles.price}>{service.price}</Text>
        <Text style={styles.distance}>{service.distance}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryModal = () => (
    <Modal
      visible={showCategoryModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowCategoryModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Seleccionar Categoría</Text>
            <TouchableOpacity
              onPress={() => setShowCategoryModal(false)}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.categoriesList}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.id && styles.categoryItemSelected,
                ]}
                onPress={() => {
                  setSelectedCategory(category.id);
                  setShowCategoryModal(false);
                }}
              >
                <MaterialIcons
                  name={category.icon as any}
                  size={24}
                  color={selectedCategory === category.id ? '#007AFF' : '#666'}
                />
                <Text
                  style={[
                    styles.categoryItemText,
                    selectedCategory === category.id && styles.categoryItemTextSelected,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderPriceFilter = () => (
    <View style={styles.filterSection}>
      <Text style={styles.filterLabel}>Rango de Precios</Text>
      <View style={styles.priceRangeContainer}>
        <View style={styles.priceRangeLabels}>
          <Text style={styles.priceRangeLabel}>${filters.minPrice}</Text>
          <Text style={styles.priceRangeLabel}>${filters.maxPrice}</Text>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.priceSlider}
            minimumValue={0}
            maximumValue={500}
            step={10}
            value={filters.maxPrice}
            onValueChange={(value: number) => setFilters({ ...filters, maxPrice: value })}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#007AFF"
          />
        </View>
      </View>
      <View style={styles.pricePresets}>
        {[
          { id: 'low', label: 'Económico', range: '< $100' },
          { id: 'medium', label: 'Medio', range: '$100 - $200' },
          { id: 'high', label: 'Premium', range: '> $200' },
        ].map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.pricePresetButton,
              filters.priceRange === option.id && styles.pricePresetButtonActive,
            ]}
            onPress={() => {
              const newFilters = { ...filters, priceRange: option.id as Filter['priceRange'] };
              switch (option.id) {
                case 'low':
                  newFilters.minPrice = 0;
                  newFilters.maxPrice = 100;
                  break;
                case 'medium':
                  newFilters.minPrice = 100;
                  newFilters.maxPrice = 200;
                  break;
                case 'high':
                  newFilters.minPrice = 200;
                  newFilters.maxPrice = 500;
                  break;
              }
              setFilters(newFilters);
            }}
          >
            <Text
              style={[
                styles.pricePresetText,
                filters.priceRange === option.id && styles.pricePresetTextActive,
              ]}
            >
              {option.label}
            </Text>
            <Text
              style={[
                styles.pricePresetRange,
                filters.priceRange === option.id && styles.pricePresetRangeActive,
              ]}
            >
              {option.range}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <View style={styles.filtersHeader}>
        <Text style={styles.filterTitle}>Filtros</Text>
        <TouchableOpacity
          style={styles.clearFiltersButton}
          onPress={() => setFilters({
            rating: 0,
            priceRange: 'medium',
            distance: 10,
            sortBy: 'rating',
            availability: 'all',
            minPrice: 0,
            maxPrice: 500,
          })}
        >
          <Text style={styles.clearFiltersText}>Limpiar</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
      >
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Calificación</Text>
          <View style={styles.ratingFilter}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                style={[
                  styles.ratingButton,
                  star <= filters.rating && styles.ratingButtonActive,
                ]}
                onPress={() => setFilters({ ...filters, rating: star })}
              >
                <MaterialIcons
                  name={star <= filters.rating ? 'star' : 'star-border'}
                  size={20}
                  color={star <= filters.rating ? '#FFD700' : '#666'}
                />
                <Text style={[
                  styles.ratingText,
                  star <= filters.rating && styles.ratingTextActive,
                ]}>
                  {star}+
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {renderPriceFilter()}

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Ordenar por</Text>
          <View style={styles.sortFilter}>
            {[
              { id: 'rating', label: 'Mejor calificación', icon: 'star' },
              { id: 'price', label: 'Menor precio', icon: 'attach-money' },
              { id: 'distance', label: 'Más cercano', icon: 'location-on' },
            ].map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.sortFilterButton,
                  filters.sortBy === option.id && styles.sortFilterButtonActive,
                ]}
                onPress={() => setFilters({ ...filters, sortBy: option.id as Filter['sortBy'] })}
              >
                <MaterialIcons
                  name={option.icon as any}
                  size={20}
                  color={filters.sortBy === option.id ? '#fff' : '#666'}
                />
                <Text
                  style={[
                    styles.sortFilterText,
                    filters.sortBy === option.id && styles.sortFilterTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Disponibilidad</Text>
          <View style={styles.availabilityFilter}>
            {[
              { id: 'all', label: 'Todos', icon: 'schedule' },
              { id: 'now', label: 'Ahora', icon: 'access-time' },
              { id: 'today', label: 'Hoy', icon: 'today' },
            ].map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.availabilityFilterButton,
                  filters.availability === option.id && styles.availabilityFilterButtonActive,
                ]}
                onPress={() => setFilters({ ...filters, availability: option.id as Filter['availability'] })}
              >
                <MaterialIcons
                  name={option.icon as any}
                  size={20}
                  color={filters.availability === option.id ? '#fff' : '#666'}
                />
                <Text
                  style={[
                    styles.availabilityFilterText,
                    filters.availability === option.id && styles.availabilityFilterTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setShowCategoryModal(true)}
        >
          <MaterialIcons
            name={categories.find(c => c.id === selectedCategory)?.icon as any}
            size={24}
            color="#007AFF"
          />
          <Text style={styles.categoryButtonText}>
            {categories.find(c => c.id === selectedCategory)?.name}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={24} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar servicios..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.filterButton,
            showFilters && styles.filterButtonActive,
          ]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <MaterialIcons 
            name="filter-list" 
            size={24} 
            color={showFilters ? '#fff' : '#007AFF'} 
          />
        </TouchableOpacity>
      </View>

      {showFilters && renderFilters()}

      <ScrollView style={styles.servicesList}>
        {filteredServices.length > 0 ? (
          filteredServices.map(renderServiceCard)
        ) : (
          <View style={styles.noResults}>
            <MaterialIcons name="search-off" size={48} color="#666" />
            <Text style={styles.noResultsText}>
              {selectedCategory !== 'all'
                ? `No se encontraron servicios en la categoría ${categories.find(c => c.id === selectedCategory)?.name}`
                : 'No se encontraron servicios'}
            </Text>
          </View>
        )}
      </ScrollView>

      {renderCategoryModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filtersContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearFiltersButton: {
    padding: 8,
  },
  clearFiltersText: {
    color: '#007AFF',
    fontSize: 16,
  },
  filtersScroll: {
    paddingHorizontal: 16,
  },
  filterSection: {
    marginRight: 24,
    paddingVertical: 12,
    width: width - 48,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  ratingFilter: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  ratingButtonActive: {
    backgroundColor: '#FFF8E1',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  ratingTextActive: {
    color: '#FFA000',
  },
  priceRangeContainer: {
    marginBottom: 16,
    width: '100%',
  },
  priceRangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  priceRangeLabel: {
    fontSize: 14,
    color: '#666',
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 8,
  },
  priceSlider: {
    width: '100%',
    height: 40,
  },
  pricePresets: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  pricePresetButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 100,
  },
  pricePresetButtonActive: {
    backgroundColor: '#007AFF',
  },
  pricePresetText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  pricePresetTextActive: {
    color: '#fff',
  },
  pricePresetRange: {
    color: '#999',
    fontSize: 12,
  },
  pricePresetRangeActive: {
    color: '#fff',
  },
  sortFilter: {
    flexDirection: 'row',
    gap: 8,
  },
  sortFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  sortFilterButtonActive: {
    backgroundColor: '#007AFF',
  },
  sortFilterText: {
    color: '#666',
    fontSize: 14,
  },
  sortFilterTextActive: {
    color: '#fff',
  },
  availabilityFilter: {
    flexDirection: 'row',
    gap: 8,
  },
  availabilityFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  availabilityFilterButtonActive: {
    backgroundColor: '#007AFF',
  },
  availabilityFilterText: {
    color: '#666',
    fontSize: 14,
  },
  availabilityFilterTextActive: {
    color: '#fff',
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  providerPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  providerDetails: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    color: '#666',
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  categoriesList: {
    padding: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryItemSelected: {
    backgroundColor: '#E3F2FD',
  },
  categoryItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#666',
  },
  categoryItemTextSelected: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  categoryButtonText: {
    marginLeft: 4,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  servicesList: {
    flex: 1,
  },
});

export default ServicesScreen; 