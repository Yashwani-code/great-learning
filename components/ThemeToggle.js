import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';

const ThemeToggle = ({ isDarkMode, onToggle }) => {
  const theme = useTheme();
  const iconName = isDarkMode ? 'white-balance-sunny' : 'moon-waning-crescent';

  return (
    <IconButton
      icon={iconName}
      size={22}
      onPress={onToggle}
      iconColor={theme.colors.onSurface}
      style={{ marginRight: 4 }}
      accessibilityLabel="Toggle light/dark mode"
    />
  );
};

export default ThemeToggle;
