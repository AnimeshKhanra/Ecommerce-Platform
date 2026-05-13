import redis from '../config/redis';
import { logger } from '../config/logger';

const setCache = async (key: string, value: unknown, ttl?: number) => {
    try {
        const serializedValue = JSON.stringify(value);
        if (ttl) {
            await redis.setex(key, ttl, serializedValue);
        } else {
            await redis.set(key, serializedValue);
        }

        logger.info(`Redis SET: ${key}`);
    } catch (error) {
        logger.error(`Redis SET Error: ${error}`);
    }
};

const getCache = async <T>(key: string): Promise<T | null> => {
    try {
        const data = await redis.get(key);
        if (!data) return null;

        logger.info(`Redis GET: ${key}`);
        return JSON.parse(data) as T;
    } catch (error) {
        logger.error(`Redis GET Error: ${error}`);
        return null;
    }
};

const delCache = async (key: string) => {
    try {
        await redis.del(key);
        logger.info(`Redis DEL: ${key}`);
    } catch (error) {
        logger.error(`Redis DEL Error: ${error}`);
    }
};

//TODO: Add error handling and logging for Redis operations

export { setCache, getCache, delCache };
