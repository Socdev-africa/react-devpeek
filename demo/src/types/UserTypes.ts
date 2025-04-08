// src/types/UserTypes.ts

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  preferences: UserPreferences;
  metadata: Record<string, any>;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface UserState {
  profile: UserProfile;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updatePreference: (key: string, value: any) => void;
}