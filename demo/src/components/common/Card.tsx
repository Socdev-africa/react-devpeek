// src/components/common/Card.tsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    variant?: 'default' | 'elevated' | 'outlined' | 'glass';
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}

/**
 * A versatile Card component with iOS 18-inspired design
 */
const Card: React.FC<CardProps> = ({
    children,
    title,
    variant = 'default',
    className = '',
    onClick,
    style = {}
}) => {
    const { theme } = useTheme();

    // Determine the appropriate styles based on variant
    let cardStyles: React.CSSProperties = {
        padding: theme.spacing.lg,
        borderRadius: theme.radii.xl,
        margin: theme.spacing.md,
        transition: theme.transitions.normal,
        ...style
    };

    // Add variant-specific styles
    switch (variant) {
        case 'elevated':
            cardStyles = {
                ...cardStyles,
                backgroundColor: theme.colors.surface.primary,
                boxShadow: theme.shadows.lg,
            };
            break;
        case 'outlined':
            cardStyles = {
                ...cardStyles,
                backgroundColor: 'transparent',
                border: `1px solid ${theme.colors.border.medium}`,
            };
            break;
        case 'glass':
            cardStyles = {
                ...cardStyles,
                backgroundColor: theme.colors.surface.card,
                backdropFilter: 'blur(10px)',
                boxShadow: theme.shadows.md,
            };
            break;
        default: // 'default'
            cardStyles = {
                ...cardStyles,
                backgroundColor: theme.colors.surface.primary,
                boxShadow: theme.shadows.sm,
            };
    }

    // Function to handle hover effect
    const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
        if (onClick) {
            e.currentTarget.style.cursor = 'pointer';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = theme.shadows.lg;
        }
    };

    // Function to handle mouse out
    const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
        if (onClick) {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = cardStyles.boxShadow as string;
        }
    };

    return (
        <div
            className={`card ${variant} ${className}`}
            style={cardStyles}
            onClick={onClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {title && (
                <h3 style={{
                    margin: `0 0 ${theme.spacing.md}`,
                    fontSize: theme.fontSizes.lg,
                    fontWeight: theme.fontWeights.semibold,
                    color: theme.colors.primary.base
                }}>
                    {title}
                </h3>
            )}
            <div className="card-content">
                {children}
            </div>
        </div>
    );
};

export default Card;