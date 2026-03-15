import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { MapPin, Search, ArrowRight } from 'lucide-react-native';
import { useTheme } from '@/hooks/theme-context';
import { useLanguage } from '@/hooks/language-context';
import { Station } from '@/types/transport';
import { getEndpointDestinations, getPossibleDestinations, searchStations } from '@/data/stations';
import { SearchBar } from '@/components/ui/SearchBar';

import { router } from 'expo-router';

interface DestinationSelectorProps {
  fromStation: Station;
  onClose: () => void;
  visible: boolean;
}

export const DestinationSelector: React.FC<DestinationSelectorProps> = ({
  fromStation,
  onClose,
  visible,
}) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllStations, setShowAllStations] = useState(false);

  const getStationName = (station: Station) => {
    return language === 'hi' ? station.nameHi : 
           language === 'mr' ? station.nameMr : station.name;
  };

  const endpointDestinations = getEndpointDestinations(fromStation);
  const allDestinations = getPossibleDestinations(fromStation);
  
  const getFilteredStations = () => {
    if (searchQuery) {
      return searchStations(searchQuery, language).filter(s => s.id !== fromStation.id && s.line === fromStation.line);
    }
    return showAllStations ? allDestinations : [];
  };

  const handleStationSelect = (toStation: Station) => {
    router.push({
      pathname: '/trains/schedule',
      params: {
        from: fromStation.id,
        to: toStation.id,
        line: fromStation.line,
      },
    } as any);
    onClose();
  };

  const renderEndpointOption = (station: Station, index: number) => (
    <TouchableOpacity
      key={station.id}
      style={[styles.destinationOption, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={() => handleStationSelect(station)}
    >
      <View style={styles.destinationContent}>
        <View style={styles.destinationHeader}>
          <Text style={[styles.destinationLabel, { color: theme.textSecondary }]}>To</Text>
          <ArrowRight size={16} color={theme.primary} />
        </View>
        <Text style={[styles.destinationName, { color: theme.text }]}>
          {getStationName(station)}
        </Text>
        <Text style={[styles.destinationSubtext, { color: theme.textSecondary }]}>
          {station.code} • Endpoint
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSearchOption = () => (
    <TouchableOpacity
      style={[styles.destinationOption, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={() => setShowAllStations(true)}
    >
      <View style={styles.destinationContent}>
        <View style={styles.destinationHeader}>
          <Text style={[styles.destinationLabel, { color: theme.textSecondary }]}>To</Text>
          <Search size={16} color={theme.primary} />
        </View>
        <Text style={[styles.destinationName, { color: theme.text }]}>Choose Destination</Text>
        <Text style={[styles.destinationSubtext, { color: theme.textSecondary }]}>Search or select from all stations</Text>
      </View>
    </TouchableOpacity>
  );

  const renderStationItem = ({ item }: { item: Station }) => (
    <TouchableOpacity
      style={[styles.stationItem, { borderBottomColor: theme.border }]}
      onPress={() => handleStationSelect(item)}
    >
      <View style={styles.stationInfo}>
        <Text style={[styles.stationName, { color: theme.text }]}>
          {getStationName(item)}
        </Text>
        <Text style={[styles.stationCode, { color: theme.textSecondary }]}>
          {item.code} • Zone {item.zone}
        </Text>
      </View>
      <MapPin size={16} color={theme.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={[styles.modal, { backgroundColor: theme.background }]}>
        <View style={[styles.modalHeader, { borderBottomColor: theme.border }]}>
          <View>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Select Destination</Text>
            <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
              From {getStationName(fromStation)}
            </Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.closeButton, { color: theme.primary }]}>Close</Text>
          </TouchableOpacity>
        </View>

        {!showAllStations ? (
          <View style={styles.content}>
            <View style={styles.destinationOptions}>
              {renderSearchOption()}
              {endpointDestinations.map((station, index) => renderEndpointOption(station, index))}
            </View>
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.searchHeader}>
              <TouchableOpacity
                style={[styles.backButton, { backgroundColor: theme.surface }]}
                onPress={() => {
                  setShowAllStations(false);
                  setSearchQuery('');
                }}
              >
                <Text style={[styles.backButtonText, { color: theme.primary }]}>← Back</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search stations..."
              />
            </View>

            <FlatList
              data={getFilteredStations()}
              renderItem={renderStationItem}
              keyExtractor={(item) => item.id}
              style={styles.stationList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  closeButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  destinationOptions: {
    gap: 12,
  },
  destinationOption: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  destinationContent: {
    gap: 8,
  },
  destinationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  destinationLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  destinationName: {
    fontSize: 18,
    fontWeight: '600',
  },
  destinationSubtext: {
    fontSize: 14,
  },
  searchHeader: {
    marginBottom: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  searchContainer: {
    marginBottom: 16,
  },
  stationList: {
    flex: 1,
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  stationInfo: {
    flex: 1,
  },
  stationName: {
    fontSize: 16,
    fontWeight: '500',
  },
  stationCode: {
    fontSize: 14,
    marginTop: 2,
  },
});