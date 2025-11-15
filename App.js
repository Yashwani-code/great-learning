import React, { useState, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import CardListScreen from './screens/CardListScreen';

const buildTheme = (isDark) => {
  const base = isDark ? MD3DarkTheme : MD3LightTheme;

  return {
    ...base,
    roundness: 14,
    colors: {
      ...base.colors,
      primary: isDark ? '#4CC9F0' : '#3A0CA3',
      primaryContainer: isDark ? '#1F2933' : '#E0E7FF',
      secondary: isDark ? '#F97316' : '#0F766E',
      secondaryContainer: isDark ? '#1E293B' : '#CCFBF1',
      background: isDark ? '#020617' : '#F9FAFB',
      surface: isDark ? '#020617' : '#FFFFFF',
      onSurface: isDark ? '#E5E7EB' : '#111827',
      onBackground: isDark ? '#E5E7EB' : '#111827',
    },
  };
};

export default function App() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const theme = useMemo(
    () => buildTheme(darkModeEnabled),
    [darkModeEnabled]
  );

  const handleToggleTheme = () => {
    setDarkModeEnabled((prev) => !prev);
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style={darkModeEnabled ? 'light' : 'dark'} />
        <CardListScreen
          isDarkMode={darkModeEnabled}
          onToggleTheme={handleToggleTheme}
        />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
