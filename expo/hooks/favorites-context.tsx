import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FavoriteRoute, Route } from '@/types/transport';

export const [FavoritesProvider, useFavorites] = createContextHook(() => {
  const [favorites, setFavorites] = useState<FavoriteRoute[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        const parsed = JSON.parse(savedFavorites);
        setFavorites(parsed.map((fav: any) => ({
          ...fav,
          createdAt: new Date(fav.createdAt),
        })));
      }
    } catch (error) {
      console.log('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveFavorites = async (newFavorites: FavoriteRoute[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.log('Error saving favorites:', error);
    }
  };

  const addFavorite = (route: Route, nickname?: string) => {
    const newFavorite: FavoriteRoute = {
      id: `${route.from.id}-${route.to.id}-${Date.now()}`,
      route,
      nickname,
      createdAt: new Date(),
      alertsEnabled: true,
    };
    const updated = [...favorites, newFavorite];
    saveFavorites(updated);
  };

  const removeFavorite = (id: string) => {
    const updated = favorites.filter(fav => fav.id !== id);
    saveFavorites(updated);
  };

  const toggleAlerts = (id: string) => {
    const updated = favorites.map(fav =>
      fav.id === id ? { ...fav, alertsEnabled: !fav.alertsEnabled } : fav
    );
    saveFavorites(updated);
  };

  const isFavorite = (route: Route): boolean => {
    return favorites.some(fav => 
      fav.route.from.id === route.from.id && 
      fav.route.to.id === route.to.id &&
      fav.route.line === route.line
    );
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleAlerts,
    isFavorite,
    isLoading,
  };
});