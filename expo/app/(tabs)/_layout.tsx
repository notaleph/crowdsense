import { Tabs } from 'expo-router';
import { Home, Train, Bus, Menu } from 'lucide-react-native';
import React from 'react';
import { useTheme } from '@/hooks/theme-context';
import { useLanguage } from '@/hooks/language-context';

export default function TabLayout() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
        },
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: 'Crowd Sense',
        }}
      />
      <Tabs.Screen
        name="trains"
        options={{
          title: t('trains'),
          tabBarIcon: ({ color, size }) => <Train size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="buses"
        options={{
          title: t('buses'),
          tabBarIcon: ({ color, size }) => <Bus size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: t('more'),
          tabBarIcon: ({ color, size }) => <Menu size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}