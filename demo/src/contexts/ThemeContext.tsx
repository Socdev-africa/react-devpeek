// src/contexts/ThemeContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Theme, ThemeMode, lightTheme, darkTheme } from '../theme/theme';

type ColorScheme = 'default' | 'blue' | 'green' | 'purple';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: lightTheme,
    toggleTheme: () => { },
    setColorScheme: () => { },
});

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Get initial theme from localStorage or system preference
    const getInitialTheme = (): Theme => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') return darkTheme;
        if (savedTheme === 'light') return lightTheme;

        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? darkTheme : lightTheme;
    };

    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    // Apply theme to body when it changes
    useEffect(() => {
        document.body.style.backgroundColor = theme.colors.background.main;
        document.body.style.color = theme.colors.text.primary;
        localStorage.setItem('theme', theme.mode);

        // Create CSS variables for the theme
        const root = document.documentElement;

        // Colors
        root.style.setProperty('--color-primary', theme.colors.primary.base);
        root.style.setProperty('--color-primary-light', theme.colors.primary.light);
        root.style.setProperty('--color-primary-dark', theme.colors.primary.dark);
        root.style.setProperty('--color-primary-gradient', theme.colors.primary.gradient);

        root.style.setProperty('--color-secondary', theme.colors.secondary.base);
        root.style.setProperty('--color-success', theme.colors.success);
        root.style.setProperty('--color-warning', theme.colors.warning);
        root.style.setProperty('--color-error', theme.colors.error);

        root.style.setProperty('--color-text-primary', theme.colors.text.primary);
        root.style.setProperty('--color-text-secondary', theme.colors.text.secondary);

        root.style.setProperty('--color-background', theme.colors.background.main);
        root.style.setProperty('--color-surface', theme.colors.surface.primary);
        root.style.setProperty('--color-surface-card', theme.colors.surface.card);

        root.style.setProperty('--color-border', theme.colors.border.medium);

        // Other properties
        root.style.setProperty('--shadow-sm', theme.shadows.sm);
        root.style.setProperty('--shadow-md', theme.shadows.md);
        root.style.setProperty('--shadow-lg', theme.shadows.lg);

        root.style.setProperty('--radius-md', theme.radii.md);
        root.style.setProperty('--radius-lg', theme.radii.lg);

        // Add a class to the body for easier CSS targeting
        document.body.className = theme.mode === 'dark' ? 'dark-theme' : 'light-theme';
    }, [theme]);

    // Toggle between light and dark themes
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme.mode === 'light' ? darkTheme : lightTheme);
    };

    // Apply a different color scheme
    const setColorScheme = (scheme: ColorScheme) => {
        const currentMode = theme.mode;
        let baseTheme = currentMode === 'light' ? { ...lightTheme } : { ...darkTheme };
        let newTheme: Theme = { ...baseTheme };

        // Clone the theme and modify colors based on scheme
        if (currentMode === 'light') {
            switch (scheme) {
                case 'blue':
                    newTheme.colors.primary = {
                        ...baseTheme.colors.primary,
                        base: '#0ea5e9',
                        dark: '#0284c7',
                        darker: '#0369a1',
                        gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
                    };
                    break;
                case 'green':
                    newTheme.colors.primary = {
                        ...baseTheme.colors.primary,
                        base: '#10b981',
                        dark: '#059669',
                        darker: '#047857',
                        gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                    };
                    break;
                case 'purple':
                    newTheme.colors.primary = {
                        ...baseTheme.colors.primary,
                        base: '#8b5cf6',
                        dark: '#7c3aed',
                        darker: '#6d28d9',
                        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                    };
                    break;
                default:
                    // Default scheme, use baseTheme
                    break;
            }
        } else {
            // Dark mode color schemes
            switch (scheme) {
                case 'blue':
                    newTheme.colors.primary = {
                        ...baseTheme.colors.primary,
                        base: '#0284c7',
                        dark: '#0ea5e9',
                        darker: '#38bdf8',
                        gradient: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                    };
                    break;
                case 'green':
                    newTheme.colors.primary = {
                        ...baseTheme.colors.primary,
                        base: '#059669',
                        dark: '#10b981',
                        darker: '#34d399',
                        gradient: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
                    };
                    break;
                case 'purple':
                    newTheme.colors.primary = {
                        ...baseTheme.colors.primary,
                        base: '#7c3aed',
                        dark: '#8b5cf6',
                        darker: '#a78bfa',
                        gradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
                    };
                    break;
                default:
                    // Default scheme, use baseTheme
                    break;
            }
        }

        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setColorScheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;