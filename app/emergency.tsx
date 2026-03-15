import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { Phone, Shield, Flame, Heart, Train, Bus } from 'lucide-react-native';
import { useTheme } from '@/hooks/theme-context';
import { useLanguage } from '@/hooks/language-context';
import { EmergencyContact } from '@/types/transport';
import { emergencyContacts } from '@/data/emergency-contacts';
import { Card } from '@/components/ui/Card';

export default function EmergencyScreen() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All', icon: Phone, color: theme.textSecondary },
    { id: 'police', name: 'Police', icon: Shield, color: theme.primary },
    { id: 'fire', name: 'Fire', icon: Flame, color: theme.error },
    { id: 'medical', name: 'Medical', icon: Heart, color: theme.success },
    { id: 'railway', name: 'Railway', icon: Train, color: theme.warning },
    { id: 'transport', name: 'Transport', icon: Bus, color: theme.secondary },
  ];

  const getFilteredContacts = () => {
    if (selectedCategory === 'all') {
      return emergencyContacts;
    }
    return emergencyContacts.filter(contact => contact.category === selectedCategory);
  };

  const getContactName = (contact: EmergencyContact) => {
    return language === 'hi' ? contact.nameHi : 
           language === 'mr' ? contact.nameMr : contact.name;
  };

  const handleCall = (number: string, name: string) => {
    Alert.alert(
      'Call Emergency',
      `Do you want to call ${name} at ${number}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          onPress: () => Linking.openURL(`tel:${number}`) 
        },
      ]
    );
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData ? categoryData.icon : Phone;
  };

  const getCategoryColor = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData ? categoryData.color : theme.textSecondary;
  };

  const renderContact = ({ item }: { item: EmergencyContact }) => {
    const IconComponent = getCategoryIcon(item.category);
    const categoryColor = getCategoryColor(item.category);

    return (
      <TouchableOpacity onPress={() => handleCall(item.number, getContactName(item))}>
        <Card style={styles.contactCard}>
          <View style={styles.contactHeader}>
            <View style={styles.contactInfo}>
              <View style={[styles.iconContainer, { backgroundColor: categoryColor + '20' }]}>
                <IconComponent size={20} color={categoryColor} />
              </View>
              <View style={styles.contactDetails}>
                <Text style={[styles.contactName, { color: theme.text }]}>
                  {getContactName(item)}
                </Text>
                <Text style={[styles.contactCategory, { color: categoryColor }]}>
                  {item.category.toUpperCase()}
                </Text>
              </View>
            </View>
            <View style={styles.phoneContainer}>
              <Text style={[styles.phoneNumber, { color: theme.primary }]}>
                {item.number}
              </Text>
              <Phone size={16} color={theme.primary} />
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: t('emergency') }} />
      
      <View style={styles.categorySelector}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const IconComponent = item.icon;
            const isSelected = selectedCategory === item.id;
            
            return (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: isSelected ? item.color : theme.surface,
                    borderColor: item.color,
                  }
                ]}
                onPress={() => setSelectedCategory(item.id)}
              >
                <IconComponent 
                  size={16} 
                  color={isSelected ? '#FFFFFF' : item.color} 
                />
                <Text style={[
                  styles.categoryButtonText,
                  { color: isSelected ? '#FFFFFF' : item.color }
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <FlatList
        data={getFilteredContacts()}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        style={styles.contactsList}
        showsVerticalScrollIndicator={false}
      />

      <Card style={styles.warningCard}>
        <Text style={[styles.warningTitle, { color: theme.error }]}>
          Emergency Guidelines
        </Text>
        <Text style={[styles.warningText, { color: theme.textSecondary }]}>
          • For immediate life-threatening emergencies, call 100 (Police) or 108 (Ambulance)
        </Text>
        <Text style={[styles.warningText, { color: theme.textSecondary }]}>
          • Keep your location ready when calling emergency services
        </Text>
        <Text style={[styles.warningText, { color: theme.textSecondary }]}>
          • Stay calm and speak clearly
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categorySelector: {
    paddingVertical: 16,
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    gap: 6,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  contactsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contactCard: {
    marginBottom: 8,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
  },
  contactCategory: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
  warningCard: {
    margin: 16,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    marginBottom: 4,
  },
});