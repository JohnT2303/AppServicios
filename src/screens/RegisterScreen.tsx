import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client' as 'client' | 'provider',
  });

  const handleRegister = async () => {
    try {
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }

      await register(
        formData.email,
        formData.password,
        formData.name,
        formData.role
      );
      navigation.replace('MainTabs');
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>
          Únete a nuestra comunidad de servicios
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre completo"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="tu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmPassword: text })
            }
          />
        </View>

        <View style={styles.roleContainer}>
          <Text style={styles.label}>Tipo de cuenta</Text>
          <View style={styles.roleButtons}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                formData.role === 'client' && styles.roleButtonActive,
              ]}
              onPress={() => setFormData({ ...formData, role: 'client' })}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  formData.role === 'client' && styles.roleButtonTextActive,
                ]}
              >
                Cliente
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roleButton,
                formData.role === 'provider' && styles.roleButtonActive,
              ]}
              onPress={() => setFormData({ ...formData, role: 'provider' })}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  formData.role === 'provider' && styles.roleButtonTextActive,
                ]}
              >
                Proveedor
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginLinkText}>
            ¿Ya tienes una cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
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
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    padding: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  roleContainer: {
    marginBottom: 24,
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 4,
  },
  roleButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  roleButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  roleButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default RegisterScreen; 