// import Redis from 'ioredis';
// import { logger } from './logger';

// const redis = new Redis({
//     host: process.env.REDIS_HOST || 'localhost',
//     port: Number(process.env.REDIS_PORT) || 6379,
//     // password: process.env.REDIS_PASSWORD,
// })

// redis.on('connect', () => logger.info('Connected to Redis'));
// redis.on('error', (err) => logger.error('Redis connection error:', err.message));

// export default redis;

// =============================================================================

import Redis from "ioredis";
import { logger } from "./logger";

const isTestEnvironment = process.env.NODE_ENV === "test";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,

  // Do not connect automatically during tests
  lazyConnect: isTestEnvironment,

  // Disable automatic reconnection during tests
  retryStrategy: isTestEnvironment
    ? () => null
    : (times) => Math.min(times * 100, 3000),

  // Do not queue commands while disconnected during tests
  enableOfflineQueue: !isTestEnvironment,
});

redis.on("connect", () => {
  logger.info("Connected to Redis");
});

redis.on("error", (err) => {
  logger.error("Redis connection error:", err.message);
});

export default redis;
