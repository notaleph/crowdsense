import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { RefreshCcw, Heart, HeartOff } from 'lucide-react-native';
import { useTheme } from '@/hooks/theme-context';
import { useLanguage } from '@/hooks/language-context';
import { useFavorites } from '@/hooks/favorites-context';
import { TrainSchedule, TrainLine, Route } from '@/types/transport';
import { getTrainSchedule } from '@/data/mock-schedules';
import { getStationById } from '@/data/stations';
import { TrainScheduleCard } from '@/components/transport/TrainScheduleCard';
import { Button } from '@/components/ui/Button';

export default function ScheduleScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { addFavorite, removeFavorite, isFavorite, favorites } = useFavorites();
  const params = useLocalSearchParams();
  
  const [schedules, setSchedules] = useState<TrainSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fromStationId = params.from as string;
  const toStationId = params.to as string;
  const line = params.line as TrainLine;
  
  const fromStation = getStationById(fromStationId);
  const toStation = getStationById(toStationId);

  const route: Route | null = fromStation && toStation ? {
    id: `${fromStation.id}-${toStation.id}`,
    from: fromStation,
    to: toStation,
    line,
    duration: Math.floor(Math.random() * 45) + 15,
    fare: Math.floor(Math.random() * 30) + 10,
    distance: Math.floor(Math.random() * 50) + 5,
  } : null;

  const isRouteInFavorites = route ? isFavorite(route) : false;

  useEffect(() => {
    loadSchedules();
  }, [fromStationId, toStationId, line]);

  const loadSchedules = async () => {
    if (!fromStation || !toStation) return;
    
    setIsLoading(true);
    try {
      const data = getTrainSchedule(line, fromStation.name, toStation.name);
      setSchedules(data);
    } catch (error) {
      console.error('Error loading schedules:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    if (!route) return;
    
    if (isRouteInFavorites) {
      const favoriteToRemove = favorites.find(fav => 
        fav.route.from.id === route.from.id && 
        fav.route.to.id === route.to.id &&
        fav.route.line === route.line
      );
      if (favoriteToRemove) {
        removeFavorite(favoriteToRemove.id);
      }
    } else {
      addFavorite(route);
    }
  };

  const getStationName = (station: any) => {
    const { language } = useLanguage();
    return language === 'hi' ? station.nameHi : 
           language === 'mr' ? station.nameMr : station.name;
  };

  const renderSchedule = ({ item }: { item: TrainSchedule }) => (
    <TrainScheduleCard schedule={item} />
  );

  if (!fromStation || !toStation) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.error }]}>
          Invalid route parameters
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen
        options={{
          title: `${fromStation.code} → ${toStation.code}`,
          headerRight: () => (
            <TouchableOpacity onPress={handleFavoriteToggle} style={styles.favoriteButton}>
              {isRouteInFavorites ? (
                <Heart size={24} color={theme.error} fill={theme.error} />
              ) : (
                <HeartOff size={24} color={theme.textSecondary} />
              )}
            </TouchableOpacity>
          ),
        }}
      />

      <View style={[styles.routeInfo, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <View style={styles.routeHeader}>
          <Text style={[styles.routeTitle, { color: theme.text }]}>
            {getStationName(fromStation)} → {getStationName(toStation)}
          </Text>
          <Text style={[styles.routeSubtitle, { color: theme.textSecondary }]}>
            {t(line)} • {route?.duration}min • ₹{route?.fare}
          </Text>
        </View>
        <Button
          title="Refresh"
          onPress={loadSchedules}
          variant="outline"
          size="small"
          style={styles.refreshButton}
        />
      </View>

      <FlatList
        data={schedules}
        renderItem={renderSchedule}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        onRefresh={loadSchedules}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.schedulesList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  routeHeader: {
    flex: 1,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  routeSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  refreshButton: {
    minWidth: 80,
  },
  favoriteButton: {
    padding: 4,
  },
  schedulesList: {
    paddingVertical: 8,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
});