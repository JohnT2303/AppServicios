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

type DaySchedule = {
  isWorking: boolean;
  startTime: string;
  endTime: string;
};

type WeekSchedule = {
  [key: string]: DaySchedule;
};

const WorkScheduleScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [schedule, setSchedule] = useState<WeekSchedule>({
    monday: {
      isWorking: true,
      startTime: '09:00',
      endTime: '18:00',
    },
    tuesday: {
      isWorking: true,
      startTime: '09:00',
      endTime: '18:00',
    },
    wednesday: {
      isWorking: true,
      startTime: '09:00',
      endTime: '18:00',
    },
    thursday: {
      isWorking: true,
      startTime: '09:00',
      endTime: '18:00',
    },
    friday: {
      isWorking: true,
      startTime: '09:00',
      endTime: '18:00',
    },
    saturday: {
      isWorking: false,
      startTime: '10:00',
      endTime: '14:00',
    },
    sunday: {
      isWorking: false,
      startTime: '10:00',
      endTime: '14:00',
    },
  });

  const handleToggleDay = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isWorking: !prev[day].isWorking,
      },
    }));
  };

  const handleTimeChange = (day: string, type: 'startTime' | 'endTime') => {
    Alert.alert(
      `Cambiar ${type === 'startTime' ? 'Hora de Inicio' : 'Hora de Fin'}`,
      'Selecciona la nueva hora',
      [
        { text: '09:00', onPress: () => updateTime(day, type, '09:00') },
        { text: '10:00', onPress: () => updateTime(day, type, '10:00') },
        { text: '11:00', onPress: () => updateTime(day, type, '11:00') },
        { text: '12:00', onPress: () => updateTime(day, type, '12:00') },
        { text: '13:00', onPress: () => updateTime(day, type, '13:00') },
        { text: '14:00', onPress: () => updateTime(day, type, '14:00') },
        { text: '15:00', onPress: () => updateTime(day, type, '15:00') },
        { text: '16:00', onPress: () => updateTime(day, type, '16:00') },
        { text: '17:00', onPress: () => updateTime(day, type, '17:00') },
        { text: '18:00', onPress: () => updateTime(day, type, '18:00') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const updateTime = (day: string, type: 'startTime' | 'endTime', time: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: time,
      },
    }));
  };

  const getDayName = (day: string): string => {
    const days: { [key: string]: string } = {
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves',
      friday: 'Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo',
    };
    return days[day];
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
        <Text style={styles.title}>Horario de Trabajo</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.scheduleCard}>
          {Object.entries(schedule).map(([day, schedule]) => (
            <View key={day} style={styles.dayRow}>
              <View style={styles.dayInfo}>
                <Text style={styles.dayName}>{getDayName(day)}</Text>
                {schedule.isWorking ? (
                  <Text style={styles.workingHours}>
                    {schedule.startTime} - {schedule.endTime}
                  </Text>
                ) : (
                  <Text style={styles.closedText}>Cerrado</Text>
                )}
              </View>
              <View style={styles.dayActions}>
                <Switch
                  value={schedule.isWorking}
                  onValueChange={() => handleToggleDay(day)}
                />
                {schedule.isWorking && (
                  <View style={styles.timeButtons}>
                    <TouchableOpacity
                      style={styles.timeButton}
                      onPress={() => handleTimeChange(day, 'startTime')}
                    >
                      <MaterialIcons name="schedule" size={20} color="#007AFF" />
                      <Text style={styles.timeButtonText}>
                        {schedule.startTime}
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.timeSeparator}>-</Text>
                    <TouchableOpacity
                      style={styles.timeButton}
                      onPress={() => handleTimeChange(day, 'endTime')}
                    >
                      <MaterialIcons name="schedule" size={20} color="#007AFF" />
                      <Text style={styles.timeButtonText}>
                        {schedule.endTime}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.infoCard}>
          <MaterialIcons name="info" size={24} color="#2196F3" />
          <Text style={styles.infoText}>
            Tu horario de trabajo determina cuándo estarás disponible para recibir solicitudes de servicios.
            Los clientes solo podrán solicitar servicios durante las horas que hayas especificado.
          </Text>
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
    padding: 16,
  },
  scheduleCard: {
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
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dayInfo: {
    flex: 1,
  },
  dayName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  workingHours: {
    fontSize: 14,
    color: '#4CAF50',
  },
  closedText: {
    fontSize: 14,
    color: '#FF3B30',
  },
  dayActions: {
    alignItems: 'flex-end',
  },
  timeButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  timeButtonText: {
    fontSize: 14,
    color: '#007AFF',
  },
  timeSeparator: {
    marginHorizontal: 8,
    color: '#666',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#2196F3',
  },
});

export default WorkScheduleScreen; 