// src/types/AnalyticsTypes.ts

export interface AnalyticsDataPoint {
  date: string;
  value: number;
  category?: string;
}

export interface EngagementDataPoint {
  category: string;
  value: number;
}

export type TimeRange = 'day' | 'week' | 'month' | 'year';

export interface AnalyticsState {
  pageViews: AnalyticsDataPoint[];
  conversions: AnalyticsDataPoint[];
  userEngagement: EngagementDataPoint[];
  timeRange: TimeRange;
  isLoading: boolean;
  setTimeRange: (range: TimeRange) => void;
  refreshData: () => void;
}