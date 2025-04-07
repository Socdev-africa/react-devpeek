import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useStorageListener } from '../hooks/useStorageListener';
import { useStateAdapters } from '../hooks/useStateAdapters';
import { create } from 'zustand';

describe('useStorageListener', () => {
    beforeEach(() => {
        window.localStorage.clear();
        window.sessionStorage.clear();

        // Set some test data
        localStorage.setItem('testKey', 'testValue');
        localStorage.setItem('jsonItem', JSON.stringify({ a: 1, b: 2 }));
    });

    it('returns storage items correctly', () => {
        const { result } = renderHook(() => useStorageListener(true, true));

        expect(result.current.storageItems).toHaveLength(2);
        expect(result.current.storageItems[0].key).toBe('testKey');
        expect(result.current.storageItems[0].value).toBe('testValue');
    });

    it('adds items to storage', () => {
        const { result } = renderHook(() => useStorageListener(true, true));

        act(() => {
            result.current.setStorageItem('newKey', 'newValue', 'localStorage');
        });

        expect(result.current.storageItems).toHaveLength(3);
        expect(localStorage.getItem('newKey')).toBe('newValue');
    });

    it('removes items from storage', () => {
        const { result } = renderHook(() => useStorageListener(true, true));

        act(() => {
            result.current.removeStorageItem('testKey', 'localStorage');
        });

        expect(result.current.storageItems).toHaveLength(1);
        expect(localStorage.getItem('testKey')).toBeNull();
    });

    it('parses JSON values', () => {
        const { result } = renderHook(() => useStorageListener(true, true));

        const jsonItem = result.current.storageItems.find(item => item.key === 'jsonItem');

        if (jsonItem) {
            const parsed = result.current.parseItemValue(jsonItem);
            expect(parsed).toEqual({ a: 1, b: 2 });
        } else {
            throw new Error('JSON item not found');
        }
    });

    it('clears all storage', () => {
        const { result } = renderHook(() => useStorageListener(true, true));

        act(() => {
            result.current.clearStorage('localStorage');
        });

        expect(result.current.storageItems).toHaveLength(0);
        expect(localStorage.length).toBe(0);
    });
});

describe('useStateAdapters', () => {
    it('connects to state adapters', () => {
        // Create a test store
        const useTestStore = create<{
            count: number;
            name: string;
        }>(() => ({
            count: 42,
            name: 'test'
        }));

        const { result } = renderHook(() =>
            useStateAdapters([
                {
                    name: 'testStore',
                    getState: useTestStore.getState as () => Record<string, any>
                }
            ])
        );

        expect(result.current.adapterStates).toHaveProperty('testStore');
        expect(result.current.adapterStates.testStore).toEqual({
            count: 42,
            name: 'test'
        });
    });

    it('refreshes state when requested', () => {
        // Create a test store
        const useTestStore = create((set) => ({
            count: 0,
            increment: () => set((state: { count: number; }) => ({ count: state.count + 1 }))
        }));

        const { result } = renderHook(() =>
            useStateAdapters([
                {
                    name: 'testStore',
                    getState: useTestStore.getState as () => Record<string, any>
                }
            ])
        );

        // Change the store state directly
        act(() => {
            useTestStore.setState({ count: 99 });
        });

        // Manual refresh to detect changes
        act(() => {
            result.current.refreshStates();
        });

        expect(result.current.adapterStates.testStore.count).toBe(99);
    });
});