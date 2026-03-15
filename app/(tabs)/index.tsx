import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Train, Bus, Heart, MessageCircle, Calculator, AlertTriangle } from 'lucide-react-native';
import { useTheme } from '@/hooks/theme-context';
import { useLanguage } from '@/hooks/language-context';
import { useFavorites } from '@/hooks/favorites-context';
import { Card } from '@/components/ui/Card';
import { FavoriteRouteCard } from '@/components/transport/FavoriteRouteCard';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { theme, isDark } = useTheme();
  const { t } = useLanguage();
  const { favorites } = useFavorites();

  const quickActions = [
    {
      id: 'trains',
      title: t('trains'),
      icon: Train,
      color: theme.primary,
      route: '/trains',
    },
    {
      id: 'buses',
      title: t('buses'),
      icon: Bus,
      color: theme.secondary,
      route: '/buses',
    },
    {
      id: 'favorites',
      title: t('favorites'),
      icon: Heart,
      color: theme.error,
      route: '/favorites',
    },
    {
      id: 'chat',
      title: t('chatAssistant'),
      icon: MessageCircle,
      color: theme.success,
      route: '/chat',
    },
    {
      id: 'calculator',
      title: t('fareCalculator'),
      icon: Calculator,
      color: theme.warning,
      route: '/calculator',
    },
    {
      id: 'emergency',
      title: t('emergency'),
      icon: AlertTriangle,
      color: theme.error,
      route: '/emergency',
    },
  ];

  const handleFavoritePress = (favorite: any) => {
    router.push({
      pathname: '/trains/schedule',
      params: {
        from: favorite.route.from.id,
        to: favorite.route.to.id,
        line: favorite.route.line,
      },
    } as any);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <LinearGradient
        colors={isDark ? ['#1976D2', '#1565C0'] : ['#2196F3', '#1976D2']}
        style={styles.header}
      >
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.appTitle}>Mumbai Transport</Text>
        <Text style={styles.subtitle}>Your complete transport companion</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <TouchableOpacity
                key={action.id}
                style={[styles.actionCard, { backgroundColor: theme.card }]}
                onPress={() => router.push(action.route as any)}
              >
                <View style={[styles.iconContainer, { backgroundColor: action.color + '20' }]}>
                  <IconComponent size={24} color={action.color} />
                </View>
                <Text style={[styles.actionTitle, { color: theme.text }]} numberOfLines={2}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {favorites.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Favorites</Text>
            {favorites.slice(0, 3).map((favorite) => (
              <FavoriteRouteCard
                key={favorite.id}
                favorite={favorite}
                onToggleAlerts={() => {}}
                onRemove={() => {}}
                onPress={handleFavoritePress}
              />
            ))}
            {favorites.length > 3 && (
              <TouchableOpacity
                style={[styles.viewAllButton, { borderColor: theme.primary }]}
                onPress={() => router.push('/favorites' as any)}
              >
                <Text style={[styles.viewAllText, { color: theme.primary }]}>
                  View All Favorites ({favorites.length})
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}

        <Card style={styles.infoCard}>
          <Text style={[styles.infoTitle, { color: theme.text }]}>Live Updates</Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            • All train services running normally
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            • No major delays reported
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            • Metro Line 1 operational
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.9,
  },
  appTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    width: '30%',
    minWidth: 100,
    aspectRatio: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  viewAllButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginVertical: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoCard: {
    marginTop: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
});