// src/stores/analyticsStore.ts
import { create } from 'zustand';
import { 
  AnalyticsState, 
  AnalyticsDataPoint, 
  EngagementDataPoint, 
  TimeRange 
} from '../types/AnalyticsTypes';

// Helper to generate mock analytics data
function generateAnalyticsData(timeRange: TimeRange): {
  pageViews: AnalyticsDataPoint[];
  conversions: AnalyticsDataPoint[];
  userEngagement: EngagementDataPoint[];
} {
  let dataPoints: string[] = [];
  let now = new Date();

  switch (timeRange) {
    case 'day':
      // Hourly data points for a day
      dataPoints = Array(24).fill(0).map((_, i) => {
        const date = new Date(now);
        date.setHours(i);
        return `${i}:00`;
      });
      break;
    case 'week':
      // Daily data points for a week
      dataPoints = Array(7).fill(0).map((_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (6 - i));
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      });
      break;
    case 'month':
      // Data points for last 30 days
      dataPoints = Array(30).fill(0).map((_, i) => {
        const date = new Date(now);
        date.setDate(date.getDate() - (29 - i));
        return `${date.getMonth() + 1}/${date.getDate()}`;
      });
      break;
    case 'year':
      // Monthly data points for a year
      dataPoints = Array(12).fill(0).map((_, i) => {
        return new Date(0, i).toLocaleDateString('en-US', { month: 'short' });
      });
      break;
  }

  // Generate random values for pageViews
  const pageViews = dataPoints.map(date => ({
    date,
    value: Math.floor(Math.random() * 1000) + 100
  }));

  // Generate random values for conversions (lower than pageViews)
  const conversions = dataPoints.map(date => ({
    date,
    value: Math.floor(Math.random() * 100) + 10
  }));

  // Generate user engagement data
  const userEngagement = [
    { category: 'Product Pages', value: Math.floor(Math.random() * 40) + 30 },
    { category: 'Blog Posts', value: Math.floor(Math.random() * 25) + 15 },
    { category: 'Documentation', value: Math.floor(Math.random() * 20) + 20 },
    { category: 'Pricing Page', value: Math.floor(Math.random() * 15) + 5 },
    { category: 'Support Portal', value: Math.floor(Math.random() * 10) + 10 },
  ];

  return { pageViews, conversions, userEngagement };
}

const useAnalyticsStore = create<AnalyticsState>((set) => ({
  pageViews: [],
  conversions: [],
  userEngagement: [],
  timeRange: 'week',
  isLoading: false,
  
  setTimeRange: (range: TimeRange) => {
    set({ timeRange: range });
    // This would typically trigger a refresh as well
    set(state => {
      const data = generateAnalyticsData(state.timeRange);
      return {
        ...state,
        ...data
      };
    });
  },
  
  refreshData: () => {
    set({ isLoading: true });
    setTimeout(() => {
      set(state => {
        const data = generateAnalyticsData(state.timeRange);
        return {
          ...state,
          ...data,
          isLoading: false
        };
      });
    }, 800);
  }
}));

export default useAnalyticsStore;