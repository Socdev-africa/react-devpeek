// tests/ReactDevPeek.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ReactDevPeek from '../index';
import { create } from 'zustand';

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
        localStorage.clear();
        sessionStorage.clear();

        localStorage.setItem('testKey', 'testValue');
        localStorage.setItem('userSettings', JSON.stringify({ theme: 'dark', fontSize: 16 }));
        sessionStorage.setItem('sessionId', '12345');
    });

    it('renders toggle button', () => {
        render(<ReactDevPeek />);
        expect(screen.getByRole('button', { name: /Open DevPeek/i })).toBeInTheDocument();
    });

    it('opens panel when button is clicked', () => {
        render(<ReactDevPeek />);
        fireEvent.click(screen.getByRole('button', { name: /Open DevPeek/i }));

        expect(screen.getByText(/React DevPeek/i)).toBeInTheDocument();
        expect(screen.getByText(/Storage/i)).toBeInTheDocument();
        expect(screen.getByText(/App State/i)).toBeInTheDocument();
    });

    it('displays localStorage items', () => {
        render(<ReactDevPeek defaultOpen={true} />);

        expect(screen.getByText('Local Storage')).toBeInTheDocument();
        expect(screen.getByText('testKey')).toBeInTheDocument();
        expect(screen.getByText('userSettings')).toBeInTheDocument();
    });

    it('displays sessionStorage items', () => {
        render(<ReactDevPeek defaultOpen={true} />);
        expect(screen.getByText('Session Storage')).toBeInTheDocument();
        expect(screen.getByText('sessionId')).toBeInTheDocument();
    });

    it('connects to Zustand store adapter', () => {
        useTestStore.setState({ count: 42 });

        render(
            <ReactDevPeek
                defaultOpen={true}
                stateAdapters={[
                    {
                        name: 'TestStore',
                        getState: useTestStore.getState,
                        subscribe: useTestStore.subscribe,
                    },
                ]}
            />
        );

        fireEvent.click(screen.getByText('App State'));
        fireEvent.click(screen.getByText('TestStore'));

        const stateViewer = document.querySelector('.react-json-view-lite');
        expect(stateViewer?.textContent).toContain('count');
        expect(stateViewer?.textContent).toContain('42');
    });

    it('respects dark theme setting', () => {
        render(<ReactDevPeek theme="dark" defaultOpen={true} />);
        const panel = document.querySelector('[class*="bg-gray-900"]');
        expect(panel).toBeInTheDocument();
    });
});
