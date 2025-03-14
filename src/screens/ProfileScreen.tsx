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

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const menuItems = [
    {
      id: 'personal',
      title: 'Información Personal',
      icon: 'person',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      id: 'addresses',
      title: 'Mis Direcciones',
      icon: 'location-on',
      onPress: () => navigation.navigate('Addresses'),
    },
    {
      id: 'payment',
      title: 'Métodos de Pago',
      icon: 'credit-card',
      onPress: () => navigation.navigate('PaymentMethods'),
    },
    {
      id: 'notifications',
      title: 'Notificaciones',
      icon: 'notifications',
      onPress: () => navigation.navigate('Notifications'),
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
        <Text style={styles.name}>Usuario</Text>
        <Text style={styles.email}>usuario@ejemplo.com</Text>
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

export default ProfileScreen; 