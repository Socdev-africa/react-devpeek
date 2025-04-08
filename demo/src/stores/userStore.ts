// src/stores/userStore.ts
import { create } from 'zustand';
import { UserState, LoginCredentials } from '../types/UserTypes';

const useUserStore = create<UserState>((set) => ({
  profile: {
    id: '',
    username: '',
    email: '',
    preferences: {
      theme: 'system',
      notifications: true,
      language: 'en',
    },
    metadata: {},
  },
  isAuthenticated: false,
  loading: false,
  error: null,
  
  login: async (credentials: LoginCredentials) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set({
        profile: {
          id: 'user-123',
          username: credentials.username,
          email: `${credentials.username}@example.com`,
          preferences: {
            theme: 'system',
            notifications: true,
            language: 'en',
          },
          metadata: {
            lastLogin: new Date().toISOString(),
            loginCount: Math.floor(Math.random() * 50) + 1,
          },
        },
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      set({ error: 'Authentication failed', loading: false });
    }
  },
  
  logout: () => {
    set({
      profile: {
        id: '',
        username: '',
        email: '',
        preferences: {
          theme: 'system',
          notifications: true,
          language: 'en',
        },
        metadata: {},
      },
      isAuthenticated: false,
    });
  },
  
  updatePreference: (key, value) => {
    set(state => ({
      profile: {
        ...state.profile,
        preferences: {
          ...state.profile.preferences,
          [key]: value,
        }
      }
    }));
  }
}));

export default useUserStore;