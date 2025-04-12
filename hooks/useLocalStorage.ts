import { useState, useEffect, useCallback } from "react";
import { storage } from "@/lib/utils";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Initialize state with callback to avoid unnecessary localStorage access on every render
  const [state, setState] = useState<T>(() => {
    const storedValue = storage.get<T>(key);
    return storedValue !== null ? storedValue : initialValue;
  });

  // Update localStorage whenever state changes
  useEffect(() => {
    storage.set(key, state);
  }, [key, state]);

  // Provide a setter that updates both state and localStorage
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setState(prev => {
      const newValue = value instanceof Function ? value(prev) : value;
      storage.set(key, newValue);
      return newValue;
    });
  }, [key]);

  // Provide a way to remove the item from localStorage
  const removeValue = useCallback(() => {
    setState(initialValue);
    storage.remove(key);
  }, [key, initialValue]);

  return [state, setValue, removeValue] as const;
} 