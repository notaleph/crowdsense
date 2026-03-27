import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { 
  Settings, 
  Globe, 
  Moon, 
  Sun, 
  Bell, 
  Info, 
  MessageCircle, 
  Calculator, 
  AlertTriangle, 
  Heart,
  MapPin,
  Briefcase,
  Home as HomeIcon,
  ChevronRight
} from 'lucide-react-native';
import { useTheme } from '@/hooks/theme-context';
import { useLanguage } from '@/hooks/language-context';
import { Card } from '@/components/ui/Card';
import { router } from 'expo-router';

export default function MoreScreen() {
  const { theme, isDark, setTheme, themeMode } = useTheme();
  const { t, language, setLanguage } = useLanguage();

  const menuSections = [
    {
      title: 'Transport Services',
      items: [
        {
          id: 'chat',
          title: t('chatAssistant'),
          subtitle: 'Get help in multiple languages',
          icon: MessageCircle,
          color: theme.success,
          route: '/chat',
        },
        {
          id: 'calculator',
          title: t('fareCalculator'),
          subtitle: 'Calculate taxi & auto fares',
          icon: Calculator,
          color: theme.warning,
          route: '/calculator',
        },
        {
          id: 'favorites',
          title: t('favorites'),
          subtitle: 'Manage saved routes',
          icon: Heart,
          color: theme.error,
          route: '/favorites',
        },
        {
          id: 'emergency',
          title: t('emergency'),
          subtitle: 'Important contact numbers',
          icon: AlertTriangle,
          color: theme.error,
          route: '/emergency',
        },
      ],
    },
    {
      title: 'Other Services',
      items: [
        {
          id: 'metro',
          title: t('metro'),
          subtitle: 'Mumbai Metro information',
          icon: MapPin,
          color: theme.primary,
          route: '/metro',
        },
        {
          id: 'jobs',
          title: t('jobs'),
          subtitle: 'Job listings in Mumbai',
          icon: Briefcase,
          color: theme.secondary,
          route: '/jobs',
        },
        {
          id: 'rentals',
          title: t('rentals'),
          subtitle: 'Rental properties',
          icon: HomeIcon,
          color: theme.success,
          route: '/rentals',
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          id: 'language',
          title: t('language'),
          subtitle: `Current: ${language === 'en' ? 'English' : language === 'hi' ? 'हिंदी' : 'मराठी'}`,
          icon: Globe,
          color: theme.primary,
          onPress: () => {
            const languages = ['en', 'hi', 'mr'] as const;
            const currentIndex = languages.indexOf(language);
            const nextIndex = (currentIndex + 1) % languages.length;
            setLanguage(languages[nextIndex]);
          },
        },
        {
          id: 'theme',
          title: t('theme'),
          subtitle: `Current: ${themeMode === 'system' ? 'System' : isDark ? t('dark') : t('light')}`,
          icon: isDark ? Moon : Sun,
          color: theme.secondary,
          onPress: () => {
            const themes = ['light', 'dark', 'system'] as const;
            const currentIndex = themes.indexOf(themeMode);
            const nextIndex = (currentIndex + 1) % themes.length;
            setTheme(themes[nextIndex]);
          },
        },
        {
          id: 'notifications',
          title: t('notifications'),
          subtitle: 'Manage alerts and updates',
          icon: Bell,
          color: theme.warning,
          route: '/notifications',
        },
        {
          id: 'about',
          title: t('about'),
          subtitle: 'App info and version',
          icon: Info,
          color: theme.textSecondary,
          route: '/about',
        },
      ],
    },
  ];

  const handleItemPress = (item: any) => {
    if (item.onPress) {
      item.onPress();
    } else if (item.route) {
      router.push(item.route);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {section.title}
            </Text>
            <Card style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => {
                const IconComponent = item.icon;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.menuItem,
                      {
                        borderBottomColor: theme.border,
                        borderBottomWidth: itemIndex < section.items.length - 1 ? 1 : 0,
                      }
                    ]}
                    onPress={() => handleItemPress(item)}
                  >
                    <View style={styles.itemLeft}>
                      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                        <IconComponent size={20} color={item.color} />
                      </View>
                      <View style={styles.itemText}>
                        <Text style={[styles.itemTitle, { color: theme.text }]}>
                          {item.title}
                        </Text>
                        <Text style={[styles.itemSubtitle, { color: theme.textSecondary }]}>
                          {item.subtitle}
                        </Text>
                      </View>
                    </View>
                    <ChevronRight size={16} color={theme.textSecondary} />
                  </TouchableOpacity>
                );
              })}
            </Card>
          </View>
        ))}

        <Card style={styles.appInfo}>
          <Text style={[styles.appName, { color: theme.text }]}>Mumbai Transport</Text>
          <Text style={[styles.appVersion, { color: theme.textSecondary }]}>
            Version 1.0.0
          </Text>
          <Text style={[styles.appDescription, { color: theme.textSecondary }]}>
            Your complete transport companion for Mumbai
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
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionCard: {
    padding: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemLeft: {
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
  itemText: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
});