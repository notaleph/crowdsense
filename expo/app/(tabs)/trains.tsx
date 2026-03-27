import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { ArrowUpDown, Clock, MapPin, Search } from 'lucide-react-native';
import { useTheme } from '@/hooks/theme-context';
import { useLanguage } from '@/hooks/language-context';
import { Station, TrainLine } from '@/types/transport';
import { StationPicker } from '@/components/transport/StationPicker';
import { DestinationSelector } from '@/components/transport/DestinationSelector';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SearchBar } from '@/components/ui/SearchBar';
import { getStationsByLine, searchStations } from '@/data/stations';
import { router } from 'expo-router';

export default function TrainsScreen() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const [fromStation, setFromStation] = useState<Station | undefined>();
  const [toStation, setToStation] = useState<Station | undefined>();
  const [selectedLine, setSelectedLine] = useState<TrainLine>('western');
  const [showStationList, setShowStationList] = useState(true);
  const [selectedStation, setSelectedStation] = useState<Station | undefined>();
  const [showDestinationSelector, setShowDestinationSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const trainLines: { line: TrainLine; name: string; color: string }[] = [
    { line: 'western', name: t('western'), color: '#4CAF50' },
    { line: 'central', name: t('central'), color: '#2196F3' },
    { line: 'harbour', name: t('harbour'), color: '#FF9800' },
  ];

  const getStationName = (station: Station) => {
    return language === 'hi' ? station.nameHi : 
           language === 'mr' ? station.nameMr : station.name;
  };

  const getStations = () => {
    if (searchQuery) {
      return searchStations(searchQuery, language).filter(s => s.line === selectedLine);
    }
    return getStationsByLine(selectedLine);
  };

  const handleStationSelect = (station: Station) => {
    setSelectedStation(station);
    setShowDestinationSelector(true);
  };

  const swapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const searchTrains = () => {
    if (fromStation && toStation) {
      router.push({
        pathname: '/trains/schedule',
        params: {
          from: fromStation.id,
          to: toStation.id,
          line: selectedLine,
        },
      } as any);
    }
  };

  const renderStationItem = ({ item }: { item: Station }) => (
    <TouchableOpacity
      style={[styles.stationListItem, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={() => handleStationSelect(item)}
    >
      <View style={styles.stationItemContent}>
        <View style={styles.stationItemHeader}>
          <MapPin size={20} color={theme.primary} />
          <Text style={[styles.stationItemName, { color: theme.text }]}>
            {getStationName(item)}
          </Text>
        </View>
        <Text style={[styles.stationItemCode, { color: theme.textSecondary }]}>
          {item.code} • Zone {item.zone}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const quickRoutes = [
    { from: 'Churchgate', to: 'Andheri', line: 'harbour' as TrainLine },
    { from: 'CST', to: 'Thane', line: 'central' as TrainLine },
    { from: 'Dadar', to: 'Bandra', line: 'harbour' as TrainLine },
    { from: 'Mumbai Central', to: 'Lower Parel', line: 'central' as TrainLine },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {showStationList ? (
        <>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Text style={[styles.headerTitle, { color: theme.text }]}>Select Station</Text>
              <TouchableOpacity
                style={[styles.toggleButton, { backgroundColor: theme.surface }]}
                onPress={() => setShowStationList(false)}
              >
                <Search size={16} color={theme.primary} />
                <Text style={[styles.toggleButtonText, { color: theme.primary }]}>Journey Planner</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.lineSelector}>
              {trainLines.map((line) => (
                <TouchableOpacity
                  key={line.line}
                  style={[
                    styles.lineButton,
                    {
                      backgroundColor: selectedLine === line.line ? line.color : theme.surface,
                      borderColor: line.color,
                    }
                  ]}
                  onPress={() => setSelectedLine(line.line)}
                >
                  <Text style={[
                    styles.lineButtonText,
                    { color: selectedLine === line.line ? '#FFFFFF' : line.color }
                  ]}>
                    {line.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.searchContainer}>
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search stations..."
              />
            </View>
          </View>

          <FlatList
            data={getStations()}
            renderItem={renderStationItem}
            keyExtractor={(item) => item.id}
            style={styles.stationList}
            contentContainerStyle={styles.stationListContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <ScrollView style={styles.journeyPlannerContainer}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Journey Planner</Text>
                <TouchableOpacity
                  style={[styles.toggleButton, { backgroundColor: theme.surface }]}
                  onPress={() => setShowStationList(true)}
                >
                  <MapPin size={16} color={theme.primary} />
                  <Text style={[styles.toggleButtonText, { color: theme.primary }]}>Station List</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Card style={styles.searchCard}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>Plan Your Journey</Text>
              
              <View style={styles.lineSelector}>
                {trainLines.map((line) => (
                  <TouchableOpacity
                    key={line.line}
                    style={[
                      styles.lineButton,
                      {
                        backgroundColor: selectedLine === line.line ? line.color : theme.surface,
                        borderColor: line.color,
                      }
                    ]}
                    onPress={() => setSelectedLine(line.line)}
                  >
                    <Text style={[
                      styles.lineButtonText,
                      { color: selectedLine === line.line ? '#FFFFFF' : line.color }
                    ]}>
                      {line.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.stationSelectors}>
                <View style={styles.stationRow}>
                  <StationPicker
                    selectedStation={fromStation}
                    onStationSelect={setFromStation}
                    line={selectedLine}
                    placeholder={t('from')}
                  />
                </View>

                <TouchableOpacity style={styles.swapButton} onPress={swapStations}>
                  <ArrowUpDown size={20} color={theme.primary} />
                </TouchableOpacity>

                <View style={styles.stationRow}>
                  <StationPicker
                    selectedStation={toStation}
                    onStationSelect={setToStation}
                    line={selectedLine}
                    placeholder={t('to')}
                  />
                </View>
              </View>

              <Button
                title="Search Trains"
                onPress={searchTrains}
                disabled={!fromStation || !toStation}
                style={styles.searchButton}
              />
            </Card>

            <Card style={styles.quickActionsCard}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>Quick Actions</Text>
              <View style={styles.quickActions}>
                <TouchableOpacity
                  style={[styles.quickAction, { backgroundColor: theme.surface }]}
                  onPress={() => router.push('/trains/live-status' as any)}
                >
                  <Clock size={24} color={theme.primary} />
                  <Text style={[styles.quickActionText, { color: theme.text }]}>
                    {t('liveStatus')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.quickAction, { backgroundColor: theme.surface }]}
                  onPress={() => router.push('/trains/timetable' as any)}
                >
                  <MapPin size={24} color={theme.secondary} />
                  <Text style={[styles.quickActionText, { color: theme.text }]}>
                    {t('timetable')}
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>

            <Card style={styles.quickRoutesCard}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>Popular Routes</Text>
              {quickRoutes.map((route, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.routeItem, { borderBottomColor: theme.border }]}
                >
                  <View style={styles.routeInfo}>
                    <Text style={[styles.routeText, { color: theme.text }]}>
                      {route.from} → {route.to}
                    </Text>
                    <Text style={[styles.routeLine, { color: theme.textSecondary }]}>
                      {t(route.line)}
                    </Text>
                  </View>
                  <MapPin size={16} color={theme.textSecondary} />
                </TouchableOpacity>
              ))}
            </Card>
          </View>
        </ScrollView>
      )}

      {selectedStation && (
        <DestinationSelector
          fromStation={selectedStation}
          visible={showDestinationSelector}
          onClose={() => {
            setShowDestinationSelector(false);
            setSelectedStation(undefined);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  searchContainer: {
    marginTop: 8,
  },
  stationList: {
    flex: 1,
  },
  stationListContent: {
    padding: 16,
    paddingTop: 8,
  },
  stationListItem: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  stationItemContent: {
    gap: 8,
  },
  stationItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stationItemName: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  stationItemCode: {
    fontSize: 14,
    marginLeft: 32,
  },
  journeyPlannerContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  searchCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  lineSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  lineButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  lineButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  stationSelectors: {
    marginBottom: 16,
  },
  stationRow: {
    marginBottom: 12,
  },
  swapButton: {
    alignSelf: 'center',
    padding: 8,
    marginVertical: 4,
  },
  searchButton: {
    marginTop: 8,
  },
  quickActionsCard: {
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAction: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  quickRoutesCard: {
    marginBottom: 16,
  },
  routeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  routeInfo: {
    flex: 1,
  },
  routeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  routeLine: {
    fontSize: 14,
    marginTop: 2,
  },
});