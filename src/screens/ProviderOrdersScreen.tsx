import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const ProviderOrdersScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'active' | 'completed'>('pending');

  // Mock data for service requests
  const mockRequests = [
    {
      id: '1',
      serviceName: 'Plomería',
      clientName: 'Juan Pérez',
      date: '2024-03-20',
      time: '14:00',
      status: 'pending',
      price: 150,
      address: 'Calle Principal 123',
    },
    {
      id: '2',
      serviceName: 'Electricidad',
      clientName: 'María García',
      date: '2024-03-19',
      time: '10:00',
      status: 'accepted',
      price: 200,
      address: 'Avenida Central 456',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FFA000';
      case 'accepted':
        return '#2196F3';
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'accepted':
        return 'Aceptado';
      case 'completed':
        return 'Completado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const handleRequestAction = (requestId: string, action: 'accept' | 'reject' | 'complete') => {
    Alert.alert(
      'Confirmar',
      `¿Estás seguro de que deseas ${action === 'accept' ? 'aceptar' : action === 'reject' ? 'rechazar' : 'marcar como completado'} esta solicitud?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: action === 'accept' ? 'Aceptar' : action === 'reject' ? 'Rechazar' : 'Completar',
          onPress: () => {
            // Aquí iría la lógica para manejar la acción
            Alert.alert('Éxito', 'Acción realizada correctamente');
          },
        },
      ]
    );
  };

  const renderRequestItem = ({ item }: { item: typeof mockRequests[0] }) => (
    <TouchableOpacity
      style={styles.requestCard}
      onPress={() => navigation.navigate('ServiceDetails', {
        service: {
          id: item.id,
          name: item.serviceName,
          category: 'Servicio',
          rating: 4.5,
          distance: '0.5 km',
          price: `$${item.price}`,
          location: {
            latitude: 19.4326,
            longitude: -99.1332,
          },
        },
      })}
    >
      <View style={styles.requestHeader}>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      
      <Text style={styles.clientName}>{item.clientName}</Text>
      
      <View style={styles.requestDetails}>
        <View style={styles.detailItem}>
          <MaterialIcons name="calendar-today" size={16} color="#666" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="access-time" size={16} color="#666" />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="attach-money" size={16} color="#666" />
          <Text style={styles.detailText}>${item.price}</Text>
        </View>
      </View>

      <View style={styles.addressContainer}>
        <MaterialIcons name="location-on" size={16} color="#666" />
        <Text style={styles.addressText}>{item.address}</Text>
      </View>

      {item.status === 'pending' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.acceptButton]}
            onPress={() => handleRequestAction(item.id, 'accept')}
          >
            <MaterialIcons name="check" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleRequestAction(item.id, 'reject')}
          >
            <MaterialIcons name="close" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Rechazar</Text>
          </TouchableOpacity>
        </View>
      )}

      {item.status === 'accepted' && (
        <TouchableOpacity
          style={[styles.actionButton, styles.completeButton]}
          onPress={() => handleRequestAction(item.id, 'complete')}
        >
          <MaterialIcons name="check-circle" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Marcar como Completado</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'pending' && styles.selectedTab]}
          onPress={() => setSelectedTab('pending')}
        >
          <Text style={[styles.tabText, selectedTab === 'pending' && styles.selectedTabText]}>
            Pendientes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'active' && styles.selectedTab]}
          onPress={() => setSelectedTab('active')}
        >
          <Text style={[styles.tabText, selectedTab === 'active' && styles.selectedTabText]}>
            Activos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'completed' && styles.selectedTab]}
          onPress={() => setSelectedTab('completed')}
        >
          <Text style={[styles.tabText, selectedTab === 'completed' && styles.selectedTabText]}>
            Completados
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockRequests}
        renderItem={renderRequestItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  selectedTabText: {
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  requestCard: {
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
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  clientName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  requestDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  addressText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProviderOrdersScreen; 