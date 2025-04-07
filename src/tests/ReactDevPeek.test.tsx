import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ReactDevPeek from '../index';
import { create } from 'zustand';

// Mock Zustand store for testing
interface TestStore {
    count: number;
    increment: () => void;
}

const useTestStore = create<TestStore>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
}));

describe('ReactDevPeek', () => {
    beforeEach(() => {
        // Clear storages before each test
        window.localStorage.clear();
        window.sessionStorage.clear();

        // Set some test data
        localStorage.setItem('testKey', 'testValue');
        localStorage.setItem('userSettings', JSON.stringify({ theme: 'dark', fontSize: 16 }));
        sessionStorage.setItem('sessionId', '12345');
    });

    it('renders toggle button', () => {
        render(<ReactDevPeek />);
        const toggleButton = screen.getByRole('button', { name: /Open DevPeek/i });
        expect(toggleButton).toBeInTheDocument();
    });

    it('opens panel when button is clicked', () => {
        render(<ReactDevPeek />);
        const toggleButton = screen.getByRole('button', { name: /Open DevPeek/i });

        fireEvent.click(toggleButton);

        // Check if panel is open
        expect(screen.getByText('React DevPeek')).toBeInTheDocument();
        expect(screen.getByText('Storage')).toBeInTheDocument();
        expect(screen.getByText('App State')).toBeInTheDocument();
    });

    it('displays localStorage items', () => {
        render(<ReactDevPeek defaultOpen={true} />);

        // Should show local storage tab by default
        expect(screen.getByText('Local Storage')).toBeInTheDocument();

        // Should display our test keys
        expect(screen.getByText('testKey')).toBeInTheDocument();
        expect(screen.getByText('userSettings')).toBeInTheDocument();
    });

    it('displays sessionStorage items', () => {
        render(<ReactDevPeek defaultOpen={true} />);

        // Should show session storage section
        expect(screen.getByText('Session Storage')).toBeInTheDocument();

        // Should display our session test key
        expect(screen.getByText('sessionId')).toBeInTheDocument();
    });

    it('connects to state adapters', () => {
        // Set up the test store with initial state
        useTestStore.setState({ count: 42 });

        render(
            <ReactDevPeek
                defaultOpen={true}
                stateAdapters={[{
                    name: 'TestStore',
                    getState: useTestStore.getState,
                    subscribe: useTestStore.subscribe
                }]}
            />
        );

        // Switch to state tab
        fireEvent.click(screen.getByText('App State'));

        // Our store should be visible
        expect(screen.getByText('TestStore')).toBeInTheDocument();

        // Click to expand the state adapter
        fireEvent.click(screen.getByText('TestStore'));

        // Should show the count value somewhere in the DOM
        // Note: The exact text might vary based on JSON viewer implementation
        const contentElement = document.querySelector('.react-json-view-lite') as HTMLElement;
        expect(contentElement?.textContent).toContain('count');
        expect(contentElement?.textContent).toContain('42');
    });

    it('handles theme switching correctly', () => {
        // Mock the dark mode preference
        interface MockMediaQueryList extends MediaQueryList {
            matches: boolean;
            media: string;
            onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null;
            addListener: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any) => void;
            removeListener: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any) => void;
            addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
            removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => void;
            dispatchEvent: (event: Event) => boolean;
        }

        window.matchMedia = vi.fn().mockImplementation((query: string): MockMediaQueryList => ({
            matches: query === '(prefers-color-scheme: dark)',
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        render(<ReactDevPeek theme="dark" defaultOpen={true} />);

        // Check for dark mode class indicators
        const panel = document.querySelector('[class*="bg-gray-900"]');
        expect(panel).toBeInTheDocument();
    });
});