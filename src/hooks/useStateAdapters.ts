import { useState, useEffect } from 'react';
import { StateAdapter } from '../types';
import { isEqual } from 'lodash';

/**
 * Hook that connects to external state adapters
 * @param adapters Array of state adapters
 * @returns An object with the state from each adapter
 */
export function useStateAdapters(adapters: StateAdapter[] = []) {
  const [adapterStates, setAdapterStates] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!adapters || adapters.length === 0) return;

    // Initialize state
    const initialStates: Record<string, any> = {};
    adapters.forEach(adapter => {
      initialStates[adapter.name] = adapter.getState();
    });
    setAdapterStates(initialStates);

    // Set up subscriptions
    const unsubscribeFunctions: Array<() => void> = [];

    adapters.forEach(adapter => {
      if (adapter.subscribe) {
        const unsubscribe = adapter.subscribe(() => {
          setAdapterStates(prevStates => {
            const newState = adapter.getState();
            
            // Only update if the state actually changed
            if (isEqual(prevStates[adapter.name], newState)) {
              return prevStates;
            }
            
            return {
              ...prevStates,
              [adapter.name]: newState
            };
          });
        });

        if (unsubscribe) {
          unsubscribeFunctions.push(unsubscribe);
        }
      } else {
        // If no subscribe method is provided, poll the state
        const intervalId = setInterval(() => {
          setAdapterStates(prevStates => {
            const newState = adapter.getState();
            
            // Only update if the state actually changed
            if (isEqual(prevStates[adapter.name], newState)) {
              return prevStates;
            }
            
            return {
              ...prevStates,
              [adapter.name]: newState
            };
          });
        }, 500); // Poll every 500ms

        unsubscribeFunctions.push(() => clearInterval(intervalId));
      }
    });

    // Clean up subscriptions
    return () => {
      unsubscribeFunctions.forEach(fn => fn());
    };
  }, [adapters]);

  // Function to refresh all states
  const refreshStates = () => {
    if (!adapters || adapters.length === 0) return;

    const newStates: Record<string, any> = {};
    adapters.forEach(adapter => {
      newStates[adapter.name] = adapter.getState();
    });
    setAdapterStates(newStates);
  };

  return {
    adapterStates,
    refreshStates
  };
}