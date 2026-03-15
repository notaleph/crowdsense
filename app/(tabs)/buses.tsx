import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Bus, MapPin, Clock, Search } from 'lucide-react-native';
import { useTheme } from '@/hooks/theme-context';
import { useLanguage } from '@/hooks/language-context';
import { Card } from '@/components/ui/Card';
import { SearchBar } from '@/components/ui/SearchBar';
import { Button } from '@/components/ui/Button';

interface BusRoute {
  id: string;
  number: string;
  name: string;
  from: string;
  to: string;
  type: 'ordinary' | 'limited' | 'ac';
  fare: number;
  frequency: string;
}

const mockBusRoutes: BusRoute[] = [
  { id: '1', number: '1', name: 'Colaba - Bandra', from: 'Colaba', to: 'Bandra', type: 'ordinary', fare: 15, frequency: '10-15 min' },
  { id: '2', number: '2', name: 'CSMT - Mulund', from: 'CSMT', to: 'Mulund', type: 'limited', fare: 25, frequency: '15-20 min' },
  { id: '3', number: '25', name: 'Colaba - Bandra', from: 'Colaba', to: 'Bandra', type: 'ac', fare: 35, frequency: '20-25 min' },
  { id: '4', number: '37', name: 'Mantralaya - Kurla', from: 'Mantralaya', to: 'Kurla', type: 'ordinary', fare: 18, frequency: '12-18 min' },
  { id: '5', number: '56', name: 'Dadar - Andheri', from: 'Dadar', to: 'Andheri', type: 'limited', fare: 22, frequency: '15-20 min' },
  { id: '6', number: '85', name: 'Fort - Borivali', from: 'Fort', to: 'Borivali', type: 'ac', fare: 45, frequency: '25-30 min' },
  { id: '7', number: '103', name: 'Bandra - Ghatkopar', from: 'Bandra', to: 'Ghatkopar', type: 'ordinary', fare: 20, frequency: '10-15 min' },
  { id: '8', number: '125', name: 'Churchgate - Malad', from: 'Churchgate', to: 'Malad', type: 'limited', fare: 28, frequency: '18-22 min' },
];

export default function BusesScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'ordinary' | 'limited' | 'ac'>('all');

  const busTypes = [
    { type: 'all' as const, name: 'All', color: theme.textSecondary },
    { type: 'ordinary' as const, name: 'Ordinary', color: theme.success },
    { type: 'limited' as const, name: 'Limited', color: theme.primary },
    { type: 'ac' as const, name: 'AC', color: theme.secondary },
  ];

  const getFilteredRoutes = () => {
    let filtered = mockBusRoutes;
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(route => route.type === selectedType);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(route => 
        route.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.to.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ordinary':
        return theme.success;
      case 'limited':
        return theme.primary;
      case 'ac':
        return theme.secondary;
      default:
        return theme.textSecondary;
    }
  };

  const renderBusRoute = ({ item }: { item: BusRoute }) => (
    <TouchableOpacity>
      <Card style={styles.routeCard}>
        <View style={styles.routeHeader}>
          <View style={styles.busInfo}>
            <View style={[styles.busNumber, { backgroundColor: getTypeColor(item.type) }]}>
              <Text style={styles.busNumberText}>{item.number}</Text>
            </View>
            <View style={styles.routeDetails}>
              <Text style={[styles.routeName, { color: theme.text }]}>{item.name}</Text>
              <Text style={[styles.routeType, { color: getTypeColor(item.type) }]}>
                {item.type.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.fareInfo}>
            <Text style={[styles.fare, { color: theme.text }]}>₹{item.fare}</Text>
            <Text style={[styles.frequency, { color: theme.textSecondary }]}>{item.frequency}</Text>
          </View>
        </View>
        
        <View style={styles.routePath}>
          <View style={styles.station}>
            <MapPin size={16} color={theme.textSecondary} />
            <Text style={[styles.stationName, { color: theme.text }]}>{item.from}</Text>
          </View>
          <View style={styles.arrow}>
            <Text style={[styles.arrowText, { color: theme.textSecondary }]}>→</Text>
          </View>
          <View style={styles.station}>
            <MapPin size={16} color={theme.textSecondary} />
            <Text style={[styles.stationName, { color: theme.text }]}>{item.to}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search bus routes..."
        />
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeSelector}>
          {busTypes.map((type) => (
            <TouchableOpacity
              key={type.type}
              style={[
                styles.typeButton,
                {
                  backgroundColor: selectedType === type.type ? type.color : theme.surface,
                  borderColor: type.color,
                }
              ]}
              onPress={() => setSelectedType(type.type)}
            >
              <Text style={[
                styles.typeButtonText,
                { color: selectedType === type.type ? '#FFFFFF' : type.color }
              ]}>
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={getFilteredRoutes()}
        renderItem={renderBusRoute}
        keyExtractor={(item) => item.id}
        style={styles.routesList}
        showsVerticalScrollIndicator={false}
      />

      <Card style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Bus size={20} color={theme.primary} />
          <Text style={[styles.infoTitle, { color: theme.text }]}>BEST Bus Info</Text>
        </View>
        <Text style={[styles.infoText, { color: theme.textSecondary }]}>
          • AC buses available on major routes
        </Text>
        <Text style={[styles.infoText, { color: theme.textSecondary }]}>
          • Digital payment accepted
        </Text>
        <Text style={[styles.infoText, { color: theme.textSecondary }]}>
          • Real-time tracking available
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    gap: 12,
  },
  typeSelector: {
    flexGrow: 0,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  routesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  routeCard: {
    marginBottom: 8,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  busInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  busNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  busNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  routeDetails: {
    flex: 1,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '500',
  },
  routeType: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  fareInfo: {
    alignItems: 'flex-end',
  },
  fare: {
    fontSize: 16,
    fontWeight: '600',
  },
  frequency: {
    fontSize: 12,
    marginTop: 2,
  },
  routePath: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  station: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  stationName: {
    fontSize: 14,
    fontWeight: '500',
  },
  arrow: {
    paddingHorizontal: 12,
  },
  arrowText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCard: {
    margin: 16,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
});