import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Bot } from 'lucide-react-native';
import { useTheme } from '@/hooks/theme-context';
import { useLanguage } from '@/hooks/language-context';

export default function ChatScreen() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: t('chatAssistant') }} />
      
      <View style={styles.workInProgressContainer}>
        <View style={[styles.workInProgressCard, { backgroundColor: theme.card }]}>
          <Bot size={48} color={theme.primary} style={styles.workInProgressIcon} />
          <Text style={[styles.workInProgressTitle, { color: theme.text }]}>
            {language === 'hi' ? 'कार्य प्रगति पर है' :
             language === 'mr' ? 'काम प्रगतीपथावर आहे' :
             'Work in Progress'}
          </Text>
          <Text style={[styles.workInProgressDescription, { color: theme.textSecondary }]}>
            {language === 'hi' ? 'चैट असिस्टेंट जल्द ही उपलब्ध होगा। कृपया बाद में फिर से कोशिश करें।' :
             language === 'mr' ? 'चॅट असिस्टंट लवकरच उपलब्ध होईल. कृपया नंतर पुन्हा प्रयत्न करा.' :
             'Chat Assistant will be available soon. Please check back later.'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  workInProgressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  workInProgressCard: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    maxWidth: 300,
    width: '100%',
  },
  workInProgressIcon: {
    marginBottom: 16,
  },
  workInProgressTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  workInProgressDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});