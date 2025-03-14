import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [settings, setSettings] = useState({
    darkMode: true,
    locationServices: true,
    autoPlayVideos: false,
    soundEffects: true,
    vibration: true,
    language: 'es',
    currency: 'MXN',
  });

  const handleToggleSetting = (setting: keyof typeof settings) => {
    if (typeof settings[setting] === 'boolean') {
      setSettings((prev) => ({
        ...prev,
        [setting]: !prev[setting],
      }));
    }
  };

  const handleLanguageChange = () => {
    Alert.alert(
      'Cambiar Idioma',
      'Selecciona el idioma de la aplicación',
      [
        { text: 'Español', onPress: () => setSettings((prev) => ({ ...prev, language: 'es' })) },
        { text: 'English', onPress: () => setSettings((prev) => ({ ...prev, language: 'en' })) },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const handleCurrencyChange = () => {
    Alert.alert(
      'Cambiar Moneda',
      'Selecciona la moneda de la aplicación',
      [
        { text: 'MXN', onPress: () => setSettings((prev) => ({ ...prev, currency: 'MXN' })) },
        { text: 'USD', onPress: () => setSettings((prev) => ({ ...prev, currency: 'USD' })) },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Limpiar Caché',
      '¿Estás seguro de que deseas limpiar la caché de la aplicación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpiar',
          onPress: () => {
            // Aquí iría la lógica para limpiar la caché
            Alert.alert('Éxito', 'Caché limpiada correctamente');
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => {
            // Aquí iría la lógica para cerrar sesión
            navigation.navigate('Login');
          },
        },
      ]
    );
  };

  const renderSettingItem = (
    icon: keyof typeof MaterialIcons.glyphMap,
    title: string,
    value: boolean | string,
    onPress: () => void,
    type: 'toggle' | 'select' = 'toggle'
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={type === 'select' ? onPress : undefined}
    >
      <View style={styles.settingInfo}>
        <MaterialIcons name={icon} size={24} color="#333" />
        <Text style={styles.settingText}>{title}</Text>
      </View>
      {type === 'toggle' ? (
        <Switch
          value={value as boolean}
          onValueChange={onPress}
        />
      ) : (
        <View style={styles.selectValue}>
          <Text style={styles.selectValueText}>{value}</Text>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Configuración</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apariencia</Text>
          {renderSettingItem(
            'dark-mode',
            'Modo Oscuro',
            settings.darkMode,
            () => handleToggleSetting('darkMode')
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferencias</Text>
          {renderSettingItem(
            'location-on',
            'Servicios de Ubicación',
            settings.locationServices,
            () => handleToggleSetting('locationServices')
          )}
          {renderSettingItem(
            'play-circle-outline',
            'Reproducción Automática de Videos',
            settings.autoPlayVideos,
            () => handleToggleSetting('autoPlayVideos')
          )}
          {renderSettingItem(
            'volume-up',
            'Efectos de Sonido',
            settings.soundEffects,
            () => handleToggleSetting('soundEffects')
          )}
          {renderSettingItem(
            'vibration',
            'Vibración',
            settings.vibration,
            () => handleToggleSetting('vibration')
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Idioma y Moneda</Text>
          {renderSettingItem(
            'language',
            'Idioma',
            settings.language.toUpperCase(),
            handleLanguageChange,
            'select'
          )}
          {renderSettingItem(
            'attach-money',
            'Moneda',
            settings.currency,
            handleCurrencyChange,
            'select'
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleClearCache}
          >
            <View style={styles.settingInfo}>
              <MaterialIcons name="cleaning-services" size={24} color="#333" />
              <Text style={styles.settingText}>Limpiar Caché</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleLogout}
          >
            <View style={styles.settingInfo}>
              <MaterialIcons name="logout" size={24} color="#FF3B30" />
              <Text style={[styles.settingText, styles.logoutText]}>
                Cerrar Sesión
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
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
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#666',
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
  selectValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  selectValueText: {
    fontSize: 16,
    color: '#666',
  },
  logoutText: {
    color: '#FF3B30',
  },
});

export default SettingsScreen; 