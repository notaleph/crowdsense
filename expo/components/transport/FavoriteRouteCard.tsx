import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, Bell, BellOff, Trash2, Clock } from 'lucide-react-native';
import { useTheme } from '@/hooks/theme-context';
import { useLanguage } from '@/hooks/language-context';
import { FavoriteRoute } from '@/types/transport';
import { Card } from '@/components/ui/Card';

interface FavoriteRouteCardProps {
  favorite: FavoriteRoute;
  onToggleAlerts: (id: string) => void;
  onRemove: (id: string) => void;
  onPress: (favorite: FavoriteRoute) => void;
}

export const FavoriteRouteCard: React.FC<FavoriteRouteCardProps> = ({
  favorite,
  onToggleAlerts,
  onRemove,
  onPress,
}) => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();

  const getStationName = (station: any) => {
    return language === 'hi' ? station.nameHi : 
           language === 'mr' ? station.nameMr : station.name;
  };

  return (
    <TouchableOpacity onPress={() => onPress(favorite)}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.routeInfo}>
            <Text style={[styles.routeName, { color: theme.text }]}>
              {favorite.nickname || `${getStationName(favorite.route.from)} → ${getStationName(favorite.route.to)}`}
            </Text>
            <Text style={[styles.routeDetails, { color: theme.textSecondary }]}>
              {t(favorite.route.line)} • {favorite.route.duration}min • ₹{favorite.route.fare}
            </Text>
          </View>
          <Heart size={20} color={theme.secondary} fill={theme.secondary} />
        </View>

        <View style={styles.stationContainer}>
          <View style={styles.station}>
            <Text style={[styles.stationName, { color: theme.text }]}>
              {getStationName(favorite.route.from)}
            </Text>
            <Text style={[styles.stationCode, { color: theme.textSecondary }]}>
              {favorite.route.from.code}
            </Text>
          </View>
          <View style={styles.arrow}>
            <Text style={[styles.arrowText, { color: theme.primary }]}>→</Text>
          </View>
          <View style={styles.station}>
            <Text style={[styles.stationName, { color: theme.text }]}>
              {getStationName(favorite.route.to)}
            </Text>
            <Text style={[styles.stationCode, { color: theme.textSecondary }]}>
              {favorite.route.to.code}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.timeInfo}>
            <Clock size={14} color={theme.textSecondary} />
            <Text style={[styles.timeText, { color: theme.textSecondary }]}>
              Added {favorite.createdAt.toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => onToggleAlerts(favorite.id)}
              style={styles.actionButton}
            >
              {favorite.alertsEnabled ? (
                <Bell size={18} color={theme.primary} />
              ) : (
                <BellOff size={18} color={theme.textSecondary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onRemove(favorite.id)}
              style={styles.actionButton}
            >
              <Trash2 size={18} color={theme.error} />
            </TouchableOpacity>
          </View>
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  routeDetails: {
    fontSize: 14,
  },
  stationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  station: {
    flex: 1,
    alignItems: 'center',
  },
  stationName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  stationCode: {
    fontSize: 12,
    marginTop: 2,
  },
  arrow: {
    paddingHorizontal: 16,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
});