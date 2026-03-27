import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { ChevronDown, MapPin } from 'lucide-react-native';
import { useTheme } from '@/hooks/theme-context';
import { useLanguage } from '@/hooks/language-context';
import { Station, TrainLine } from '@/types/transport';
import { getStationsByLine, searchStations } from '@/data/stations';
import { SearchBar } from '@/components/ui/SearchBar';


interface StationPickerProps {
  selectedStation?: Station;
  onStationSelect: (station: Station) => void;
  line?: TrainLine;
  placeholder: string;
}

export const StationPicker: React.FC<StationPickerProps> = ({
  selectedStation,
  onStationSelect,
  line,
  placeholder,
}) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getStations = () => {
    if (searchQuery) {
      return searchStations(searchQuery, language);
    }
    return line ? getStationsByLine(line) : [];
  };

  const getStationName = (station: Station) => {
    return language === 'hi' ? station.nameHi : 
           language === 'mr' ? station.nameMr : station.name;
  };

  const renderStation = ({ item }: { item: Station }) => (
    <TouchableOpacity
      style={[styles.stationItem, { borderBottomColor: theme.border }]}
      onPress={() => {
        onStationSelect(item);
        setModalVisible(false);
        setSearchQuery('');
      }}
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
    <>
      <TouchableOpacity
        style={[styles.picker, { backgroundColor: theme.surface, borderColor: theme.border }]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.pickerContent}>
          <MapPin size={20} color={theme.textSecondary} />
          <Text style={[
            styles.pickerText,
            { color: selectedStation ? theme.text : theme.textSecondary }
          ]}>
            {selectedStation ? getStationName(selectedStation) : placeholder}
          </Text>
        </View>
        <ChevronDown size={20} color={theme.textSecondary} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={[styles.modal, { backgroundColor: theme.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {placeholder}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setSearchQuery('');
              }}
            >
              <Text style={[styles.closeButton, { color: theme.primary }]}>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <FlatList
            data={getStations()}
            renderItem={renderStation}
            keyExtractor={(item) => item.id}
            style={styles.stationList}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  pickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  pickerText: {
    fontSize: 16,
    flex: 1,
  },
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
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    padding: 16,
  },
  stationList: {
    flex: 1,
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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