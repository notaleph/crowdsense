import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@/hooks/theme-context";
import { LanguageProvider } from "@/hooks/language-context";
import { FavoritesProvider } from "@/hooks/favorites-context";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="trains/schedule" options={{ headerShown: true }} />
      <Stack.Screen name="favorites" options={{ headerShown: true }} />
      <Stack.Screen name="chat" options={{ headerShown: true }} />
      <Stack.Screen name="emergency" options={{ headerShown: true }} />
      <Stack.Screen name="calculator" options={{ headerShown: true }} />
      <Stack.Screen name="metro" options={{ headerShown: true }} />
      <Stack.Screen name="jobs" options={{ headerShown: true }} />
      <Stack.Screen name="rentals" options={{ headerShown: true }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <LanguageProvider>
            <FavoritesProvider>
              <RootLayoutNav />
            </FavoritesProvider>
          </LanguageProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}