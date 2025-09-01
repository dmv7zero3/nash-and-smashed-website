// src/core/utils/cache.ts

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export const setCache = <T>(key: string, data: T) => {
  const cacheEntry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheEntry));
};

export const getCache = <T>(key: string, maxAge: number): T | null => {
  const cacheEntryStr = localStorage.getItem(key);
  if (!cacheEntryStr) return null;

  const cacheEntry: CacheEntry<T> = JSON.parse(cacheEntryStr);
  const isExpired = Date.now() - cacheEntry.timestamp > maxAge;

  if (isExpired) {
    localStorage.removeItem(key);
    return null;
  }

  return cacheEntry.data;
};
