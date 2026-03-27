import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, MapPin, AlertCircle, CheckCircle, XCircle } from 'lucide-react-native';
import { useTheme } from '@/hooks/theme-context';
import { useLanguage } from '@/hooks/language-context';
import { TrainSchedule } from '@/types/transport';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';

interface TrainScheduleCardProps {
  schedule: TrainSchedule;
}

export const TrainScheduleCard: React.FC<TrainScheduleCardProps> = ({ schedule }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const getStatusIcon = () => {
    switch (schedule.status) {
      case 'onTime':
        return <CheckCircle size={16} color={theme.success} />;
      case 'delayed':
        return <AlertCircle size={16} color={theme.warning} />;
      case 'cancelled':
        return <XCircle size={16} color={theme.error} />;
      default:
        return <Clock size={16} color={theme.textSecondary} />;
    }
  };

  const getStatusColor = () => {
    switch (schedule.status) {
      case 'onTime':
        return theme.success;
      case 'delayed':
        return theme.warning;
      case 'cancelled':
        return theme.error;
      default:
        return theme.textSecondary;
    }
  };

  const getTypeColor = () => {
    switch (schedule.type) {
      case 'fast':
        return theme.primary;
      case 'express':
        return theme.secondary;
      default:
        return theme.textSecondary;
    }
  };

  const handlePress = () => {
    router.push({
      pathname: '/trains/cart-occupancy',
      params: {
        trainId: schedule.id,
        trainNumber: schedule.trainNumber,
        departure: schedule.departure,
        destination: schedule.destination,
      },
    } as any);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.trainInfo}>
          <Text style={[styles.trainNumber, { color: theme.text }]}>
            {schedule.trainNumber}
          </Text>
          <View style={[styles.typeBadge, { backgroundColor: getTypeColor() }]}>
            <Text style={styles.typeText}>{t(schedule.type)}</Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          {getStatusIcon()}
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {t(schedule.status)}
            {schedule.delay && ` (+${schedule.delay}m)`}
          </Text>
        </View>
      </View>

      <View style={styles.timeContainer}>
        <View style={styles.timeInfo}>
          <Clock size={16} color={theme.textSecondary} />
          <Text style={[styles.timeLabel, { color: theme.textSecondary }]}>
            {t('departure')}
          </Text>
          <Text style={[styles.time, { color: theme.text }]}>
            {schedule.departure}
          </Text>
        </View>
        <View style={styles.arrow}>
          <Text style={[styles.arrowText, { color: theme.textSecondary }]}>→</Text>
        </View>
        <View style={styles.timeInfo}>
          <Clock size={16} color={theme.textSecondary} />
          <Text style={[styles.timeLabel, { color: theme.textSecondary }]}>
            {t('arrival')}
          </Text>
          <Text style={[styles.time, { color: theme.text }]}>
            {schedule.arrival}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.platformInfo}>
          <MapPin size={16} color={theme.textSecondary} />
          <Text style={[styles.platformText, { color: theme.textSecondary }]}>
            {t('platform')} {schedule.platform}
          </Text>
        </View>
        <Text style={[styles.destination, { color: theme.text }]}>
          → {schedule.destination}
        </Text>
      </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trainNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timeInfo: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
  },
  arrow: {
    paddingHorizontal: 16,
  },
  arrowText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  platformInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  platformText: {
    fontSize: 14,
  },
  destination: {
    fontSize: 14,
    fontWeight: '500',
  },
});