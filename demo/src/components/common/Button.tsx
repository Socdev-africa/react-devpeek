// src/components/common/Button.tsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'glass' | 'success' | 'error';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

/**
 * Modern button component with iOS 18-inspired design
 */
const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    onClick,
    type = 'button',
    className = '',
}) => {
    const { theme } = useTheme();

    // Size styles
    const sizeStyles: Record<string, React.CSSProperties> = {
        sm: {
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            fontSize: theme.fontSizes.sm,
            borderRadius: theme.radii.md,
        },
        md: {
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            fontSize: theme.fontSizes.md,
            borderRadius: theme.radii.lg,
        },
        lg: {
            padding: `${theme.spacing.md} ${theme.spacing.lg}`,
            fontSize: theme.fontSizes.lg,
            borderRadius: theme.radii.xl,
        },
    };

    // Base styles for all buttons
    const baseStyles: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        fontWeight: theme.fontWeights.medium,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: theme.transitions.fast,
        opacity: disabled ? 0.6 : 1,
        width: fullWidth ? '100%' : 'auto',
        ...sizeStyles[size],
    };

    // Variant-specific styles
    let variantStyles: React.CSSProperties = {};

    switch (variant) {
        case 'primary':
            variantStyles = {
                background: theme.colors.primary.gradient,
                color: theme.colors.text.inverse,
                boxShadow: theme.shadows.sm,
            };
            break;
        case 'secondary':
            variantStyles = {
                background: theme.colors.secondary.gradient,
                color: theme.colors.text.inverse,
                boxShadow: theme.shadows.sm,
            };
            break;
        case 'outline':
            variantStyles = {
                backgroundColor: 'transparent',
                border: `2px solid ${theme.colors.primary.base}`,
                color: theme.colors.primary.base,
            };
            break;
        case 'text':
            variantStyles = {
                backgroundColor: 'transparent',
                color: theme.colors.primary.base,
                padding: '0',
            };
            break;
        case 'glass':
            variantStyles = {
                backgroundColor: theme.colors.surface.card,
                backdropFilter: 'blur(10px)',
                boxShadow: theme.shadows.sm,
                color: theme.colors.text.primary,
            };
            break;
        case 'success':
            variantStyles = {
                backgroundColor: theme.colors.success,
                color: theme.colors.text.inverse,
                boxShadow: theme.shadows.sm,
            };
            break;
        case 'error':
            variantStyles = {
                backgroundColor: theme.colors.error,
                color: theme.colors.text.inverse,
                boxShadow: theme.shadows.sm,
            };
            break;
    }

    // Hover effect for non-disabled buttons
    const getHoverStyles = (): React.CSSProperties => {
        if (disabled) return {};

        switch (variant) {
            case 'primary':
                return {
                    boxShadow: theme.shadows.md,
                    transform: 'translateY(-2px)',
                    filter: 'brightness(1.1)',
                };
            case 'secondary':
                return {
                    boxShadow: theme.shadows.md,
                    transform: 'translateY(-2px)',
                    filter: 'brightness(1.1)',
                };
            case 'outline':
                return {
                    backgroundColor: `${theme.colors.primary.lightest}50`, // With 50% opacity
                };
            case 'text':
                return {
                    textDecoration: 'underline',
                };
            case 'glass':
                return {
                    boxShadow: theme.shadows.md,
                    transform: 'translateY(-2px)',
                };
            case 'success':
                return {
                    boxShadow: theme.shadows.md,
                    transform: 'translateY(-2px)',
                    filter: 'brightness(1.1)',
                };
            case 'error':
                return {
                    boxShadow: theme.shadows.md,
                    transform: 'translateY(-2px)',
                    filter: 'brightness(1.1)',
                };
            default:
                return {};
        }
    };

    // Active/pressed effect
    const getActiveStyles = (): React.CSSProperties => {
        if (disabled) return {};

        return {
            transform: 'translateY(1px)',
            boxShadow: 'none',
            filter: 'brightness(0.95)',
        };
    };

    return (
        <button
            type={type}
            className={`button ${variant} ${size} ${fullWidth ? 'full-width' : ''} ${disabled ? 'disabled' : ''} ${className}`}
            style={{ ...baseStyles, ...variantStyles }}
            onClick={onClick}
            disabled={disabled}
            onMouseOver={(e) => {
                if (!disabled) {
                    Object.assign(e.currentTarget.style, getHoverStyles());
                }
            }}
            onMouseOut={(e) => {
                if (!disabled) {
                    Object.assign(e.currentTarget.style, { ...baseStyles, ...variantStyles });
                }
            }}
            onMouseDown={(e) => {
                if (!disabled) {
                    Object.assign(e.currentTarget.style, getActiveStyles());
                }
            }}
            onMouseUp={(e) => {
                if (!disabled) {
                    Object.assign(e.currentTarget.style, getHoverStyles());
                }
            }}
        >
            {icon && iconPosition === 'left' && <span className="button-icon">{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span className="button-icon">{icon}</span>}
        </button>
    );
};

export default Button;