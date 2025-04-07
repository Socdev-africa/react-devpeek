// tests/setup.ts
import '@testing-library/jest-dom'
import { vi } from 'vitest';

// Mock localStorage and sessionStorage
class StorageMock {
  store: Record<string, string>;
  length: number;

  constructor() {
    this.store = {};
    this.length = 0;
  }

  key(n: number): string | null {
    const keys = Object.keys(this.store);
    return n < keys.length ? keys[n] : null;
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
    this.length = Object.keys(this.store).length;
  }

  removeItem(key: string): void {
    delete this.store[key];
    this.length = Object.keys(this.store).length;
  }

  clear(): void {
    this.store = {};
    this.length = 0;
  }
}

// Mock matchMedia
interface MatchMediaQueryList {
  matches: boolean;
  media: string;
  onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null;
  addListener: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any) => void; // Deprecated
  removeListener: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any) => void; // Deprecated
  addEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void;
  removeEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void;
  dispatchEvent: (event: Event) => boolean;
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string): MatchMediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Set up localStorage and sessionStorage mocks
Object.defineProperty(window, 'localStorage', {
  value: new StorageMock(),
});

Object.defineProperty(window, 'sessionStorage', {
  value: new StorageMock(),
});

// Mock process.env for development mode
vi.stubGlobal('process', {
  ...process,
  env: {
    ...process.env,
    NODE_ENV: 'development',
  },
});