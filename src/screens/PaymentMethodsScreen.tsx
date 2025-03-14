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

const PaymentMethodsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [paymentMethods] = useState([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryDate: '12/25',
      isDefault: true,
    },
    {
      id: '2',
      type: 'card',
      last4: '8888',
      brand: 'Mastercard',
      expiryDate: '06/24',
      isDefault: false,
    },
    {
      id: '3',
      type: 'paypal',
      email: 'usuario@ejemplo.com',
      isDefault: false,
    },
  ]);

  const handleAddPaymentMethod = () => {
    // Aquí iría la lógica para agregar un nuevo método de pago
    Alert.alert('Agregar Método de Pago', 'Funcionalidad en desarrollo');
  };

  const handleEditPaymentMethod = (methodId: string) => {
    // Aquí iría la lógica para editar un método de pago
    Alert.alert('Editar Método de Pago', 'Funcionalidad en desarrollo');
  };

  const handleDeletePaymentMethod = (methodId: string) => {
    Alert.alert(
      'Eliminar Método de Pago',
      '¿Estás seguro de que deseas eliminar este método de pago?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            // Aquí iría la lógica para eliminar el método de pago
            Alert.alert('Éxito', 'Método de pago eliminado correctamente');
          },
        },
      ]
    );
  };

  const handleSetDefault = (methodId: string) => {
    // Aquí iría la lógica para establecer el método de pago como predeterminado
    Alert.alert('Éxito', 'Método de pago predeterminado actualizado');
  };

  const renderPaymentMethodIcon = (type: string, brand?: string) => {
    switch (type) {
      case 'card':
        return brand === 'Visa' ? (
          <MaterialIcons name="credit-card" size={24} color="#1A1F71" />
        ) : (
          <MaterialIcons name="credit-card" size={24} color="#EB001B" />
        );
      case 'paypal':
        return <MaterialIcons name="account-balance-wallet" size={24} color="#003087" />;
      default:
        return <MaterialIcons name="credit-card" size={24} color="#666" />;
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
        <Text style={styles.title}>Métodos de Pago</Text>
      </View>

      <ScrollView style={styles.content}>
        {paymentMethods.map((method) => (
          <View key={method.id} style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              <View style={styles.paymentIcon}>
                {renderPaymentMethodIcon(method.type, method.brand)}
              </View>
              <View style={styles.paymentInfo}>
                {method.type === 'card' ? (
                  <>
                    <Text style={styles.cardBrand}>{method.brand}</Text>
                    <Text style={styles.cardNumber}>•••• {method.last4}</Text>
                    <Text style={styles.expiryDate}>Expira: {method.expiryDate}</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.cardBrand}>PayPal</Text>
                    <Text style={styles.cardNumber}>{method.email}</Text>
                  </>
                )}
              </View>
              {method.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Predeterminado</Text>
                </View>
              )}
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() => handleEditPaymentMethod(method.id)}
              >
                <MaterialIcons name="edit" size={20} color="#007AFF" />
                <Text style={[styles.actionButtonText, styles.editButtonText]}>
                  Editar
                </Text>
              </TouchableOpacity>

              {!method.isDefault && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.defaultButton]}
                  onPress={() => handleSetDefault(method.id)}
                >
                  <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                  <Text style={[styles.actionButtonText, styles.defaultButtonText]}>
                    Establecer como predeterminado
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDeletePaymentMethod(method.id)}
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
        onPress={handleAddPaymentMethod}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Agregar Nuevo Método de Pago</Text>
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
  paymentCard: {
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
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  paymentInfo: {
    flex: 1,
  },
  cardBrand: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  expiryDate: {
    fontSize: 12,
    color: '#999',
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
  actionButtons: {
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

export default PaymentMethodsScreen; 