import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const ProviderServicesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [services] = useState([
    {
      id: '1',
      name: 'Plomería',
      description: 'Servicios de plomería general, reparación de fugas, instalación de tuberías y más.',
      price: 300,
      category: 'Hogar',
      rating: 4.8,
      totalReviews: 156,
      image: 'https://example.com/plumbing.jpg',
      isActive: true,
    },
    {
      id: '2',
      name: 'Electricidad',
      description: 'Instalaciones eléctricas, reparaciones, mantenimiento preventivo y correctivo.',
      price: 400,
      category: 'Hogar',
      rating: 4.9,
      totalReviews: 89,
      image: 'https://example.com/electricity.jpg',
      isActive: true,
    },
    {
      id: '3',
      name: 'Limpieza',
      description: 'Servicios de limpieza residencial y comercial, mantenimiento general.',
      price: 250,
      category: 'Hogar',
      rating: 4.7,
      totalReviews: 234,
      image: 'https://example.com/cleaning.jpg',
      isActive: false,
    },
  ]);

  const handleAddService = () => {
    // Aquí iría la lógica para agregar un nuevo servicio
    Alert.alert('Agregar Servicio', 'Funcionalidad en desarrollo');
  };

  const handleEditService = (serviceId: string) => {
    // Aquí iría la lógica para editar un servicio
    Alert.alert('Editar Servicio', 'Funcionalidad en desarrollo');
  };

  const handleDeleteService = (serviceId: string) => {
    Alert.alert(
      'Eliminar Servicio',
      '¿Estás seguro de que deseas eliminar este servicio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            // Aquí iría la lógica para eliminar el servicio
            Alert.alert('Éxito', 'Servicio eliminado correctamente');
          },
        },
      ]
    );
  };

  const handleToggleService = (serviceId: string) => {
    // Aquí iría la lógica para activar/desactivar el servicio
    Alert.alert('Éxito', 'Estado del servicio actualizado');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Mis Servicios</Text>
      </View>

      <ScrollView style={styles.content}>
        {services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceCategory}>{service.category}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.statusBadge,
                  service.isActive ? styles.activeBadge : styles.inactiveBadge,
                ]}
                onPress={() => handleToggleService(service.id)}
              >
                <Text style={[
                  styles.statusText,
                  service.isActive ? styles.activeText : styles.inactiveText,
                ]}>
                  {service.isActive ? 'Activo' : 'Inactivo'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.serviceDescription}>{service.description}</Text>

            <View style={styles.serviceDetails}>
              <View style={styles.detailItem}>
                <MaterialIcons name="attach-money" size={20} color="#4CAF50" />
                <Text style={styles.detailText}>${service.price}</Text>
              </View>
              <View style={styles.detailItem}>
                <MaterialIcons name="star" size={20} color="#FFC107" />
                <Text style={styles.detailText}>
                  {service.rating} ({service.totalReviews})
                </Text>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() => handleEditService(service.id)}
              >
                <MaterialIcons name="edit" size={20} color="#007AFF" />
                <Text style={[styles.actionButtonText, styles.editButtonText]}>
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDeleteService(service.id)}
              >
                <MaterialIcons name="delete" size={20} color="#FF3B30" />
                <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddService}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Agregar Nuevo Servicio</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
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
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeBadge: {
    backgroundColor: '#E8F5E9',
  },
  inactiveBadge: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#4CAF50',
  },
  inactiveText: {
    color: '#FF3B30',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  serviceDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 8,
  },
  editButton: {
    backgroundColor: '#E3F2FD',
  },
  deleteButton: {
    backgroundColor: '#FFEBEE',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  editButtonText: {
    color: '#007AFF',
  },
  deleteButtonText: {
    color: '#FF3B30',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProviderServicesScreen; 