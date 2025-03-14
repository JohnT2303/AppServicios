import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const AddressesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [addresses] = useState([
    {
      id: '1',
      name: 'Casa',
      street: 'Calle Principal 123',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '12345',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Oficina',
      street: 'Avenida Reforma 456',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '67890',
      isDefault: false,
    },
  ]);

  const handleAddAddress = () => {
    // Aquí iría la lógica para agregar una nueva dirección
    Alert.alert('Agregar Dirección', 'Funcionalidad en desarrollo');
  };

  const handleEditAddress = (addressId: string) => {
    // Aquí iría la lógica para editar una dirección
    Alert.alert('Editar Dirección', 'Funcionalidad en desarrollo');
  };

  const handleDeleteAddress = (addressId: string) => {
    Alert.alert(
      'Eliminar Dirección',
      '¿Estás seguro de que deseas eliminar esta dirección?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            // Aquí iría la lógica para eliminar la dirección
            Alert.alert('Éxito', 'Dirección eliminada correctamente');
          },
        },
      ]
    );
  };

  const handleSetDefault = (addressId: string) => {
    // Aquí iría la lógica para establecer la dirección como predeterminada
    Alert.alert('Éxito', 'Dirección predeterminada actualizada');
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
        <Text style={styles.title}>Mis Direcciones</Text>
      </View>

      <ScrollView style={styles.content}>
        {addresses.map((address) => (
          <View key={address.id} style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <Text style={styles.addressName}>{address.name}</Text>
              {address.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Predeterminada</Text>
                </View>
              )}
            </View>

            <Text style={styles.addressText}>{address.street}</Text>
            <Text style={styles.addressText}>
              {address.city}, {address.state} {address.zipCode}
            </Text>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() => handleEditAddress(address.id)}
              >
                <MaterialIcons name="edit" size={20} color="#007AFF" />
                <Text style={[styles.actionButtonText, styles.editButtonText]}>
                  Editar
                </Text>
              </TouchableOpacity>

              {!address.isDefault && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.defaultButton]}
                  onPress={() => handleSetDefault(address.id)}
                >
                  <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                  <Text style={[styles.actionButtonText, styles.defaultButtonText]}>
                    Establecer como predeterminada
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDeleteAddress(address.id)}
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
        onPress={handleAddAddress}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Agregar Nueva Dirección</Text>
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
  addressCard: {
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
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  defaultBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    color: '#2196F3',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  actionButtons: {
    marginTop: 16,
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 8,
  },
  editButton: {
    backgroundColor: '#E3F2FD',
  },
  defaultButton: {
    backgroundColor: '#E8F5E9',
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
  defaultButtonText: {
    color: '#4CAF50',
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

export default AddressesScreen; 