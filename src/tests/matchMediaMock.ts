// src/tests/matchMediaMock.ts
import { vi } from 'vitest';

export function setupMatchMediaMock() {
  // Create a mock implementation of matchMedia
interface MatchMediaResult {
    matches: boolean;
    media: string;
    onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null;
    addListener: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any) => void;
    removeListener: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any) => void;
    addEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void;
    removeEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void;
    dispatchEvent: (event: Event) => boolean;
}

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string): MatchMediaResult => ({
        matches: query.includes('dark'),  // Return true for dark mode queries
        media: query,
        onchange: null,
        addListener: vi.fn(),    // Deprecated but still used by some libraries
        removeListener: vi.fn(), // Deprecated but still used by some libraries
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
}