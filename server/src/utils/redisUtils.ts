import redis from "../config/redis";


const setCache = async (key: string, value: unknown, ttl?: number) => {
    const serializedValue = JSON.stringify(value);
    if (ttl) {
        await redis.setex(key, ttl, serializedValue);
    } else {
        await redis.set(key, serializedValue);
    }
}

const getCache = async <T>(key: string): Promise<T | null> => {
    const data = await redis.get(key);
    if (!data) return null;

    return JSON.parse(data) as T;
}

const delCache = async (key: string) => {
    await redis.del(key);
}
//TODO: Add error handling and logging for Redis operations

export { setCache, getCache, delCache };