// src/components/common/TabNavigation.tsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface Tab {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

interface TabNavigationProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (tabId: string) => void;
    variant?: 'pills' | 'underline' | 'segmented';
}

const TabNavigation: React.FC<TabNavigationProps> = ({
    tabs,
    activeTab,
    onChange,
    variant = 'segmented'
}) => {
    const { theme } = useTheme();

    // Common styles for all tab variants
    const containerStyles: React.CSSProperties = {
        display: 'flex',
        padding: theme.spacing.sm,
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.lg,
    };

    // Variant-specific container styles
    let variantContainerStyles: React.CSSProperties = {};

    switch (variant) {
        case 'pills':
            variantContainerStyles = {
                backgroundColor: 'transparent',
            };
            break;
        case 'underline':
            variantContainerStyles = {
                backgroundColor: 'transparent',
                borderBottom: `1px solid ${theme.colors.border.light}`,
            };
            break;
        case 'segmented':
            variantContainerStyles = {
                backgroundColor: theme.colors.surface.secondary,
                padding: theme.spacing.xs,
                borderRadius: theme.radii.full,
            };
            break;
    }

    // Get tab button styles based on variant and active state
    const getTabStyles = (isActive: boolean): React.CSSProperties => {
        // Common styles for all tabs
        const commonStyles: React.CSSProperties = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing.xs,
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            fontSize: theme.fontSizes.sm,
            fontWeight: isActive ? theme.fontWeights.semibold : theme.fontWeights.medium,
            cursor: 'pointer',
            transition: theme.transitions.fast,
            border: 'none',
            backgroundColor: 'transparent',
            position: 'relative',
        };

        // Variant and state-specific styles
        switch (variant) {
            case 'pills':
                return {
                    ...commonStyles,
                    backgroundColor: isActive ? theme.colors.primary.base : 'transparent',
                    color: isActive ? theme.colors.text.inverse : theme.colors.text.primary,
                    borderRadius: theme.radii.full,
                    boxShadow: isActive ? theme.shadows.sm : 'none',
                };

            case 'underline':
                return {
                    ...commonStyles,
                    color: isActive ? theme.colors.primary.base : theme.colors.text.secondary,
                    borderBottom: isActive
                        ? `2px solid ${theme.colors.primary.base}`
                        : '2px solid transparent',
                    borderRadius: 0,
                };

            case 'segmented':
                return {
                    ...commonStyles,
                    color: isActive ? theme.colors.text.inverse : theme.colors.text.primary,
                    backgroundColor: isActive ? theme.colors.primary.base : 'transparent',
                    borderRadius: theme.radii.full,
                    boxShadow: isActive ? theme.shadows.sm : 'none',
                };

            default:
                return commonStyles;
        }
    };

    return (
        <div className={`tabs tabs-${variant}`} style={{ ...containerStyles, ...variantContainerStyles }}>
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                    style={getTabStyles(activeTab === tab.id)}
                    onClick={() => onChange(tab.id)}
                >
                    {tab.icon && <span className="tab-icon">{tab.icon}</span>}
                    <span>{tab.label}</span>
                </button>
            ))}
        </div>
    );
};

export default TabNavigation;