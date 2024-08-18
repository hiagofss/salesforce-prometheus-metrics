import cache from '../config/cacheRegistryConfig.js';

export class CacheService {
  static async set(key, value, ttl) {
    return cache.set(key, JSON.stringify(value), ttl);
  }

  static async get(key) {
    const cachedData = cache.has(key);

    if (!cachedData) {
      return null;
    }

    return JSON.parse(cache.get(key));
  }

  static async del(key) {
    return await cache.del(key);
  }
}
