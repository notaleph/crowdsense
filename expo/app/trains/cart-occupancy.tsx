import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Train, Users } from 'lucide-react-native';
import { useTheme } from '@/hooks/theme-context';
import { Cart } from '@/types/transport';
import { Card } from '@/components/ui/Card';

const { width } = Dimensions.get('window');
const CART_WIDTH = (width - 48) / 3;

export default function CartOccupancyScreen() {
  const { theme } = useTheme();
  const params = useLocalSearchParams();
  
  const trainNumber = params.trainNumber as string;
  const departure = params.departure as string;
  const destination = params.destination as string;

  const [carts, setCarts] = useState<Cart[]>([]);

  useEffect(() => {
    generateCartData();
  }, []);

  const generateCartData = () => {
    const cartData: Cart[] = [];
    for (let i = 1; i <= 12; i++) {
      let type: 'general' | 'firstClass' | 'ladies' = 'general';
      
      if (i % 4 === 0) {
        type = 'firstClass';
      } else if (i % 5 === 0) {
        type = 'ladies';
      }

      const occupancy = Math.floor(Math.random() * 60) + 20;
      
      cartData.push({
        number: i,
        occupancy,
        type,
      });
    }
    setCarts(cartData);
  };

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy >= 80) return '#EF4444';
    if (occupancy >= 60) return '#F59E0B';
    if (occupancy >= 40) return '#10B981';
    return '#3B82F6';
  };

  const getOccupancyLabel = (occupancy: number) => {
    if (occupancy >= 80) return 'Very Crowded';
    if (occupancy >= 60) return 'Crowded';
    if (occupancy >= 40) return 'Moderate';
    return 'Available';
  };

  const getCartTypeLabel = (type: Cart['type']) => {
    switch (type) {
      case 'firstClass':
        return 'First Class';
      case 'ladies':
        return 'Ladies Only';
      default:
        return 'General';
    }
  };

  const getCartTypeColor = (type: Cart['type']) => {
    switch (type) {
      case 'firstClass':
        return '#8B5CF6';
      case 'ladies':
        return '#EC4899';
      default:
        return theme.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen
        options={{
          title: `Train ${trainNumber}`,
          headerStyle: {
            backgroundColor: theme.card,
          },
          headerTintColor: theme.text,
        }}
      />

      <View style={[styles.trainInfoHeader, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <View style={styles.trainInfoRow}>
          <Train size={20} color={theme.primary} />
          <Text style={[styles.trainInfoTitle, { color: theme.text }]}>
            Train {trainNumber}
          </Text>
        </View>
        <Text style={[styles.trainInfoSubtitle, { color: theme.textSecondary }]}>
          {departure} • → {destination}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Card style={styles.legendCard}>
            <Text style={[styles.legendTitle, { color: theme.text }]}>Occupancy Levels</Text>
            <View style={styles.legendGrid}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#3B82F6' }]} />
                <Text style={[styles.legendText, { color: theme.textSecondary }]}>Available</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#10B981' }]} />
                <Text style={[styles.legendText, { color: theme.textSecondary }]}>Moderate</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#F59E0B' }]} />
                <Text style={[styles.legendText, { color: theme.textSecondary }]}>Crowded</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#EF4444' }]} />
                <Text style={[styles.legendText, { color: theme.textSecondary }]}>Very Crowded</Text>
              </View>
            </View>
          </Card>

          <View style={styles.cartsSection}>
            <View style={styles.sectionHeader}>
              <Users size={20} color={theme.text} />
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Cart Occupancy
              </Text>
            </View>

            <View style={styles.cartsGrid}>
              {carts.map((cart) => (
                <View
                  key={cart.number}
                  style={[
                    styles.cartCard,
                    { 
                      backgroundColor: theme.surface,
                      borderColor: getOccupancyColor(cart.occupancy),
                    }
                  ]}
                >
                  <View style={styles.cartHeader}>
                    <Text style={[styles.cartNumber, { color: theme.text }]}>
                      Cart {cart.number}
                    </Text>
                    {cart.type !== 'general' && (
                      <View style={[styles.cartTypeBadge, { backgroundColor: getCartTypeColor(cart.type) }]}>
                        <Text style={styles.cartTypeText}>
                          {getCartTypeLabel(cart.type)}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.occupancyInfo}>
                    <View style={styles.occupancyBarContainer}>
                      <View 
                        style={[
                          styles.occupancyBar,
                          { 
                            width: cart.occupancy + '%',
                            backgroundColor: getOccupancyColor(cart.occupancy)
                          }
                        ]} 
                      />
                    </View>
                    <Text style={[styles.occupancyPercent, { color: getOccupancyColor(cart.occupancy) }]}>
                      {cart.occupancy}%
                    </Text>
                  </View>

                  <Text style={[styles.occupancyLabel, { color: theme.textSecondary }]}>
                    {getOccupancyLabel(cart.occupancy)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <Card style={styles.infoCard}>
            <Text style={[styles.infoTitle, { color: theme.text }]}>
              💡 Tip
            </Text>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              First Class carts (4, 8, 12) require a first class ticket. Ladies Only carts (5, 10) are reserved for women passengers during peak hours.
            </Text>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  trainInfoHeader: {
    padding: 16,
    borderBottomWidth: 1,
  },
  trainInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  trainInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  trainInfoSubtitle: {
    fontSize: 14,
    marginLeft: 28,
  },
  content: {
    padding: 16,
  },
  legendCard: {
    marginBottom: 20,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
  },
  cartsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cartsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cartCard: {
    width: CART_WIDTH,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
  },
  cartHeader: {
    marginBottom: 8,
  },
  cartNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  cartTypeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  cartTypeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  occupancyInfo: {
    marginBottom: 6,
  },
  occupancyBarContainer: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  occupancyBar: {
    height: '100%',
    borderRadius: 4,
  },
  occupancyPercent: {
    fontSize: 16,
    fontWeight: '700',
  },
  occupancyLabel: {
    fontSize: 11,
  },
  infoCard: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
