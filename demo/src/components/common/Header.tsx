import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from './Button';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header style={{
            padding: `${theme.spacing.md} ${theme.spacing.xl}`,
            backgroundColor: theme.colors.surface.card,
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: theme.zIndices.sticky,
            boxShadow: theme.shadows.sm,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <div className="logo" style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
            }}>
                <div className="logo-icon" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: theme.radii.lg,
                    background: theme.colors.primary.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: theme.fontWeights.bold,
                    fontSize: theme.fontSizes.xl,
                }}>
                    F
                </div>
                <h1 style={{
                    margin: 0,
                    fontSize: theme.fontSizes.xl,
                    fontWeight: theme.fontWeights.bold,
                    background: theme.colors.primary.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    {title}
                </h1>
            </div>

            <div className="header-actions" style={{
                display: 'flex',
                gap: theme.spacing.sm,
            }}>
                <Button
                    variant="glass"
                    onClick={toggleTheme}
                    icon={
                        <span style={{ fontSize: '1.2em' }}>
                            {theme.mode === 'light' ? '🌙' : '☀️'}
                        </span>
                    }
                >
                    {theme.mode === 'light' ? 'Dark Mode' : 'Light Mode'}
                </Button>

                <Button variant="primary">
                    Sign In
                </Button>
            </div>
        </header>
    );
};

export default Header;