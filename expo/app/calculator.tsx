import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Calculator as CalculatorIcon, Car, Zap } from 'lucide-react-native';
import { useTheme } from '@/hooks/theme-context';
import { useLanguage } from '@/hooks/language-context';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function CalculatorScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [distance, setDistance] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<'taxi' | 'auto'>('taxi');

  const vehicles = [
    {
      type: 'taxi' as const,
      name: t('taxi'),
      icon: Car,
      baseFare: 25,
      perKm: 17,
      color: theme.primary,
    },
    {
      type: 'auto' as const,
      name: t('auto'),
      icon: Zap,
      baseFare: 21,
      perKm: 14,
      color: theme.secondary,
    },
  ];

  const calculateFare = () => {
    const dist = parseFloat(distance);
    if (isNaN(dist) || dist <= 0) return 0;

    const vehicle = vehicles.find(v => v.type === selectedVehicle);
    if (!vehicle) return 0;

    return vehicle.baseFare + (dist * vehicle.perKm);
  };

  const fare = calculateFare();

  const numberButtons = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '⌫'],
  ];

  const handleNumberPress = (num: string) => {
    if (num === '⌫') {
      setDistance(prev => prev.slice(0, -1));
    } else if (num === '.' && distance.includes('.')) {
      return;
    } else {
      setDistance(prev => prev + num);
    }
  };

  const clearDistance = () => {
    setDistance('');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: t('fareCalculator') }} />

      <Card style={styles.vehicleSelector}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Select Vehicle Type
        </Text>
        <View style={styles.vehicleButtons}>
          {vehicles.map((vehicle) => {
            const IconComponent = vehicle.icon;
            const isSelected = selectedVehicle === vehicle.type;
            
            return (
              <TouchableOpacity
                key={vehicle.type}
                style={[
                  styles.vehicleButton,
                  {
                    backgroundColor: isSelected ? vehicle.color : theme.surface,
                    borderColor: vehicle.color,
                  }
                ]}
                onPress={() => setSelectedVehicle(vehicle.type)}
              >
                <IconComponent 
                  size={24} 
                  color={isSelected ? '#FFFFFF' : vehicle.color} 
                />
                <Text style={[
                  styles.vehicleButtonText,
                  { color: isSelected ? '#FFFFFF' : vehicle.color }
                ]}>
                  {vehicle.name}
                </Text>
                <Text style={[
                  styles.vehicleRate,
                  { color: isSelected ? '#FFFFFF' : theme.textSecondary }
                ]}>
                  ₹{vehicle.baseFare} + ₹{vehicle.perKm}/km
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      <Card style={styles.distanceInput}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Distance (km)
        </Text>
        <View style={[styles.display, { backgroundColor: theme.surface }]}>
          <Text style={[styles.distanceText, { color: theme.text }]}>
            {distance || '0'}
          </Text>
          <Text style={[styles.kmLabel, { color: theme.textSecondary }]}>
            km
          </Text>
        </View>
      </Card>

      <Card style={styles.calculator}>
        <View style={styles.numberPad}>
          {numberButtons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.numberRow}>
              {row.map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.numberButton,
                    { 
                      backgroundColor: num === '⌫' ? theme.error + '20' : theme.surface,
                      borderColor: theme.border,
                    }
                  ]}
                  onPress={() => handleNumberPress(num)}
                >
                  <Text style={[
                    styles.numberButtonText,
                    { 
                      color: num === '⌫' ? theme.error : theme.text,
                      fontSize: num === '⌫' ? 18 : 20,
                    }
                  ]}>
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <Button
          title="Clear"
          onPress={clearDistance}
          variant="outline"
          style={styles.clearButton}
        />
      </Card>

      <Card style={styles.fareResult}>
        <View style={styles.fareHeader}>
          <CalculatorIcon size={24} color={theme.primary} />
          <Text style={[styles.fareTitle, { color: theme.text }]}>
            Estimated Fare
          </Text>
        </View>
        
        {distance && (
          <View style={styles.fareBreakdown}>
            <View style={styles.fareRow}>
              <Text style={[styles.fareLabel, { color: theme.textSecondary }]}>
                Base Fare:
              </Text>
              <Text style={[styles.fareValue, { color: theme.text }]}>
                ₹{vehicles.find(v => v.type === selectedVehicle)?.baseFare}
              </Text>
            </View>
            <View style={styles.fareRow}>
              <Text style={[styles.fareLabel, { color: theme.textSecondary }]}>
                Distance ({distance} km):
              </Text>
              <Text style={[styles.fareValue, { color: theme.text }]}>
                ₹{((parseFloat(distance) || 0) * (vehicles.find(v => v.type === selectedVehicle)?.perKm || 0)).toFixed(2)}
              </Text>
            </View>
            <View style={[styles.fareRow, styles.totalRow, { borderTopColor: theme.border }]}>
              <Text style={[styles.totalLabel, { color: theme.text }]}>
                Total:
              </Text>
              <Text style={[styles.totalValue, { color: theme.primary }]}>
                ₹{fare.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
        
        {!distance && (
          <Text style={[styles.noDistanceText, { color: theme.textSecondary }]}>
            Enter distance to calculate fare
          </Text>
        )}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  vehicleSelector: {
    marginBottom: 16,
  },
  vehicleButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  vehicleButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    gap: 8,
  },
  vehicleButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  vehicleRate: {
    fontSize: 12,
    textAlign: 'center',
  },
  distanceInput: {
    marginBottom: 16,
  },
  display: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 8,
    gap: 8,
  },
  distanceText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  kmLabel: {
    fontSize: 18,
  },
  calculator: {
    marginBottom: 16,
  },
  numberPad: {
    gap: 8,
    marginBottom: 16,
  },
  numberRow: {
    flexDirection: 'row',
    gap: 8,
  },
  numberButton: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberButtonText: {
    fontWeight: '600',
  },
  clearButton: {
    marginTop: 8,
  },
  fareResult: {
    marginBottom: 16,
  },
  fareHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  fareTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  fareBreakdown: {
    gap: 8,
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  fareLabel: {
    fontSize: 14,
  },
  fareValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  noDistanceText: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});