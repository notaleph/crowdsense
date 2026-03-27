export const lightTheme = {
  background: '#FFFFFF',
  surface: '#F8F9FA',
  primary: '#1976D2',
  secondary: '#FF6B35',
  accent: '#4CAF50',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  card: '#FFFFFF',
  shadow: 'rgba(0,0,0,0.1)',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};

export const darkTheme = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#64B5F6',
  secondary: '#FF8A65',
  accent: '#81C784',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#333333',
  card: '#1E1E1E',
  shadow: 'rgba(0,0,0,0.3)',
  success: '#81C784',
  warning: '#FFB74D',
  error: '#E57373',
  info: '#64B5F6',
};

export type Theme = typeof lightTheme;