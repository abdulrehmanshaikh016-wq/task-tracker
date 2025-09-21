import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }

  /** Set item in local storage */
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving ${key} to localStorage`, error);
    }
  }

  /** Get item from local storage */
  getItem<T>(key: string): T | null {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) as T : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage`, error);
      return null;
    }
  }

  /** Remove specific item */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /** Clear all items from local storage */
  clear(): void {
    localStorage.clear();
  }

  /** Check if a key exists */
  hasKey(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}