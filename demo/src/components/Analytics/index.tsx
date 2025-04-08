// src/components/Analytics/index.tsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAnalyticsStore } from '../../stores';
import Card from '../common/Card';
import Button from '../common/Button';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { TimeRange } from '../../types/AnalyticsTypes';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const AnalyticsView: React.FC = () => {
    const { theme } = useTheme();
    const analytics = useAnalyticsStore();

    // Convert time range to readable text
    const timeRangeText = {
        day: 'Today',
        week: 'This Week',
        month: 'This Month',
        year: 'This Year'
    };

    // Chart data for page views
    const pageViewsData = {
        labels: analytics.pageViews.map(pv => pv.date),
        datasets: [
            {
                label: 'Page Views',
                data: analytics.pageViews.map(pv => pv.value),
                borderColor: theme.colors.primary.base,
                backgroundColor: `${theme.colors.primary.base}20`, // 20% opacity
                tension: 0.4,
                fill: true,
                pointBackgroundColor: theme.colors.primary.base,
                pointBorderColor: theme.colors.primary.lighter,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 3,
            }
        ]
    };

    // Chart data for conversions
    const conversionsData = {
        labels: analytics.conversions.map(c => c.date),
        datasets: [
            {
                label: 'Conversions',
                data: analytics.conversions.map(c => c.value),
                borderColor: theme.colors.secondary.base,
                backgroundColor: `${theme.colors.secondary.base}20`, // 20% opacity
                tension: 0.4,
                fill: true,
                pointBackgroundColor: theme.colors.secondary.base,
                pointBorderColor: theme.colors.secondary.lighter,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 3,
            }
        ]
    };

    // Common chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: theme.colors.text.primary,
                    font: {
                        family: theme.fonts.body,
                        size: 12,
                    }
                }
            },
            tooltip: {
                backgroundColor: theme.colors.surface.card,
                titleColor: theme.colors.text.primary,
                bodyColor: theme.colors.text.secondary,
                borderColor: theme.colors.border.medium,
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false,
                padding: 12,
                titleFont: {
                    family: theme.fonts.body,
                    size: 14,
                    weight: 700
                },
                bodyFont: {
                    family: theme.fonts.body,
                    size: 12
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: theme.mode === 'dark'
                        ? `${theme.colors.border.light}30`
                        : `${theme.colors.border.medium}30`,
                    drawBorder: false,
                },
                ticks: {
                    color: theme.colors.text.secondary,
                    font: {
                        family: theme.fonts.body
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: theme.colors.text.secondary,
                    font: {
                        family: theme.fonts.body
                    }
                }
            }
        },
        elements: {
            line: {
                borderWidth: 3
            }
        },
        layout: {
            padding: 10
        }
    };

    // Handle time range change
    const handleTimeRangeChange = (range: TimeRange) => {
        analytics.setTimeRange(range);
    };

    // Calculate total page views
    const totalPageViews = analytics.pageViews.reduce((sum, item) => sum + item.value, 0);

    // Calculate total conversions
    const totalConversions = analytics.conversions.reduce((sum, item) => sum + item.value, 0);

    // Calculate conversion rate
    const conversionRate = totalPageViews > 0
        ? ((totalConversions / totalPageViews) * 100).toFixed(1)
        : '0.0';

    return (
        <div>
            <h2 style={{
                fontSize: theme.fontSizes.xxl,
                fontWeight: theme.fontWeights.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.lg,
            }}>
                Analytics Dashboard
            </h2>

            {/* Time range controls */}
            <Card variant="glass">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div>
                        <h3 style={{
                            fontSize: theme.fontSizes.lg,
                            fontWeight: theme.fontWeights.semibold,
                            color: theme.colors.text.primary,
                            margin: 0,
                        }}>
                            {timeRangeText[analytics.timeRange]} Overview
                        </h3>
                        <p style={{
                            fontSize: theme.fontSizes.sm,
                            color: theme.colors.text.secondary,
                            marginTop: theme.spacing.xs,
                        }}>
                            Last updated: {new Date().toLocaleTimeString()}
                        </p>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: theme.spacing.sm,
                    }}>
                        <div style={{
                            display: 'flex',
                            backgroundColor: theme.colors.surface.secondary,
                            borderRadius: theme.radii.full,
                            padding: theme.spacing.xs,
                        }}>
                            {(['day', 'week', 'month', 'year'] as const).map(range => (
                                <button
                                    key={range}
                                    onClick={() => handleTimeRangeChange(range)}
                                    style={{
                                        backgroundColor: analytics.timeRange === range
                                            ? theme.colors.primary.base
                                            : 'transparent',
                                        color: analytics.timeRange === range
                                            ? theme.colors.text.inverse
                                            : theme.colors.text.secondary,
                                        border: 'none',
                                        borderRadius: theme.radii.full,
                                        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                                        fontSize: theme.fontSizes.sm,
                                        fontWeight: theme.fontWeights.medium,
                                        cursor: 'pointer',
                                        transition: theme.transitions.fast,
                                    }}
                                >
                                    {range.charAt(0).toUpperCase() + range.slice(1)}
                                </button>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            onClick={() => analytics.refreshData()}
                            disabled={analytics.isLoading}
                        >
                            {analytics.isLoading ? (
                                <>
                                    <div className="loading-spinner"></div>
                                    <span style={{ marginLeft: theme.spacing.xs }}>Refreshing...</span>
                                </>
                            ) : (
                                'Refresh Data'
                            )}
                        </Button>
                    </div>
                </div>
            </Card>

            {/* KPI summary cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: theme.spacing.md,
                margin: `${theme.spacing.lg} 0`,
            }}>
                {/* Page Views KPI */}
                <Card variant="glass">
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>
                        <div style={{
                            fontSize: theme.fontSizes.sm,
                            fontWeight: theme.fontWeights.medium,
                            color: theme.colors.text.secondary,
                            marginBottom: theme.spacing.xs,
                        }}>
                            TOTAL PAGE VIEWS
                        </div>
                        <div style={{
                            fontSize: theme.fontSizes.xxl,
                            fontWeight: theme.fontWeights.bold,
                            color: theme.colors.primary.base,
                            marginBottom: theme.spacing.sm,
                        }}>
                            {totalPageViews.toLocaleString()}
                        </div>
                        <div style={{
                            fontSize: theme.fontSizes.sm,
                            color: theme.colors.success,
                            display: 'flex',
                            alignItems: 'center',
                            gap: theme.spacing.xs,
                        }}>
                            <span>↑ 7.2%</span>
                            <span style={{ color: theme.colors.text.tertiary }}>vs. previous period</span>
                        </div>
                    </div>
                </Card>

                {/* Conversions KPI */}
                <Card variant="glass">
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>
                        <div style={{
                            fontSize: theme.fontSizes.sm,
                            fontWeight: theme.fontWeights.medium,
                            color: theme.colors.text.secondary,
                            marginBottom: theme.spacing.xs,
                        }}>
                            TOTAL CONVERSIONS
                        </div>
                        <div style={{
                            fontSize: theme.fontSizes.xxl,
                            fontWeight: theme.fontWeights.bold,
                            color: theme.colors.secondary.base,
                            marginBottom: theme.spacing.sm,
                        }}>
                            {totalConversions.toLocaleString()}
                        </div>
                        <div style={{
                            fontSize: theme.fontSizes.sm,
                            color: theme.colors.success,
                            display: 'flex',
                            alignItems: 'center',
                            gap: theme.spacing.xs,
                        }}>
                            <span>↑ 12.5%</span>
                            <span style={{ color: theme.colors.text.tertiary }}>vs. previous period</span>
                        </div>
                    </div>
                </Card>

                {/* Conversion Rate KPI */}
                <Card variant="glass">
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>
                        <div style={{
                            fontSize: theme.fontSizes.sm,
                            fontWeight: theme.fontWeights.medium,
                            color: theme.colors.text.secondary,
                            marginBottom: theme.spacing.xs,
                        }}>
                            CONVERSION RATE
                        </div>
                        <div style={{
                            fontSize: theme.fontSizes.xxl,
                            fontWeight: theme.fontWeights.bold,
                            background: theme.colors.primary.gradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: theme.spacing.sm,
                        }}>
                            {conversionRate}%
                        </div>
                        <div style={{
                            fontSize: theme.fontSizes.sm,
                            color: theme.colors.success,
                            display: 'flex',
                            alignItems: 'center',
                            gap: theme.spacing.xs,
                        }}>
                            <span>↑ 3.8%</span>
                            <span style={{ color: theme.colors.text.tertiary }}>vs. previous period</span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Charts */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: theme.spacing.xl,
                marginBottom: theme.spacing.xl,
            }}>
                {/* Page Views Chart */}
                <Card title="Page Views" variant="glass">
                    <div style={{
                        height: '300px',
                        position: 'relative',
                    }}>
                        <Line data={pageViewsData} options={chartOptions} />
                    </div>
                </Card>

                {/* Conversions Chart */}
                <Card title="Conversions" variant="glass">
                    <div style={{
                        height: '300px',
                        position: 'relative',
                    }}>
                        <Line data={conversionsData} options={chartOptions} />
                    </div>
                </Card>
            </div>

            {/* User Engagement */}
            <Card title="User Engagement by Category" variant="glass">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: theme.spacing.md,
                }}>
                    {analytics.userEngagement.map(item => (
                        <div key={item.category}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: theme.spacing.xs,
                            }}>
                                <span style={{
                                    fontSize: theme.fontSizes.sm,
                                    color: theme.colors.text.secondary,
                                }}>
                                    {item.category}
                                </span>
                                <span style={{
                                    fontSize: theme.fontSizes.sm,
                                    fontWeight: theme.fontWeights.semibold,
                                    color: theme.colors.text.primary,
                                }}>
                                    {item.value}%
                                </span>
                            </div>
                            <div style={{
                                width: '100%',
                                height: '8px',
                                backgroundColor: theme.colors.surface.secondary,
                                borderRadius: theme.radii.full,
                                overflow: 'hidden',
                            }}>
                                <div style={{
                                    width: `${item.value}%`,
                                    height: '100%',
                                    background: theme.colors.primary.gradient,
                                    borderRadius: theme.radii.full,
                                }}>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default AnalyticsView;