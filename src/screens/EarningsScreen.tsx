import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const EarningsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  const earningsData = {
    total: 12500,
    completedServices: 45,
    averageRating: 4.8,
    totalReviews: 156,
    periodBreakdown: {
      week: {
        daily: [1200, 1500, 1800, 2000, 1600, 1400, 1000],
        total: 10400,
      },
      month: {
        weekly: [10400, 9800, 11200, 8900],
        total: 40300,
      },
      year: {
        monthly: [40300, 45000, 38000, 42000, 35000, 40000, 38000, 42000, 45000, 40000, 38000, 42000],
        total: 489300,
      },
    },
  };

  const getPeriodLabel = (period: 'week' | 'month' | 'year') => {
    switch (period) {
      case 'week':
        return 'Esta Semana';
      case 'month':
        return 'Este Mes';
      case 'year':
        return 'Este Año';
      default:
        return '';
    }
  };

  const getPeriodTotal = (period: 'week' | 'month' | 'year') => {
    return earningsData.periodBreakdown[period].total;
  };

  const renderPeriodSelector = () => (
    <View style={styles.periodSelector}>
      {(['week', 'month', 'year'] as const).map((period) => (
        <TouchableOpacity
          key={period}
          style={[
            styles.periodButton,
            selectedPeriod === period && styles.selectedPeriodButton,
          ]}
          onPress={() => setSelectedPeriod(period)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === period && styles.selectedPeriodButtonText,
            ]}
          >
            {getPeriodLabel(period)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderEarningsSummary = () => (
    <View style={styles.summaryCard}>
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryTitle}>Resumen de Ganancias</Text>
        <Text style={styles.summaryPeriod}>
          {getPeriodLabel(selectedPeriod)}
        </Text>
      </View>

      <View style={styles.summaryContent}>
        <View style={styles.summaryItem}>
          <MaterialIcons name="attach-money" size={24} color="#4CAF50" />
          <View style={styles.summaryItemInfo}>
            <Text style={styles.summaryItemLabel}>Ganancias Totales</Text>
            <Text style={styles.summaryItemValue}>
              ${getPeriodTotal(selectedPeriod).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.summaryItem}>
          <MaterialIcons name="check-circle" size={24} color="#2196F3" />
          <View style={styles.summaryItemInfo}>
            <Text style={styles.summaryItemLabel}>Servicios Completados</Text>
            <Text style={styles.summaryItemValue}>
              {earningsData.completedServices}
            </Text>
          </View>
        </View>

        <View style={styles.summaryItem}>
          <MaterialIcons name="star" size={24} color="#FFC107" />
          <View style={styles.summaryItemInfo}>
            <Text style={styles.summaryItemLabel}>Calificación Promedio</Text>
            <Text style={styles.summaryItemValue}>
              {earningsData.averageRating} ({earningsData.totalReviews})
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderEarningsChart = () => (
    <View style={styles.chartCard}>
      <Text style={styles.chartTitle}>Ganancias por Período</Text>
      <View style={styles.chartContainer}>
        {selectedPeriod === 'week' ? (
          <View style={styles.weekChart}>
            {earningsData.periodBreakdown.week.daily.map((amount, index) => (
              <View key={index} style={styles.chartBar}>
                <View
                  style={[
                    styles.chartBarFill,
                    {
                      height: `${(amount / 2000) * 100}%`,
                    },
                  ]}
                />
                <Text style={styles.chartLabel}>
                  ${amount.toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.chartPlaceholder}>
            <MaterialIcons name="bar-chart" size={48} color="#999" />
            <Text style={styles.chartPlaceholderText}>
              Gráfico de {selectedPeriod === 'month' ? 'mensual' : 'anual'} en desarrollo
            </Text>
          </View>
        )}
      </View>
    </View>
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
        <Text style={styles.title}>Ganancias</Text>
      </View>

      <ScrollView style={styles.content}>
        {renderPeriodSelector()}
        {renderEarningsSummary()}
        {renderEarningsChart()}

        <View style={styles.infoCard}>
          <MaterialIcons name="info" size={24} color="#2196F3" />
          <Text style={styles.infoText}>
            Las ganancias se actualizan diariamente y reflejan los servicios completados.
            Los pagos se procesan semanalmente a tu cuenta bancaria registrada.
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
  periodSelector: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  selectedPeriodButton: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  periodButtonText: {
    fontSize: 14,
    color: '#666',
  },
  selectedPeriodButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  summaryCard: {
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
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryPeriod: {
    fontSize: 14,
    color: '#666',
  },
  summaryContent: {
    gap: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  summaryItemInfo: {
    flex: 1,
  },
  summaryItemLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  summaryItemValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartCard: {
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
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chartContainer: {
    height: 200,
    justifyContent: 'center',
  },
  weekChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  chartBarFill: {
    width: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  chartLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  chartPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
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

export default EarningsScreen; 