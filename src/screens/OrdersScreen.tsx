import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const OrdersScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  // Mock data for orders
  const mockOrders = [
    {
      id: '1',
      serviceName: 'Plomería Express',
      providerName: 'Juan Pérez',
      date: '2024-03-20',
      status: 'pending',
      price: 150,
    },
    {
      id: '2',
      serviceName: 'Electricidad Pro',
      providerName: 'María García',
      date: '2024-03-19',
      status: 'completed',
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

  const renderOrderItem = ({ item }: { item: typeof mockOrders[0] }) => (
    <TouchableOpacity
      style={styles.orderCard}
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
      <View style={styles.orderHeader}>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      
      <Text style={styles.providerName}>{item.providerName}</Text>
      
      <View style={styles.orderDetails}>
        <View style={styles.detailItem}>
          <MaterialIcons name="calendar-today" size={16} color="#666" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="attach-money" size={16} color="#666" />
          <Text style={styles.detailText}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Pedidos</Text>
      </View>
      
      <FlatList
        data={mockOrders}
        renderItem={renderOrderItem}
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  orderCard: {
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
  orderHeader: {
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
  providerName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  orderDetails: {
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

export default OrdersScreen; 