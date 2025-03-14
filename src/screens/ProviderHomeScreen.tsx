import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const ProviderHomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

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
    },
    {
      id: '2',
      serviceName: 'Electricidad',
      clientName: 'María García',
      date: '2024-03-19',
      time: '10:00',
      status: 'accepted',
      price: 200,
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
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola!</Text>
          <Text style={styles.name}>Proveedor</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => {/* TODO: Implement notifications */}}
        >
          <MaterialIcons name="notifications" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialIcons name="pending-actions" size={24} color="#FFA000" />
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Pendientes</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Completados</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="star" size={24} color="#FFD700" />
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Calificación</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Solicitudes Recientes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProviderOrders')}>
            <Text style={styles.seeAll}>Ver todas</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={mockRequests}
          renderItem={renderRequestItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 14,
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
});

export default ProviderHomeScreen; 