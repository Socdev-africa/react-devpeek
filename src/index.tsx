// src/index.tsx

import React, { useState, useEffect } from 'react';
import { ToggleButton } from './components/ToggleButton';
import { DebugPanel } from './components/DebugPanel';
import { useStorageListener } from './hooks/useStorageListener';
import { useStateAdapters } from './hooks/useStateAdapters';
import { isDevelopment } from './utils/formatters';
import { DevPeekProps, Position, Theme } from './types';

import './styles.css';

    const ReactDevPeek: React.FC<DevPeekProps> = ({
        showInProduction = false,
        position = 'bottom-right',
        theme = 'system',
        defaultOpen = false,
        stateAdapters = [],
        enableLocalStorage = true,
        
        enableSessionStorage = true
    }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Initialize storage hooks
    const {
        storageItems,
        setStorageItem,
        removeStorageItem,
        clearStorage,
        parseItemValue,
        refreshStorage
    } = useStorageListener(enableLocalStorage, enableSessionStorage);

    // Initialize state adapter hooks
    const { adapterStates, refreshStates } = useStateAdapters(stateAdapters);

    // Check if we should render the component
    const shouldRender = showInProduction || isDevelopment();

    // Handle dark mode
    useEffect(() => {
        const setThemeMode = () => {
            if (theme === 'dark') {
                setIsDarkMode(true);
            } else if (theme === 'light') {
                setIsDarkMode(false);
            } else {
                // System theme
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setIsDarkMode(prefersDark);
            }
        };

        setThemeMode();

        // Listen for system theme changes if using system theme
        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => setIsDarkMode(mediaQuery.matches);

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [theme]);

    if (!shouldRender) {
        return null;
    }

    return (
        <>
            <ToggleButton
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                position={position}
                isDarkMode={isDarkMode}
            />

            <DebugPanel
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                storageItems={storageItems}
                onRemoveStorageItem={removeStorageItem}
                onClearStorage={clearStorage}
                parseItemValue={parseItemValue}
                onUpdateStorageItem={setStorageItem}
                adapterStates={adapterStates}
                refreshStates={refreshStates}
                refreshStorage={refreshStorage}
                isDarkMode={isDarkMode}
            />
        </>
    );
};

// Export the component as both default and named export
export default ReactDevPeek;
export { ReactDevPeek };

// Export types
export type { DevPeekProps, Position, Theme, StateAdapter } from './types';