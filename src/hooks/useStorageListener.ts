// hooks/useStorageListener.ts
import { useState, useEffect } from 'react';
import { StorageItem } from '../types';
import { tryParseJSON } from '../utils/formatters';

export function useStorageListener(
  enableLocalStorage: boolean = true,
  enableSessionStorage: boolean = true
) {
  const [storageItems, setStorageItems] = useState<StorageItem[]>([]);

  // Function to get all storage items
  const getAllStorageItems = () => {
    const items: StorageItem[] = [];

    if (enableLocalStorage) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          items.push({
            key,
            value: localStorage.getItem(key) || '',
            type: 'localStorage'
          });
        }
      }
    }

    if (enableSessionStorage) {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key) {
          items.push({
            key,
            value: sessionStorage.getItem(key) || '',
            type: 'sessionStorage'
          });
        }
      }
    }

    return items;
  };

  // Update items when the component mounts
  useEffect(() => {
    setStorageItems(getAllStorageItems());

    // Listen for storage events
    const handleStorageChange = () => {
      setStorageItems(getAllStorageItems());
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for session storage (which doesn't trigger storage events)
    window.addEventListener('sessionStorageChange', handleStorageChange);

    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sessionStorageChange', handleStorageChange);
    };
  }, [enableLocalStorage, enableSessionStorage]);

  // Utility functions to manipulate storage
  const setStorageItem = (key: string, value: string, type: 'localStorage' | 'sessionStorage') => {
    if (type === 'localStorage') {
      localStorage.setItem(key, value);
    } else {
      sessionStorage.setItem(key, value);
      // Dispatch a custom event since sessionStorage doesn't trigger the storage event
      window.dispatchEvent(new Event('sessionStorageChange'));
    }
    setStorageItems(getAllStorageItems());
  };

  const removeStorageItem = (key: string, type: 'localStorage' | 'sessionStorage') => {
    if (type === 'localStorage') {
      localStorage.removeItem(key);
    } else {
      sessionStorage.removeItem(key);
      window.dispatchEvent(new Event('sessionStorageChange'));
    }
    setStorageItems(getAllStorageItems());
  };

  const clearStorage = (type: 'localStorage' | 'sessionStorage') => {
    if (type === 'localStorage') {
      localStorage.clear();
    } else {
      sessionStorage.clear();
      window.dispatchEvent(new Event('sessionStorageChange'));
    }
    setStorageItems(getAllStorageItems());
  };

  const parseItemValue = (item: StorageItem) => {
    return tryParseJSON(item.value);
  };

  return {
    storageItems,
    setStorageItem,
    removeStorageItem,
    clearStorage,
    parseItemValue,
    refreshStorage: () => setStorageItems(getAllStorageItems())
  };
}