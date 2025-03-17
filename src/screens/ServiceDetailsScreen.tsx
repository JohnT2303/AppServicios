import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const ServiceDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { service } = route.params as any;

  const handleContactProvider = () => {
    navigation.navigate('ServiceRequest', { service });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles del Servicios</Text>
      </View>

      <View style={styles.providerSection}>
        <View style={styles.providerHeader}>
          <Image
            source={{ uri: service.provider.photo }}
            style={styles.providerPhoto}
          />
          <View style={styles.providerInfo}>
            <Text style={styles.providerName}>{service.provider.name}</Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{service.provider.rating}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={handleContactProvider}
        >
          <MaterialIcons name="phone" size={20} color="#fff" />
          <Text style={styles.contactButtonText}>Contactar Proveedor</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <View style={styles.categoryContainer}>
          <MaterialIcons name="category" size={16} color="#666" />
          <Text style={styles.category}>{service.category}</Text>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Detalles del Servicio</Text>
          <View style={styles.detailRow}>
            <MaterialIcons name="attach-money" size={20} color="#007AFF" />
            <Text style={styles.detailText}>{service.price}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={20} color="#007AFF" />
            <Text style={styles.detailText}>{service.distance}</Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>
            Servicio profesional de {service.category.toLowerCase()} con años de experiencia.
            Ofrecemos soluciones rápidas y eficientes para todas tus necesidades.
          </Text>
        </View>

        <View style={styles.availabilitySection}>
          <Text style={styles.sectionTitle}>Disponibilidad</Text>
          <View style={styles.availabilityRow}>
            <MaterialIcons name="schedule" size={20} color="#007AFF" />
            <Text style={styles.detailText}>Lun - Vie: 8:00 - 20:00</Text>
          </View>
          <View style={styles.availabilityRow}>
            <MaterialIcons name="schedule" size={20} color="#007AFF" />
            <Text style={styles.detailText}>Sáb: 9:00 - 18:00</Text>
          </View>
          <View style={styles.availabilityRow}>
            <MaterialIcons name="schedule" size={20} color="#007AFF" />
            <Text style={styles.detailText}>Dom: 9:00 - 14:00</Text>
          </View>
        </View>
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
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  providerSection: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  providerPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    color: '#666',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  content: {
    padding: 16,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  category: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  detailsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  availabilitySection: {
    marginBottom: 24,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default ServiceDetailsScreen; 