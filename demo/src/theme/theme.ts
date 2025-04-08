// src/theme/theme.ts
export type ThemeMode = 'light' | 'dark';

interface ColorPalette {
  // Primary colors
  primary: {
    lightest: string;
    lighter: string;
    light: string;
    base: string;
    dark: string;
    darker: string;
    gradient: string;
  };
  // Secondary accent colors
  secondary: {
    lightest: string;
    lighter: string;
    light: string;
    base: string;
    dark: string;
    darker: string;
    gradient: string;
  };
  // Success, warning, error states
  success: string;
  warning: string;
  error: string;
  // Text colors
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    inverse: string;
  };
  // Surface/container colors
  surface: {
    primary: string;
    secondary: string;
    tertiary: string;
    card: string;
    modal: string;
  };
  // Background colors
  background: {
    main: string;
    subtle: string;
    gradient: string;
  };
  // Border colors
  border: {
    light: string;
    medium: string;
    dark: string;
  };
}

interface ThemeRadii {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  full: string;
}

interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  glow: string;
}

interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

interface ThemeFonts {
  heading: string;
  body: string;
  mono: string;
}

interface ThemeFontSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  display: string;
}

interface ThemeFontWeights {
  light: number;
  regular: number;
  medium: number;
  semibold: number;
  bold: number;
}

export interface Theme {
  mode: ThemeMode;
  colors: ColorPalette;
  radii: ThemeRadii;
  shadows: ThemeShadows;
  spacing: ThemeSpacing;
  fonts: ThemeFonts;
  fontSizes: ThemeFontSizes;
  fontWeights: ThemeFontWeights;
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
  zIndices: {
    base: number;
    dropdown: number;
    sticky: number;
    fixed: number;
    modal: number;
    popover: number;
    tooltip: number;
  };
}

// Light theme
const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: {
      lightest: '#e0f2fe',
      lighter: '#bae6fd',
      light: '#7dd3fc',
      base: '#0ea5e9',
      dark: '#0284c7',
      darker: '#0369a1',
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
    },
    secondary: {
      lightest: '#f0fdfa',
      lighter: '#ccfbf1',
      light: '#5eead4',
      base: '#14b8a6',
      dark: '#0d9488',
      darker: '#0f766e',
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    text: {
      primary: '#0f172a',
      secondary: '#334155',
      tertiary: '#64748b',
      disabled: '#94a3b8',
      inverse: '#f8fafc',
    },
    surface: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      card: 'rgba(255, 255, 255, 0.8)',
      modal: 'rgba(255, 255, 255, 0.9)',
    },
    background: {
      main: '#f8fafc',
      subtle: '#f1f5f9',
      gradient: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
    },
    border: {
      light: '#e2e8f0',
      medium: '#cbd5e1',
      dark: '#94a3b8',
    },
  },
  radii: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 15px rgba(14, 165, 233, 0.5)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
    mono: '"SF Mono", SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    display: '2rem',
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  transitions: {
    fast: 'all 0.15s ease-in-out',
    normal: 'all 0.25s ease-in-out',
    slow: 'all 0.4s ease-in-out',
  },
  zIndices: {
    base: 1,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
  },
};

// Dark theme
const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: {
      lightest: '#0c4a6e',
      lighter: '#075985',
      light: '#0369a1',
      base: '#0284c7',
      dark: '#0ea5e9',
      darker: '#38bdf8',
      gradient: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
    },
    secondary: {
      lightest: '#042f2e',
      lighter: '#134e4a',
      light: '#115e59',
      base: '#0f766e',
      dark: '#14b8a6',
      darker: '#2dd4bf',
      gradient: 'linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)',
    },
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    text: {
      primary: '#f8fafc',
      secondary: '#e2e8f0',
      tertiary: '#94a3b8',
      disabled: '#64748b',
      inverse: '#0f172a',
    },
    surface: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      card: 'rgba(15, 23, 42, 0.8)',
      modal: 'rgba(15, 23, 42, 0.9)',
    },
    background: {
      main: '#0f172a',
      subtle: '#1e293b',
      gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    },
    border: {
      light: '#334155',
      medium: '#475569',
      dark: '#64748b',
    },
  },
  // The rest of the theme properties remain the same
  radii: lightTheme.radii,
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
    glow: '0 0 15px rgba(56, 189, 248, 0.5)',
  },
  spacing: lightTheme.spacing,
  fonts: lightTheme.fonts,
  fontSizes: lightTheme.fontSizes,
  fontWeights: lightTheme.fontWeights,
  transitions: lightTheme.transitions,
  zIndices: lightTheme.zIndices,
};

export { lightTheme, darkTheme };