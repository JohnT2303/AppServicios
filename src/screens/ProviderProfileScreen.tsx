import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const ProviderProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const menuItems = [
    {
      id: 'personal',
      title: 'Información Personal',
      icon: 'person',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      id: 'services',
      title: 'Mis Servicios',
      icon: 'handyman',
      onPress: () => navigation.navigate('ProviderServices'),
    },
    {
      id: 'schedule',
      title: 'Horario de Trabajo',
      icon: 'schedule',
      onPress: () => navigation.navigate('WorkSchedule'),
    },
    {
      id: 'earnings',
      title: 'Ganancias',
      icon: 'attach-money',
      onPress: () => navigation.navigate('Earnings'),
    },
    {
      id: 'settings',
      title: 'Configuración',
      icon: 'settings',
      onPress: () => navigation.navigate('Settings'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <MaterialIcons name="camera-alt" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Proveedor</Text>
        <Text style={styles.email}>proveedor@ejemplo.com</Text>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={20} color="#FFD700" />
          <Text style={styles.rating}>4.8</Text>
          <Text style={styles.reviews}>(120 reseñas)</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
          <Text style={styles.statNumber}>156</Text>
          <Text style={styles.statLabel}>Servicios Completados</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="star" size={24} color="#FFD700" />
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Calificación</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="attach-money" size={24} color="#4CAF50" />
          <Text style={styles.statNumber}>$12,450</Text>
          <Text style={styles.statLabel}>Ganancias Totales</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              <MaterialIcons name={item.icon} size={24} color="#333" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <MaterialIcons name="logout" size={24} color="#FF3B30" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
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
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
    marginLeft: 8,
  },
});

export default ProviderProfileScreen; 