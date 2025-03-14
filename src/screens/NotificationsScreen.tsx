import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Nuevo servicio disponible',
      message: 'Hay un nuevo servicio de plomería disponible cerca de ti',
      time: '2 min',
      read: false,
      type: 'service',
    },
    {
      id: '2',
      title: 'Actualización de estado',
      message: 'Tu servicio de limpieza ha sido completado',
      time: '1 hora',
      read: true,
      type: 'status',
    },
    {
      id: '3',
      title: 'Promoción especial',
      message: '¡20% de descuento en servicios de electricidad!',
      time: '2 horas',
      read: true,
      type: 'promo',
    },
  ]);

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    serviceUpdates: true,
    promotions: true,
    orderStatus: true,
  });

  const handleToggleSetting = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const renderNotificationIcon = (type: string) => {
    switch (type) {
      case 'service':
        return <MaterialIcons name="local-offer" size={24} color="#2196F3" />;
      case 'status':
        return <MaterialIcons name="check-circle" size={24} color="#4CAF50" />;
      case 'promo':
        return <MaterialIcons name="local-activity" size={24} color="#FF9800" />;
      default:
        return <MaterialIcons name="notifications" size={24} color="#666" />;
    }
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
        <Text style={styles.title}>Notificaciones</Text>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearAll}
        >
          <Text style={styles.clearButtonText}>Limpiar todo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Configuración</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="notifications" size={24} color="#333" />
              <Text style={styles.settingText}>Notificaciones Push</Text>
            </View>
            <Switch
              value={settings.pushNotifications}
              onValueChange={() => handleToggleSetting('pushNotifications')}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="email" size={24} color="#333" />
              <Text style={styles.settingText}>Notificaciones por Email</Text>
            </View>
            <Switch
              value={settings.emailNotifications}
              onValueChange={() => handleToggleSetting('emailNotifications')}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="update" size={24} color="#333" />
              <Text style={styles.settingText}>Actualizaciones de Servicios</Text>
            </View>
            <Switch
              value={settings.serviceUpdates}
              onValueChange={() => handleToggleSetting('serviceUpdates')}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="local-offer" size={24} color="#333" />
              <Text style={styles.settingText}>Promociones</Text>
            </View>
            <Switch
              value={settings.promotions}
              onValueChange={() => handleToggleSetting('promotions')}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <MaterialIcons name="info" size={24} color="#333" />
              <Text style={styles.settingText}>Estado de Pedidos</Text>
            </View>
            <Switch
              value={settings.orderStatus}
              onValueChange={() => handleToggleSetting('orderStatus')}
            />
          </View>
        </View>

        <View style={styles.notificationsSection}>
          <Text style={styles.sectionTitle}>Notificaciones Recientes</Text>
          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialIcons name="notifications-none" size={48} color="#999" />
              <Text style={styles.emptyStateText}>No hay notificaciones</Text>
            </View>
          ) : (
            notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  !notification.read && styles.unreadNotification,
                ]}
                onPress={() => handleMarkAsRead(notification.id)}
              >
                <View style={styles.notificationIcon}>
                  {renderNotificationIcon(notification.type)}
                </View>
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle}>
                      {notification.title}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {notification.time}
                    </Text>
                  </View>
                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
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
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  settingsSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
  },
  notificationsSection: {
    padding: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadNotification: {
    backgroundColor: '#F0F9FF',
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
  },
});

export default NotificationsScreen; 