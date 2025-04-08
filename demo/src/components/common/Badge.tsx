// src/components/common/Badge.tsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    rounded?: boolean;
    className?: string;
}

/**
 * Badge component for displaying status, counts, or labels
 */
const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    rounded = false,
    className = '',
}) => {
    const { theme } = useTheme();

    // Get background and text colors based on variant
    const getColors = (): { bg: string; text: string } => {
        switch (variant) {
            case 'primary':
                return {
                    bg: `${theme.colors.primary.lightest}80`, // 80% opacity
                    text: theme.colors.primary.dark
                };
            case 'secondary':
                return {
                    bg: `${theme.colors.secondary.lightest}80`,
                    text: theme.colors.secondary.dark
                };
            case 'success':
                return {
                    bg: theme.mode === 'dark'
                        ? 'rgba(6, 78, 59, 0.6)'
                        : 'rgba(209, 250, 229, 0.8)',
                    text: theme.colors.success
                };
            case 'warning':
                return {
                    bg: theme.mode === 'dark'
                        ? 'rgba(120, 53, 15, 0.6)'
                        : 'rgba(254, 243, 199, 0.8)',
                    text: theme.colors.warning
                };
            case 'error':
                return {
                    bg: theme.mode === 'dark'
                        ? 'rgba(127, 29, 29, 0.6)'
                        : 'rgba(254, 226, 226, 0.8)',
                    text: theme.colors.error
                };
            case 'neutral':
                return {
                    bg: theme.mode === 'dark'
                        ? 'rgba(30, 41, 59, 0.8)'
                        : 'rgba(241, 245, 249, 0.8)',
                    text: theme.colors.text.secondary
                };
            default:
                return {
                    bg: `${theme.colors.primary.lightest}80`,
                    text: theme.colors.primary.dark
                };
        }
    };

    // Get padding and font size based on size
    const getSizeStyles = (): { padding: string; fontSize: string } => {
        switch (size) {
            case 'sm':
                return {
                    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                    fontSize: theme.fontSizes.xs
                };
            case 'md':
                return {
                    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                    fontSize: theme.fontSizes.sm
                };
            case 'lg':
                return {
                    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                    fontSize: theme.fontSizes.md
                };
            default:
                return {
                    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                    fontSize: theme.fontSizes.sm
                };
        }
    };

    const { bg, text } = getColors();
    const { padding, fontSize } = getSizeStyles();

    return (
        <span
            className={`badge badge-${variant} badge-${size} ${className}`}
            style={{
                backgroundColor: bg,
                color: text,
                padding: padding,
                fontSize: fontSize,
                fontWeight: theme.fontWeights.medium,
                borderRadius: rounded ? theme.radii.full : theme.radii.md,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
            }}
        >
            {children}
        </span>
    );
};

export default Badge;