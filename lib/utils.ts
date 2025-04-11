import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Local Storage Utilities
export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === "undefined") return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  }
};

// Date formatting utilities
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

export const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date and time:", error);
    return dateString;
  }
};

// Image URL validation
export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  
  // Check if it's a data URL
  if (url.startsWith("data:image/")) return true;
  
  // Check if it's a relative path starting with /
  if (url.startsWith("/")) return true;
  
  // Check if it's a valid URL
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Error handling utility
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unexpected error occurred";
};

// Form validation utilities
export const validators = {
  required: (value: string): string | null => 
    !value?.trim() ? "This field is required" : null,
    
  email: (value: string): string | null => 
    !value?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? "Invalid email address" : null,
    
  phone: (value: string): string | null => 
    !value?.match(/^\+?[\d\s-()]+$/) ? "Invalid phone number" : null,
    
  url: (value: string): string | null => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return "Invalid URL";
    }
  }
};

// Performance optimization - Debounce function
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

// Performance optimization - Throttle function
export const throttle = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let lastTime = 0;
  
  const throttled = (...args: Parameters<F>) => {
    const now = Date.now();
    if (now - lastTime >= waitFor) {
      func(...args);
      lastTime = now;
    }
  };
  
  return throttled as (...args: Parameters<F>) => ReturnType<F>;
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
};

// Generate a random string (useful for temporary IDs)
export const generateRandomString = (length = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

// Check if the code is running on the client side
export const isClient = typeof window !== 'undefined';
