import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { useTheme } from '@/hooks/theme-context';
import { useLanguage } from '@/hooks/language-context';
import { useFavorites } from '@/hooks/favorites-context';
import { FavoriteRouteCard } from '@/components/transport/FavoriteRouteCard';
import { router } from 'expo-router';

export default function FavoritesScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { favorites, removeFavorite, toggleAlerts } = useFavorites();

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

  const renderFavorite = ({ item }: { item: any }) => (
    <FavoriteRouteCard
      favorite={item}
      onToggleAlerts={toggleAlerts}
      onRemove={removeFavorite}
      onPress={handleFavoritePress}
    />
  );

  if (favorites.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Stack.Screen options={{ title: t('favorites') }} />
        <View style={styles.emptyState}>
          <Heart size={64} color={theme.textSecondary} />
          <Text style={[styles.emptyTitle, { color: theme.text }]}>
            No Favorites Yet
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
            Save your frequently used routes for quick access
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: `${t('favorites')} (${favorites.length})` }} />
      <FlatList
        data={favorites}
        renderItem={renderFavorite}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.favoritesList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  favoritesList: {
    paddingVertical: 8,
  },
});