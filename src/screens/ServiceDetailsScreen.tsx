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
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, NavigationProps } from '../types/navigation';

type ServiceDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ServiceDetails'>;

const ServiceDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<ServiceDetailsScreenRouteProp>();
  const { service } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalles del Servicio</Text>
      </View>

      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.serviceCategory}>{service.category}</Text>
        
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={20} color="#FFD700" />
          <Text style={styles.rating}>{service.rating}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <MaterialIcons name="location-on" size={20} color="#666" />
            <Text style={styles.detailText}>{service.distance}</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons name="attach-money" size={20} color="#666" />
            <Text style={styles.detailText}>{service.price}</Text>
          </View>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </View>

      <View style={styles.servicesContainer}>
        <Text style={styles.sectionTitle}>Servicios Ofrecidos</Text>
        <View style={styles.serviceList}>
          <View style={styles.serviceItem}>
            <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.serviceItemText}>Instalación y reparación</Text>
          </View>
          <View style={styles.serviceItem}>
            <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.serviceItemText}>Mantenimiento preventivo</Text>
          </View>
          <View style={styles.serviceItem}>
            <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.serviceItemText}>Diagnóstico especializado</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactButtonText}>Contactar al Proveedor</Text>
      </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  serviceInfo: {
    padding: 16,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  serviceCategory: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    marginLeft: 4,
    color: '#666',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  descriptionContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  servicesContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  serviceList: {
    marginTop: 8,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceItemText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  contactButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ServiceDetailsScreen; 